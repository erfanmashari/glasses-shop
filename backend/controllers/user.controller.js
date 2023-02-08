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

const checkPhoneNumber = (phoneNumber, res) => {
  if (phoneNumber.toString().length !== 10) {
    res.status(406).json(
      jsonResponse(406, {
        message: "شماره همراه باید بدون صفر و تعداد کاراکتر آن ده تا باشد!",
      })
    );
    return false;
  } else {
    return true;
  }
};

const add_user = async (req, res) => {
  const body = req.body;

  // to make phone number bumber type
  body.phoneNumber = body.phoneNumber ? Number(body.phoneNumber) : 0;
  // for that to make NaN to 0
  body.phoneNumber = isNaN(body.phoneNumber) ? 0 : body.phoneNumber;

  if (
    !checkDataExist(
      body,
      ["phoneNumber", "firstName", "lastName", "gender"],
      res
    ) ||
    !checkPhoneNumber(body.phoneNumber, res)
  ) {
    return null;
  }

  if (!body.username) {
    body.username = `${body.firstName} ${body.lastName}`;
  }

  // create new user
  await User.create(body);

  res
    .status(201)
    .json(jsonResponse(201, { message: "کاربر جدید با موفقیت افزوده شد!" }));
};

module.exports = { user_index, add_user };
