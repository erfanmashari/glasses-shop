const Order = require("../models/order.model");
const User = require("../models/user.model");
const Address = require("../models/address.model");
const Cart = require("../models/cart.model");
const {
  jsonResponse,
  checkDataExist,
  checkAuthorization,
} = require("../functions");

// get single order by id
const order_single = async (req, res) => {
  checkAuthorization(req.headers.authorization);

  const orderIndex = await Order.findById(req.params.id);
  const order = { ...orderIndex }._doc;
  order.address = await getAddress(order.address);
  res.json(jsonResponse(200, { order }));
};

const add_order = async (req, res) => {
  checkAuthorization(req.headers.authorization);

  const body = req.body;

  if (
    !checkDataExist(
      body,
      [
        "user",
        "address",
        "products",
        "status",
        "paymentMethod",
        "sendingMethod",
      ],
      res
    )
  ) {
    return null;
  }

  let trackingCode = createTrackingCode();
  let checkTrackingCodeStatus = await checkTrackingCode(trackingCode);
  while (checkTrackingCodeStatus) {
    trackingCode = createTrackingCode();
    checkTrackingCodeStatus = await checkTrackingCode(trackingCode);
  }
  body.trackingCode = trackingCode;
  const checkUserStatus = await checkUser(body.user, res);
  const checkAddressStatus = await checkAddress(body.address, res);
  // check products and set total price
  const checkProductsStatus = await checkProducts(body, body.products, res);
  if (
    !checkUserStatus ||
    !checkAddressStatus ||
    !checkProductsStatus ||
    !checkOrderStatus(body.status, res) ||
    !checkPaymentMethod(body.paymentMethod, res) ||
    !checkSendingMethod(body.sendingMethod, res)
  ) {
    return null;
  }

  // create new order
  await Order.create(body)
    .then((result) => {
      User.findOne({ _id: body.user }, (err, user) => {
        if (user) {
          // The below two lines will add the newly saved order's
          // ObjectID to the the User's orders array field
          user.orders.push(result._id);
          user.cart = [];
          user.save();
          res.json(
            jsonResponse(201, {
              message: "?????????? ???????? ???? ???????????? ???????????? ????!",
              order: result._id,
              amount: result.totalPrice,
            })
          );
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// get order address
const getAddress = async (addressId, res) => {
  const address = await Address.findOne({ _id: addressId });

  return address;
};

// create a 12 digits tracking code
const createTrackingCode = () => {
  return Math.floor(
    100 * 1000 * 1000 * 1000 + Math.random() * (900 * 1000 * 1000 * 1000)
  );
};

// check if tracking code exist in database or not
const checkTrackingCode = async (trackingCode) => {
  const trackingCodeIndex = await Order.findOne({ trackingCode });

  return trackingCodeIndex ? true : false;
};

// check if user is real or not
const checkUser = async (userId, res) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.json(jsonResponse(406, { message: "?????????? ???????? ?????? ?????????? ?????? ????????!" }));
  }

  return user ? true : false;
};

// check if address is real or not
const checkAddress = async (addressId, res) => {
  const address = await Address.findOne({ _id: addressId });

  if (!address) {
    res.json(jsonResponse(406, { message: "???????? ???????? ?????? ?????????? ?????? ????????!" }));
  }

  return address ? true : false;
};

// check if products are real or not and set total price
const checkProducts = async (body, products, res) => {
  if (!products.length) {
    res.json(
      jsonResponse(406, {
        message: "?????????? ???? ?????????? ???????? ???????? ???? ?????????? ???????? ?????????? ????????!",
      })
    );
    return false;
  }

  let isCorrect = true;
  let productsTotalPrice = 0;
  const productsList = [];

  const dateOfNow = new Date();
  for (const productId of products) {
    const product = await Cart.findOne({ _id: productId }).exec();
    if (!product) {
      isCorrect = false;
      break;
    } else {
      productsList.push({
        user: product.user,
        isAvailable: product.isAvailable,
        nameFa: product.nameFa,
        nameEn: product.nameEn,
        category: product.category,
        price: product.price,
        brand: product.brand,
        size: product.size,
        image: product.image,
        seller: product.seller,
        frameColor: product.frameColor,
        isOriginal: product.isOriginal,
        isSpecialSale: product.isSpecialSale,
        isFreeDelivery: product.isFreeDelivery,
        testAtHome: product.testAtHome,
        model: product.model,
        number: product.number,
        discountPercent: product.discountPercent,
        discountedPrice: product.discountedPrice,
        discountTime: product.discountTime,
      });

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

      await removeProductsFromCart(productId);
    }
  }

  if (!isCorrect) {
    res.json(
      jsonResponse(406, { message: "?????????????? ???????? ?????? ?????????? ?????? ????????!" })
    );
  } else {
    body.totalPrice = productsTotalPrice;
    body.products = productsList;
  }

  return isCorrect;
};

// remove products from cart
const removeProductsFromCart = async (id) => {
  // remove product from cart model in databse
  await Cart.findOneAndDelete({ _id: id });
};

// check order status to be a particular value
const checkOrderStatus = async (status, res) => {
  let isCorrect = true;
  if (
    status !== "????????" &&
    status !== "???????? ????????" &&
    status !== "?????????? ??????" &&
    status !== "?????????? ??????" &&
    status !== "?????? ??????"
  ) {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "?????????? ?????????? ?????????? ????????!" }));
  }

  return isCorrect;
};

// check payment method to be a particular value
const checkPaymentMethod = async (paymentMethod, res) => {
  let isCorrect = true;
  if (paymentMethod !== "???????? ??????") {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "???????? ???????????? ?????????? ????????!" }));
  }

  return isCorrect;
};

// check sending method to be a particular value
const checkSendingMethod = async (sendingMethod, res) => {
  let isCorrect = true;
  if (sendingMethod !== "?????? ????????????") {
    isCorrect = false;
    res.json(jsonResponse(406, { message: "???????? ?????????? ?????????? ????????!" }));
  }

  return isCorrect;
};

module.exports = { order_single, add_order };
