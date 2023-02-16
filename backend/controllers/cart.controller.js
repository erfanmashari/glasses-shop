const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Seller = require("../models/seller.model");
const { jsonResponse, checkDataExist } = require("../functions");

// adding product id to user cart
const add_product_to_cart = async (req, res) => {
  const body = req.body;

  if (
    !checkDataExist(body, ["userId", "_id", "size", "frameColor"], res) ||
    !checkDataExist(body.frameColor, ["seller"], res)
  ) {
    return null;
  }

  const product = await Product.findOne({ _id: body._id });
  if (product) {
    const checkSizeStatus = checkSize(body.size, product, res);
    const checkColorStatus = checkColor(body.frameColor, product, res);
    if (!checkSizeStatus || !checkColorStatus) {
      return null;
    }

    const seller = await Seller.findOne({ _id: body.frameColor.seller._id });
    if (seller) {
      const cartProduct = {
        userId: body.userId,
        isAvailable: product.isAvailable,
        nameFa: product.nameFa,
        nameEn: product.nameEn,
        category: product.category,
        price: product.price,
        brand: product.brand,
        size: body.size,
        image: product.images.find(
          (obj) => obj.isCoverImage === "true" || obj.isCoverImage === true
        ),
        seller: seller,
        frameColor: body.frameColor,
        isOriginal: product.isOriginal,
        isSpecialSale: product.isSpecialSale,
        isFreeDelivery: product.isFreeDelivery,
        testAtHome: product.testAtHome,
        model: product.model,
        discountPercent: product.discountPercent,
        discountedPrice: product.discountedPrice,
        discountTime: product.discountTime,
      };

      Cart.create(cartProduct)
        .then((result) => {
          User.findOne({ _id: body.userId }, (err, user) => {
            if (user) {
              // The below two lines will add the newly saved cart's
              // ObjectID to the the User's cart array field
              user.cart.push(result);
              user.save();
              res.json(
                jsonResponse(201, {
                  message: "محصول جدید با موفقیت به سبد خرید افزوده شد!",
                })
              );
            }
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    } else {
      res.json(jsonResponse(406, { message: "فروشنده محصول معتبر نمی باشد!" }));
    }
  } else {
    res.json(jsonResponse(406, { message: "محصولی با این آیدی وجود ندارد!" }));
  }
};

// check color
const checkColor = (color, product, res) => {
  let isCorrect = false;
  for (const productColor of product.frameColors) {
    if (
      productColor.nameFa === color.nameFa &&
      productColor.nameEn === color.nameEn &&
      productColor.color === color.color &&
      productColor.isAvailable === color.isAvailable &&
      productColor.seller._id === color.seller._id
    ) {
      isCorrect = true;
      break;
    }
  }

  if (!isCorrect) {
    res.json(jsonResponse(406, { message: "رنگ محصول درست نمی باشد!" }));
  }

  return isCorrect;
};

// check size if it is correct
const checkSize = async (size, product, res) => {
  let isCorrect = false;
  for (const productSize of product.sizes) {
    if (productSize === size) {
      isCorrect = true;
      break;
    }
  }

  if (!isCorrect) {
    res.json(jsonResponse(406, { message: "سایز محصول درست نمی باشد!" }));
  }

  return isCorrect;
};

module.exports = { add_product_to_cart };
