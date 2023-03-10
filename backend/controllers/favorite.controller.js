const User = require("../models/user.model");
const Product = require("../models/product.model");
const {
  jsonResponse,
  checkDataExist,
  checkAuthorization,
} = require("../functions");

const add_favorite_product = async (req, res) => {
  checkAuthorization(req.headers.authorization);

  const body = req.body;

  if (!checkDataExist(body, ["user", "product"], res)) {
    return null;
  }

  const checkUserStatus = await checkUser(body.user, res);
  const checkProductStatus = await checkProduct(body.product, res);
  if (!checkUserStatus || !checkProductStatus) {
    return null;
  }

  User.findOne({ _id: body.user }, (err, user) => {
    if (user) {
      // The below two lines will add the newly favorite's product
      // ObjectID to the the User's favorites array field
      user.favorites.push(body.product);
      user.save();
      res.json(
        jsonResponse(200, {
          message: "محصول مورد علاقه جدید با موفقیت افزوده شد!",
        })
      );
    }
  });
};

// delete favorite product
const delete_favorite_product = (req, res) => {
  checkAuthorization(req.headers.authorization);

  const body = req.body;

  if (!checkDataExist(body, ["user", "product"], res)) {
    return null;
  }

  User.findOne({ _id: body.user }, (err, user) => {
    if (user) {
      // The below two lines will set the newly favorites
      // to the the User's favorites array field
      user.favorites = user.favorites.filter(
        (item) => item.valueOf() !== body.product
      );
      user.save();

      res.json(
        jsonResponse(200, {
          message: "محصول موردنظر از لیست محصولات موردعلاقه حذف شد!",
        })
      );
    }
  });
};

// check if user is real or not
const checkUser = async (userId, res) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.json(jsonResponse(406, { message: "کاربر مورد نظر معتبر نمی باشد!" }));
  }

  return user ? true : false;
};

// check if product is real or not
const checkProduct = async (productId, res) => {
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    res.json(jsonResponse(406, { message: "محصول مورد نظر وجود ندارد!" }));
  }

  return product ? true : false;
};

module.exports = { add_favorite_product, delete_favorite_product };
