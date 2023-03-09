const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const {
  jsonResponse,
  checkDataExist,
  checkAuthorization,
} = require("../functions");

const add_comment = async (req, res) => {
  checkAuthorization(req.headers.authorization);

  const body = req.body;

  if (
    !checkDataExist(
      body,
      ["userId", "productId", "title", "description", "status", "stars"],
      res
    )
  ) {
    return null;
  }

  body.stars = Number(body.stars);

  const checkUserStatus = await checkUser(body.userId, res);
  const checkProductStatus = await checkProduct(body.productId, res);
  if (
    !checkUserStatus ||
    !checkProductStatus ||
    !checkDescription(body.description, res) ||
    !checkStatus(body.status, res) ||
    !checkStars(body.stars, res)
  ) {
    return null;
  }

  Comment.create(body)
    .then((result) => {
      User.findOne({ _id: body.userId }, (err, user) => {
        if (user) {
          // The below two lines will add the newly saved comment's
          // ObjectID to the the User's comments array field
          user.comments.push(result._id);
          user.save();
          Product.findOne({ _id: body.productId }, (err, product) => {
            if (product) {
              // The below two lines will add the newly saved comment's
              // ObjectID to the the Product's comments array field
              product.comments.push(result._id);
              product.save();
              res.json(
                jsonResponse(200, { message: "نظر جدید با موفقیت افزوده شد!" })
              );
            }
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
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

// check comment description
const checkDescription = (description, res) => {
  if (description.length < 10) {
    res.json(jsonResponse(406, { message: "توضیح نظر بلندتری وارد کنید!" }));
    return false;
  } else {
    return true;
  }
};

// check comment status
const checkStatus = (status, res) => {
  if (
    status !== "در حال بررسی" &&
    status !== "تایید شده" &&
    status !== "رد شده"
  ) {
    res.json(jsonResponse(406, { message: "وضعیت نظر معتبر نیست!" }));
    return false;
  } else {
    return true;
  }
};

// check comment stars
const checkStars = (stars, res) => {
  if (stars !== 1 && stars !== 2 && stars !== 3 && stars !== 4 && stars !== 5) {
    res.json(
      jsonResponse(406, {
        message: "ستاره های محصول باید عدد صحیح بین 1 تا 5 باشد!",
      })
    );
    return false;
  } else {
    return true;
  }
};

module.exports = { add_comment };
