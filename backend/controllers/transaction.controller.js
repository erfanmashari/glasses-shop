const Transaction = require("../models/transaction.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const { checkDataExist, jsonResponse } = require("../functions");

const add_transaction = async (req, res) => {
  const body = req.body;

  if (
    !checkDataExist(
      body,
      [
        "user",
        "order",
        "amount",
        "card",
        "cvv2",
        "secondPassword",
        "expireMonth",
        "expireYear",
      ],
      res
    )
  ) {
    return null;
  }
  // set typeof some fieds to number
  body.amount = Number(body.amount);
  body.card = Number(body.card);
  body.cvv2 = Number(body.cvv2);
  body.secondPassword = Number(body.secondPassword);
  body.expireMonth = Number(body.expireMonth);
  body.expireYear = Number(body.expireYear);

  // craete and check tracking codd
  let trackingCode = createTrackingCode();
  let checkTrackingCodeStatus = await checkTrackingCode(trackingCode);
  while (checkTrackingCodeStatus) {
    trackingCode = createTrackingCode();
    checkTrackingCodeStatus = await checkTrackingCode(trackingCode);
  }
  body.trackingCode = trackingCode;

  const checkUserStatus = await checkUser(body.user, res);
  const checkOrderStatus = await checkOrder(body, res);
  if (
    !checkUserStatus ||
    !checkOrderStatus ||
    !checkTransactionNumbers(
      body,
      ["amount", "card", "cvv2", "secondPassword", "expireMonth", "expireYear"],
      res
    )
  ) {
    return null;
  }

  body.expireDate = `14${body.expireYear}/${body.expireMonth}`;

  // create new transaction instance
  await Transaction.create(body)
    .then((result) => {
      Order.findOneAndUpdate({ _id: body.order }, { status: "بسته بندی" }).then(
        (order) => {
          if (order) {
            res.json(
              jsonResponse(201, {
                message: "پرداخت با موفقیت انجام شد!",
              })
            );
          }
        }
      );
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// create a 18 digits tracking code
const createTrackingCode = () => {
  return Math.floor(
    100 * 1000 * 1000 * 1000 * 1000 * 1000 +
      Math.random() * (900 * 1000 * 1000 * 1000 * 1000 * 1000)
  );
};

// check if tracking code exist in database or not
const checkTrackingCode = async (trackingCode) => {
  const trackingCodeIndex = await Transaction.findOne({ trackingCode });

  return trackingCodeIndex ? true : false;
};

// check if user is real or not
const checkUser = async (userId, res) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.json(jsonResponse(406, { message: "تراکنش معتبر نمی باشد!" }));
  }

  return user ? true : false;
};

// check if order is real or not
const checkOrder = async (body, res) => {
  const order = await Order.findOne({ _id: body.order });

  if (!order) {
    res.json(jsonResponse(406, { message: "تراکنش معتبر نمی باشد!" }));
    return false;
  } else if (
    order.status !== "جاری" ||
    order.transaction ||
    order.postalTrackingCode
  ) {
    res.json(jsonResponse(406, { message: "این سفارش قبلا پرداخت شده است!" }));
    return false;
  } else if (order.totalPrice !== body.amount) {
    res.json(
      jsonResponse(406, {
        message: "قیمت کل سفارش با مبلغ تراکنش مغایرت دارد!",
      })
    );
    return false;
  } else {
    return true;
  }
};

// check number if they are NaN or not
const checkTransactionNumbers = (body, fields, res) => {
  let isCorrect = true;
  for (const field of fields) {
    if (!body[field] || isNaN(body[field])) {
      isCorrect = false;
      break;
    }
  }

  if (!isCorrect) {
    res.json(
      jsonResponse(406, {
        message:
          "تمامی مقادیر تراکنش باید شماره باشند و شماره آن غیر صفر باشد!",
      })
    );
  }

  return isCorrect;
};

module.exports = { add_transaction };
