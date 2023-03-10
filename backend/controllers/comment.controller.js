const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const {
  jsonResponse,
  checkDataExist,
  checkAuthorization,
} = require("../functions");

// get single comment by id
const comment_single = async (req, res) => {
  checkAuthorization(req.headers.authorization);

  const commentIndex = await Comment.findById(req.params.id);
  const comment = { ...commentIndex }._doc;
  comment.product = await getProduct(comment.product);
  res.json(jsonResponse(200, { comment }));
};

const add_comment = async (req, res) => {
  checkAuthorization(req.headers.authorization);

  const body = req.body;

  if (
    !checkDataExist(
      body,
      ["user", "product", "title", "description", "status", "stars"],
      res
    )
  ) {
    return null;
  }

  body.stars = Number(body.stars);

  const checkUserStatus = await checkUser(body.user, res);
  const checkProductStatus = await checkProduct(body.product, res);
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
      User.findOne({ _id: body.user }, (err, user) => {
        if (user) {
          // The below two lines will add the newly saved comment's
          // ObjectID to the the User's comments array field
          user.comments.push(result._id);
          user.save();
          Product.findOne({ _id: body.product }, (err, product) => {
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

const delete_comment = async (req, res) => {
  checkAuthorization(req.headers.authorization);
  
  const body = req.body;

  if (!checkDataExist(body, ["id", "user"], res)) {
    return null;
  }

  User.findOne({ _id: body.user }, (err, user) => {
    if (user) {
      // The below two lines will set the newly comments
      // to the the User's comments array field
      user.comments = user.comments.filter(item => item.valueOf() !== body.id);
      user.save();

      Comment.findByIdAndDelete(body.id)
        .then((result) => {
          res.json(jsonResponse(200, { message: "نظر شما حذف شد!" }));
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
  });
}

// get product of comment
const getProduct = async (productId, res) => {
  const product = await Product.findOne({ _id: productId });

  return product;
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

module.exports = { comment_single, add_comment, delete_comment };
