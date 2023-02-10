const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { jsonResponse, checkDataExist } = require("../functions");

// get all users
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

// get one user by id
const user_index_phone_number = async (req, res) => {
  await User.findOne({ phoneNumber: req.params.phoneNumber })
    .sort({ createdAt: -1 })
    .then((user) => {
      res.json(jsonResponse(200, { user }));
    })
    .catch((err) => {
      console.log(err);
    });
};

const checkPhoneNumber = (phoneNumber, res) => {
  if (phoneNumber.length !== 11) {
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

const registerUser = async (body, res) => {
  body.phoneNumber = body.phoneNumber.toString();

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
  const newUser = await User.create(body);

  res.status(201).json(
    jsonResponse(201, {
      message: "ثبت نام با موفقیت انجام شد!",
      token: jwt.sign(
        {
          sub: newUser._id,
          phoneNumber: body.phoneNumber,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      ),
    })
  );
};

// export functions
const userSinglePhoneNumber = async (phoneNumber) => {
  return await User.findOne({ phoneNumber });
};

module.exports = { user_index, user_index_phone_number, registerUser, userSinglePhoneNumber };
