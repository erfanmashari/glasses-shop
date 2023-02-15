const User = require("../models/user.model");
const Product = require("../models/product.model");
const { jsonResponse, checkDataExist } = require("../functions");

// adding product id to user cart
const add_product_to_cart = async (req, res) => {
  const body = req.body;

  if (!checkDataExist(body, ["userId", "id"], res)) {
    return null;
  }

  const product = await Product.findOne({ _id: body.id });

  if (product) {
    User.findOne({ _id: body.userId }, (err, user) => {
      if (user) {
        // The below two lines will add the newly saved product's
        // ObjectID to the the User's cart array field
        user.cart.push(body.id);
        user.save();
        res.json(
          jsonResponse(201, {
            message: "محصول جدید با موفقیت به سبد خرید افزوده شد!",
          })
        );
      }
    });
  } else {
    res.json(jsonResponse(406, { message: "محصولی با این آیدی وجود ندارد!" }));
  }
};

module.exports = { add_product_to_cart };
