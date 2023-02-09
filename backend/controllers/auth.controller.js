const Code = require("../models/code.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { jsonResponse, checkDataExist } = require("../functions");
const { userSinglePhoneNumber, registerUser } = require("./user.controller");

// checking phine number if its correct or not
const checkPhoneNumber = (phoneNumber, res) => {
  if (isNaN(Number(phoneNumber))) {
    res.json(
      jsonResponse(406, {
        message: "شماره همراه نباید شامل حروف باشد!",
      })
    );
  } else if (phoneNumber.length !== 11) {
    res.json(
      jsonResponse(406, {
        message: "شماره همراه باید شامل 11 کاراکتر باشد!",
      })
    );
  } else if (phoneNumber.charAt(0) !== "0") {
    res.json(
      jsonResponse(406, {
        message: "شماره همراه باید با 0 شروع شود!",
      })
    );
  } else {
    return true;
  }
};

const createVerficationCode = async (phoneNumber, res) => {
  // get all codes with related phone number
  const codes = await Code.find({ phoneNumber });

  const date = new Date();
  const nowTime = date.getTime();

  let isValidCodeExist = false;
  let previousCode = "";
  codes.forEach((code) => {
    if (
      code.type === "authentication" &&
      code.expiredAt !== 0 &&
      code.expiredAt > nowTime
    ) {
      previousCode = code.code;
      isValidCodeExist = true;
    }
  });

  if (isValidCodeExist) {
    res.json(
      jsonResponse(406, {
        message: "کد ارسال شده قبلی هنوز معتبر است!",
        code: previousCode,
      })
    );
  } else {
    // create 6 digits number
    const verificationCode = Math.floor(
      100 * 1000 + Math.random() * (900 * 1000)
    );

    // get code expire time
    const codeExp = new Date(date.getTime() + 2 * 60 * 1000).getTime();

    Code.create({
      code: verificationCode,
      type: "authentication",
      phoneNumber,
      expiredAt: codeExp,
    });

    res.status(200).json(
      jsonResponse(200, {
        message: "کد تایید جدید با موفقیت ارسال شد!",
        code: verificationCode,
      })
    );
  }
};

const login = async (req, res) => {
  const body = req.body;

  if (!checkDataExist(body, ["phoneNumber"], res)) {
    return null;
  }

  body.phoneNumber = body.phoneNumber.toString();

  if (!checkPhoneNumber(body.phoneNumber, res)) {
    return null;
  }

  req.session.loginPhoneNumberLPN8463 = body.phoneNumber;

  createVerficationCode(body.phoneNumber, res);
};

const generateJWTToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// check if code exist or not expired
const checkConfirmCode = async (req, payload, res) => {
  const codeFilter = {
    ...payload,
    type: "authentication",
  };
  const code = await Code.findOne(codeFilter);

  const date = new Date();
  const nowTime = date.getTime();

  if (code && code.expiredAt !== 0 && code.expiredAt > nowTime) {
    // set code expire time to 0
    await Code.findOneAndUpdate(codeFilter, { expiredAt: 0 });

    const user = await userSinglePhoneNumber(payload.phoneNumber);

    if (user) {
      res.status(200).json(
        jsonResponse(200, {
          message: "کد معتبر است و کاربر قبلا ثبت نام کرده است!",
          token: generateJWTToken({
            sub: code._id,
            phoneNumber: payload.phoneNumber,
          }),
        })
      );
    } else {
      req.session.loginCodeValidateStatusOPQ868 = true;
      res.status(200).json(
        jsonResponse(200, {
          message: "کد معتبر است و کاربری با این شماره همراه وجود ندارد!",
        })
      );
    }
  } else if (code && code.expiredAt === 0) {
    res.json(jsonResponse(406, { message: "کد قبلا استفاده شده است!" }));
  } else if (code && code.expiredAt < nowTime) {
    res.json(jsonResponse(406, { message: "کد منقضی شده است!" }));
  } else {
    res.json(jsonResponse(404, { message: "کد مورد نظر پیدا نشد!" }));
  }
};

const confirm_code = async (req, res) => {
  const body = req.body;
  const phoneNumber = req.session.loginPhoneNumberLPN8463;
  body.phoneNumber = phoneNumber;

  if (phoneNumber) {
    if (!checkDataExist(body, ["code", "phoneNumber"], res)) {
      return null;
    }

    checkConfirmCode(req, { phoneNumber, code: body.code }, res);
  } else {
    res.json(
      jsonResponse(406, {
        message: "درخواست معتبر نمی باشد!",
      })
    );
  }
};

const register = async (req, res) => {
  const body = req.body;
  const phoneNumber = req.session.loginPhoneNumberLPN8463;
  body.phoneNumber = phoneNumber;
  const codeValidateStatus = req.session.loginCodeValidateStatusOPQ868;

  // check if code confirmed
  if (codeValidateStatus && phoneNumber) {
    registerUser(body, res);
  } else {
    res.json(
      jsonResponse(406, {
        message: "درخواست معتبر نمی باشد!",
      })
    );
  }
};

module.exports = { login, confirm_code, register };
