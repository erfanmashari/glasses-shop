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
        "status",
        "paymentMethod",
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
  const checkProductsStatus = await checkProducts(
    body.products,
    body.totalPrice,
    res
  );
  if (
    !checkTotalPriceType(body.totalPrice, res) ||
    !checkUserStatus ||
    !checkAddressStatus ||
    !checkProductsStatus ||
    !checkOrderStatus(body.status, res) ||
    !checkPaymentStatus(body.paymentStatus, res) ||
    !checkPaymentMethod(body.paymentMethod, res)
  ) {
    return null;
  }

  // create new order
  await Order.create(body);

  res.json(jsonResponse(201, { message: "سفارش جدید با موفقیت افزوده شد!" }));
};

// checking type of total price to be number
const checkTotalPriceType = (totalPrice, res) => {
  let isCorrect = true;
  if (isNaN(Number(totalPrice))) {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "قیمت کل باید شماره باشد!" }));
  }

  return isCorrect;
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

// check if products are real or not and match total price with products prices
const checkProducts = async (products, totalPrice, res) => {
  if (!products.length) {
    res.json(
      jsonResponse(406, {
        message: "حداقل یک محصول باید برای هر سفارش وجود داشته باشد!",
      })
    );
    return false;
  }

  let isCorrect = true;
  let productsTotalPrice = 0;

  const dateOfNow = new Date();
  for (const productId of products) {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      isCorrect = false;
      break;
    } else {
      const dateOfDiscountTime = product.discountTime
        ? new Date(product.discountTime)
        : dateOfNow;

      if (
        product.discountPercent &&
        product.discountedPrice &&
        product.discountTime &&
        dateOfNow < dateOfDiscountTime
      ) {
        productsTotalPrice += product.discountedPrice;
      } else {
        productsTotalPrice += product.price;
      }
    }
  }

  if (!isCorrect) {
    res.json(
      jsonResponse(406, { message: "محصولات مورد نظر معتبر نمی باشد!" })
    );
  } else if (productsTotalPrice !== totalPrice) {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "قیمت کل محصولات درست نمی باشد!" }));
  }

  return isCorrect;
};

// check order status to be a particular value
const checkOrderStatus = async (status, res) => {
  let isCorrect = true;
  if (status !== "unpaid" || status !== "packing" || status !== "posted") {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "وضعیت سفارش معتبر نیست!" }));
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
