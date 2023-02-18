const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { jsonResponse, checkDataExist } = require("../functions");

const set_password = async (req, res) => {
  const body = req.body;

  if (!checkDataExist(body, ["userId", "password", "confirmPassword"], res)) {
    return null;
  }

  const checkUserStatus = await checkUser(body.userId, res);
  if (
    !checkUserStatus ||
    !checkPassword(body.password, body.confirmPassword, res)
  ) {
    return null;
  }

  bcrypt.hash(body.password, 10, async function (err, hash) {
    await User.findOneAndUpdate({ _id: body.userId }, { password: hash });
    res.json(jsonResponse(200, { message: "رمز عبور با موفقیت تعیین شد!" }));
  });
  //   const user = await User.findOne({ _id: body.userId });

  //   bcrypt.compare(body.password, user.password, function (err, result) {
  //     if (result) {
  //       // password is valid
  //     }
  //   });
};

// check if user is real or not or password has been set or not
const checkUser = async (userId, res) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.json(jsonResponse(406, { message: "کاربر مورد نظر معتبر نمی باشد!" }));
    return false;
  } else if (user.password) {
    res.json(
      jsonResponse(406, { message: "رمز عبوری برای این کاربر تعیین شده است!" })
    );
    return false;
  } else {
    return true;
  }
};

// check password strength and confirm password
const checkPassword = (password, confirmPassword, res) => {
  let errorText = "";
  if (password.length < 8) {
    errorText = "رمز عبور باید حداقل 8 کاراکتر باشد!";
  } else if (!password.match(/[a-z]+/)) {
    errorText = "رمز عبور باید شامل حروف کوچک انگلیسی باشد!";
  } else if (!password.match(/[A-Z]+/)) {
    errorText = "رمز عبور باید شامل حروف بزرگ انگلیسی باشد!";
  } else if (!password.match(/[0-9]+/)) {
    errorText = "رمز عبور باید شامل اعداد باشد!";
  } else if (!password.match(/[$@#&!]+/)) {
    errorText = "رمز عبور باید شامل کاراکتر خاص باشد!";
  } else if (password !== confirmPassword) {
    errorText = "رمز عبور و تایید آن تطابق ندارند!";
  }

  if (errorText) {
    res.json(jsonResponse(406, { message: errorText }));
    return false;
  } else {
    return true;
  }
};

module.exports = { set_password };
