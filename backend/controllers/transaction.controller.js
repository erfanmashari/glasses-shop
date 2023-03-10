const Transaction = require("../models/transaction.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const {
  checkDataExist,
  jsonResponse,
  checkAuthorization,
} = require("../functions");

const add_transaction = async (req, res) => {
  checkAuthorization(req.headers.authorization);

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

  // create and check tracking code for transaction model
  let trackingCode = createTrackingCode();
  let checkTrackingCodeStatus = await checkTrackingCode(trackingCode);
  while (checkTrackingCodeStatus) {
    trackingCode = createTrackingCode();
    checkTrackingCodeStatus = await checkTrackingCode(trackingCode);
  }
  body.trackingCode = trackingCode;
  body.expireDate = `14${body.expireYear}/${body.expireMonth}`;

  // create and check postal tracking code for order model
  let postalTrackingCode = createPostalTrackingCode();
  let checkPostalTrackingCodeStatus = await checkPostalTrackingCode(
    postalTrackingCode
  );
  while (checkPostalTrackingCodeStatus) {
    postalTrackingCode = createPostalTrackingCode();
    checkPostalTrackingCodeStatus = await checkPostalTrackingCode(
      postalTrackingCode
    );
  }

  // create new transaction instance
  await Transaction.create(body)
    .then((result) => {
      Order.findOneAndUpdate(
        { _id: body.order },
        {
          status: "???????? ????????",
          transaction: result._id,
          postalTrackingCode,
        }
      ).then((order) => {
        if (order) {
          res.json(
            jsonResponse(201, {
              message: "???????????? ???? ???????????? ?????????? ????!",
              trackingCode,
            })
          );
        }
      });
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

// create a 21 digits postal tracking code
const createPostalTrackingCode = () => {
  return Math.floor(
    100 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 +
      Math.random() * (900 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000)
  );
};

// check if tracking code exist in database or not
const checkPostalTrackingCode = async (postalTrackingCode) => {
  const postalTrackingCodeIndex = await Order.findOne({ postalTrackingCode });

  return postalTrackingCodeIndex ? true : false;
};

// check if user is real or not
const checkUser = async (userId, res) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.json(jsonResponse(406, { message: "???????????? ?????????? ?????? ????????!" }));
  }

  return user ? true : false;
};

// check if order is real or not
const checkOrder = async (body, res) => {
  const order = await Order.findOne({ _id: body.order });

  if (!order) {
    res.json(jsonResponse(406, { message: "???????????? ?????????? ?????? ????????!" }));
    return false;
  } else if (
    order.status !== "????????" ||
    order.transaction ||
    order.postalTrackingCode
  ) {
    res.json(jsonResponse(406, { message: "?????? ?????????? ???????? ???????????? ?????? ??????!" }));
    return false;
  } else if (order.totalPrice !== body.amount) {
    res.json(
      jsonResponse(406, {
        message: "???????? ???? ?????????? ???? ???????? ???????????? ???????????? ????????!",
      })
    );
    return false;
  } else {
    return order;
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
          "?????????? ???????????? ???????????? ???????? ?????????? ?????????? ?? ?????????? ???? ?????? ?????? ????????!",
      })
    );
  }

  return isCorrect;
};

module.exports = { add_transaction };
