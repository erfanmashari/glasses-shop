const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  jsonResponse,
  checkDataExist,
  checkAuthorization,
} = require("../functions");
const {
  createVerficationCode,
  checkConfirmCode,
} = require("./code.controller");

// set or change password
const set_or_change_password = async (req, res) => {
  checkAuthorization(req.headers.authorization);

  const body = req.body;

  if (!checkDataExist(body, ["user", "password", "confirmPassword"], res)) {
    return null;
  }

  const checkUserStatus = await checkUser(body.user, res);
  if (
    !checkUserStatus ||
    !checkPassword(body.password, body.confirmPassword, res)
  ) {
    return null;
  }

  bcrypt.hash(body.password, 10, async function (err, hash) {
    await User.findOneAndUpdate({ _id: body.user }, { password: hash });
    res.json(jsonResponse(200, { message: "رمز عبور جدید تایید شد!" }));
  });
  //   const user = await User.findOne({ _id: body.userId });

  //   bcrypt.compare(body.password, user.password, function (err, result) {
  //     if (result) {
  //       // password is valid
  //     }
  //   });
};

// change user password
const change_password = async (req, res) => {
  const body = req.body;

  if (!checkDataExist(body, ["user", "phoneNumber"], res)) {
    return null;
  }

  const user = await User.findOne({ _id: body.user });

  if (user) {
    if (!checkPhoneNumber(body.phoneNumber, user.phoneNumber, res)) {
      return null;
    }

    await createVerficationCode(body.phoneNumber, "changePassword", res);
  } else {
    res.json(jsonResponse(406, { message: "کاربر مورد نظر معتبر نمی باشد!" }));
  }
};

const confirm_code = async (req, res) => {
  const body = req.body;
  const phoneNumber = body.phoneNumber;

  if (phoneNumber) {
    if (
      !checkDataExist(
        body,
        ["code", "phoneNumber", "password", "confirmPassword"],
        res
      )
    ) {
      return null;
    }

    const confirmCodeStatus = await checkConfirmCode(
      phoneNumber,
      body.code,
      "changePassword",
      res
    );

    if (!confirmCodeStatus) {
      return null;
    }

    if (!checkPassword(body.password, body.confirmPassword, res)) {
      return null;
    }

    // update user password
    bcrypt.hash(body.password, 10, async function (err, hash) {
      await User.findOneAndUpdate(
        { phoneNumber: phoneNumber },
        { password: hash }
      );
      res.json(jsonResponse(200, { message: "رمز عبور با تغییر کرد!" }));
    });
  } else {
    res.json(
      jsonResponse(406, {
        message: "درخواست معتبر نمی باشد!",
      })
    );
  }
};

// check if user is real or not or password has been set or not
const checkUser = async (userId, res) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.json(jsonResponse(406, { message: "کاربر مورد نظر معتبر نمی باشد!" }));
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

// check if given phone number is the same as user phone number
const checkPhoneNumber = (phoneNumber, userPhoneNumber, res) => {
  if (phoneNumber !== userPhoneNumber) {
    res.json(jsonResponse(406, { message: "شماره همراه معتبر نمی باشد!" }));
    return false;
  } else {
    return true;
  }
};

module.exports = { set_or_change_password, change_password, confirm_code };
