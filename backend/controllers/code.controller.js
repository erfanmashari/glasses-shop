const Code = require("../models/code.model");

const getVerifiedCode = async (code, type) => {
  return await Code.findOne({
    code: code,
    type: type,
    expiredAt: 0,
  });
};

const createVerficationCode = async (phoneNumber, type, res) => {
  // get all codes with related phone number
  const codes = await Code.find({ phoneNumber, type });

  const date = new Date();
  const nowTime = date.getTime();

  let isValidCodeExist = false;
  let previousCode = "";
  codes.forEach((code) => {
    if (code.expiredAt !== 0 && code.expiredAt > nowTime) {
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
      type: type,
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

// check if code exist or not expired
const checkConfirmCode = async (payload, res) => {
  const code = await Code.findOne(payload);

  const date = new Date();
  const nowTime = date.getTime();

  if (code && code.expiredAt !== 0 && code.expiredAt > nowTime) {
    // set code expire time to 0
    await Code.findOneAndUpdate(payload, { expiredAt: 0 });

    return true;
  } else if (code && code.expiredAt === 0) {
    res.json(jsonResponse(406, { message: "کد قبلا استفاده شده است!" }));
  } else if (code && code.expiredAt < nowTime) {
    res.json(jsonResponse(406, { message: "کد منقضی شده است!" }));
  } else {
    res.json(jsonResponse(404, { message: "کد مورد نظر پیدا نشد!" }));
  }
};

module.exports = { getVerifiedCode, createVerficationCode, checkConfirmCode };
