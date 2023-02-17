const Order = require("../models/order.model");
const User = require("../models/user.model");
const Address = require("../models/address.model");
const Product = require("../models/product.model");
const { jsonResponse, checkDataExist } = require("../functions");

const add_order = async (req, res) => {
  const body = req.body;
  
  if (
    !checkDataExist(
      body,
      [
        "userId",
        "address",
        "products",
        "totalPrice",
        "paymentStatus",
        "paymentMethod",
        "sendingStatus",
        "sendingMethod",
      ],
      res
    )
  ) {
    return null;
  }

  let trackingCode = "";
  let checkTrackingCodeStatus = "";
  do {
    trackingCode = createTrackingCode();
    checkTrackingCodeStatus = await checkTrackingCode(trackingCode);
  } while (!checkTrackingCodeStatus);
  const checkUserStatus = await checkUser(body.userId, res);
  const checkAddressStatus = await checkAddress(body.address, res);
  const checkProductsStatus = await checkProducts(body.products, res);
  if (
    !checkUserStatus ||
    !checkAddressStatus ||
    !checkProductsStatus ||
    !checkPaymentStatus(body.paymentStatus) ||
    !checkPaymentMethod(body.paymentMethod) ||
    !checkSendingStatus(body.sendingStatus) ||
    !checkSendingMethod(body.sendingMethod)
  ) {
    return null;
  }

  // create new order
  await Order.create(body);

  res.json(jsonResponse(201, { message: "سفارش جدید با موفقیت افزوده شد!" }));
};

// create a 12 digits tracking code
const createTrackingCode = () => {
  return Math.floor(
    100 * 1000 * 1000 * 1000 + Math.random() * (900 * 1000 * 1000 * 1000)
  );
};

// check if tracking code exist in database or not
const checkTrackingCode = async (trackingCode, res) => {
  const trackingCodeIndex = await Order.findOne({ trackingCode });

  if (!trackingCodeIndex) {
    res.json(jsonResponse(406, { message: "کاربر مورد نظر معتبر نمی باشد!" }));
  }

  return trackingCodeIndex ? true : false;
};

// check if user is real or not
const checkUser = async (userId, res) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.json(jsonResponse(406, { message: "کاربر مورد نظر معتبر نمی باشد!" }));
  }

  return user ? true : false;
};

// check if address is real or not
const checkAddress = async (addressId, res) => {
  const address = await Address.findOne({ _id: addressId });

  if (!address) {
    res.json(jsonResponse(406, { message: "آدرس مورد نظر معتبر نمی باشد!" }));
  }

  return address ? true : false;
};

// check if products are real or not
const checkProducts = async (products, res) => {
  let isCorrect = true;
  for (const productId of products) {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      isCorrect = false;
    }
  }

  if (!isCorrect) {
    res.json(
      jsonResponse(406, { message: "محصولات مورد نظر معتبر نمی باشد!" })
    );
  }

  return isCorrect;
};

// check payment status to be a particular value
const checkPaymentStatus = async (paymentStatus, res) => {
  let isCorrect = true;
  if (paymentStatus !== "unpaid" || paymentStatus !== "paid") {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "وضعیت پرداخت معتبر نیست!" }));
  }

  return isCorrect;
};

// check payment method to be a particular value
const checkPaymentMethod = async (paymentMethod, res) => {
  let isCorrect = true;
  if (paymentMethod !== "zarinpal") {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "شیوه پرداخت معتبر نیست!" }));
  }

  return isCorrect;
};

// check sending status to be a particular value
const checkSendingStatus = async (sendingStatus, res) => {
  let isCorrect = true;
  if (sendingStatus !== "packing" || sendingStatus !== "posted") {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "وضعیت ارسال معتبر نیست!" }));
  }

  return isCorrect;
};

// check sending method to be a particular value
const checkSendingMethod = async (sendingMethod, res) => {
  let isCorrect = true;
  if (sendingMethod !== "express mail") {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "شیوه ارسال معتبر نیست!" }));
  }

  return isCorrect;
};

module.exports = { add_order };
