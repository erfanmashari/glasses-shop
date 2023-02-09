const Code = require("../models/code.model");
const jwt = require("jsonwebtoken");
const { jsonResponse, checkDataExist } = require("../functions");
const { registerUser } = require("./user.controller");

// checking phine number if its correct or not
const checkPhoneNumber = (phoneNumber, res) => {
  if (phoneNumber.length !== 10) {
    res.status(406).json(
      jsonResponse(406, {
        message: "شماره همراه باید حداقل شامل 10 کاراکتر باشد!",
      })
    );
  } else if (phoneNumber.charAt(0) !== "0") {
    res.status(406).json(
      jsonResponse(406, {
        message: "شماره همراه باید با 0 شروع شود!",
      })
    );
  }
};

const createVerficationCode = async (phoneNumber, res) => {
  // get all codes with related phone number
  const codes = await Code.find({ phoneNumber }).exec();

  const date = new Date();
  const nowTime = date.getTime();

  let isValidCodeExist = false;
  codes
    ? codes
    : [].forEach((code) => {
        if (
          code.type === "authentication" &&
          code.expiredAt !== 0 &&
          code.expiredAt <= nowTime
        ) {
          isValidCodeExist = true;
        }
      });

  if (isValidCodeExist) {
    res.status(406).json(
      jsonResponse(406, { message: "کد ارسال شده قبلی هنوز معتبر است!" })
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
      jsonResponse(200, { message: "کد تایید جدید با موفقیت ارسال شد!" })
    );
  }
};

const login = async (req, res) => {
  const body = req.body;

  body.phoneNumber = body.phoneNumber.toString();

  if (
    !checkDataExist(body, ["phoneNumber"], res) ||
    !checkPhoneNumber(bodyphoneNumber, res)
  ) {
    return null;
  }

  req.session.loginPhoneNumberLPN8463 = phoneNumber;

  createVerficationCode(phoneNumber, res);
};

// const confirm_code = async (req, res) => {
//   const body = req.body;
//   const phoneNumber = req.session.loginPhoneNumberLPN8463;

//   checkDataExist(body, ["code"], res);

//   validateConfirmCode({ phoneNumber, code: body.code }, res);
// };

// const register = async (req, res) => {
//   const body = req.body;
//   const phoneNumber = req.session.loginPhoneNumberLPN8463;

//   checkDataExist(body, ["code"], res);

//   validateConfirmCode({ phoneNumber, code: body.code }, res);
// };

// // check if code exist or not expired
// const validateConfirmCode = async (payload, res) => {
//   const codeFilter = {
//     ...payload,
//     type: "authenticationRegister",
//   };
//   const code = await Code.findOne(codeFilter);

//   const date = new Date();
//   const nowTime = date.getTime();

//   if (code && code.expiredAt !== 0 && code.expiredAt >= nowTime) {
//     // set code expire time to 0
//     await Code.findOneAndUpdate(codeFilter, { expiredAt: 0 });

//     // create user with that phone number
//     await registerUser(payload.phoneNumber);

//     res.json(
//       jsonResponse(200, {
//         message: "کد معتبر است!",
//         token: generateJWTToken({
//           sub: code._id,
//           phoneNumber: payload.phoneNumber,
//         }),
//       })
//     );
//   } else if (code && code.expiredAt === 0) {
//     res.json(jsonResponse(406, { message: "کد قبلا استفاده شده است!" }));
//   } else if (code && code.expiredAt < nowTime) {
//     res.json(jsonResponse(406, { message: "کد منقضی شده است!" }));
//   } else {
//     res.json(jsonResponse(404, { message: "کد مورد نظر پیدا نشد!" }));
//   }
// };

// const generateJWTToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
// };

module.exports = { login, confirm_code, register };
