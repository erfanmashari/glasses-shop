const User = require("../models/user.model");
const { jsonResponse, checkDataExist } = require("../functions");

const user_index = async (req, res) => {
  await User.find()
    .sort({ createdAt: -1 })
    .then((users) => {
      res.json(jsonResponse(200, { users }));
    })
    .catch((err) => {
      console.log(err);
    });
};

const add_user = async (req, res) => {
  const body = req.body;

  // make english text lower case
  body.nameEn = body.nameEn.toLowerCase();

  if (
    !checkDataExist(body, ["nameFa", "nameEn"], res)
  ) {
    return null;
  }

  // create new user
  const userIndex = await User.create(body);

  res
    .status(201)
    .json(jsonResponse(201, { message: "کاربر جدید با موفقیت افزوده شد!" }));
};

module.exports = { user_index, add_user };
