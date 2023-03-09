const jwt = require("jsonwebtoken");
const { jsonResponse, checkDataExist } = require("../functions");
const { userSinglePhoneNumber, registerUser } = require("./user.controller");
const {
  getVerifiedCode,
  createVerficationCode,
  checkConfirmCode,
} = require("./code.controller");

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

  createVerficationCode(body.phoneNumber, "authentication", res);
};

const confirm_code = async (req, res) => {
  const body = req.body;
  const phoneNumber = body.phoneNumber;

  if (phoneNumber) {
    if (!checkDataExist(body, ["code", "phoneNumber"], res)) {
      return null;
    }

    const confirmCodeStatus = await checkConfirmCode(
      phoneNumber,
      body.code,
      "authentication",
      res
    );

    if (!confirmCodeStatus) {
      return null;
    }

    const user = await userSinglePhoneNumber(phoneNumber);

    res.json(
      jsonResponse(200, {
        message: "کد معتبر است!",
        token: user
          ? generateJWTToken({
              phoneNumber: phoneNumber,
            })
          : undefined,
      })
    );
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
  if (!checkPhoneNumber(body.phoneNumber, res)) {
    return null;
  }

  const code = await getVerifiedCode(body.code, "authentication");

  // check if code exist
  if (code) {
    registerUser(body, res);
  } else {
    res.json(
      jsonResponse(406, {
        message: "درخواست معتبر نمی باشد!",
      })
    );
  }
};

// checking phone number if its correct or not
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

const generateJWTToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { login, confirm_code, register };
