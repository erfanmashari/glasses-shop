const User = require("../models/user.model");
const Address = require("../models/address.model");
const Cart = require("../models/cart.model");
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
  const user = await User.findOne({ phoneNumber: req.params.phoneNumber }).sort(
    { createdAt: -1 }
  );
  if (user) {
    user.addresses = await getAddresses(user.addresses);
    user.cart = await getCart(user.cart);
    res.json(jsonResponse(200, { user }));
  } else {
    res.json(jsonResponse(404, { message: "کاربری با این شماره همراه وجود ندارد!" }));
  }
};

// edit only personal informations of user
const edit_personal_info = (req, res) => {
  const body = req.body;
  body.email = body.email ? body.email.toLowerCase() : null;

  if (
    !checkDataExist(
      body,
      ["phoneNumber", "firstName", "lastName", "username", "gender"],
      res
    ) ||
    !checkPhoneNumber(body.phoneNumber, res) ||
    !checkGender(body.gender, res) ||
    (body.email && !checkEmail(body.email, res)) ||
    (body.birthday && !checkBirthday(body.birthday, res))
  ) {
    return null;
  }

  body.username = body.username.toLowerCase();

  User.findOneAndUpdate(
    { phoneNumber: body.phoneNumber },
    {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      birthday: body.birthday,
      email: body.email,
      job: body.job,
      phoneNumber: body.phoneNumber,
      gender: body.gender,
    }
  )
    .then((response) => {
      res.json(
        jsonResponse(200, { message: "اطلاعات شما با موفقیت به روز شد!" })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

// get cart product of a user
const getCart = async (cartList) => {
  const cart = [];
  for (const product of cartList) {
    const cartIndex = await Cart.findOne({ _id: product });
    cart.push(cartIndex);
  }
  return cart;
};

// get addresses of a user
const getAddresses = async (addresses) => {
  const adressesList = [];
  for (const address of addresses) {
    const addressIndex = await Address.findOne({ _id: address });
    adressesList.push(addressIndex);
  }
  return adressesList;
};

const checkBirthday = (birthday, res) => {
  // const birthdaySplit = birthday.split("-");
  let isCorrect = false;

  // yesterday date
  const date = new Date();
  date.setDate(date.getDate() - 1);
  // birthday date
  const birthdayDate = new Date(birthday);

  if (
    birthdayDate &&
    birthdayDate instanceof Date &&
    !isNaN(birthdayDate) &&
    birthdayDate < date
  ) {
    isCorrect = true;
  }

  if (!isCorrect) {
    res.json(jsonResponse(406, { message: "تاریخ تولد معتبر نمی باشد!" }));
  }

  return isCorrect;
};

const checkEmail = (email, res) => {
  const isEmailCorrect = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  if (!isEmailCorrect) {
    res.json(jsonResponse(406, { message: "ایمیل معتبر نمی باشد!" }));
  }
  return isEmailCorrect;
};

const checkGender = (gender, res) => {
  if (gender === "مرد" || gender === "زن" || gender === "سایر") {
    return true;
  } else {
    res.json(
      jsonResponse(406, {
        message: "جنسیت وارد شده با مقادیر پیش فرض تطابق ندارد!",
      })
    );
  }
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
    !checkPhoneNumber(body.phoneNumber, res) ||
    !checkGender(body.gender, res)
  ) {
    return null;
  }

  if (!body.username) {
    body.username = `${body.firstName.toLowerCase()} ${body.lastName.toLowerCase()}`;
  } else {
    body.username = req.username.toLowerCase();
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

module.exports = {
  user_index,
  user_index_phone_number,
  edit_personal_info,
  registerUser,
  userSinglePhoneNumber,
};
