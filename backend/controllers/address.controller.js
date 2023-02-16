const User = require("../models/user.model");
const Address = require("../models/address.model");
const { jsonResponse, checkDataExist } = require("../functions");

// get all addresses
const address_index = async (req, res) => {
  await Address.find()
    .sort({ createdAt: -1 })
    .then((addresses) => {
      res.json(jsonResponse(200, { addresses }));
    })
    .catch((err) => {
      console.log(err);
    });
};

// create new addrss for user
const add_address = async (req, res) => {
  const body = req.body;

  const checkReceiverStatus = body.isMeReceiver ? await checkReceiver(
    body.receiverSpecifications,
    res
  ) : false;
  if (
    !checkDataExist(
      body,
      ["userId", "province", "city", "plaque", "postalAddress", "postalCode"],
      res
    ) ||
    !checkDataExist(
      body.receiverSpecifications,
      ["firstName", "phoneNumber", "lastName"],
      res
    ) ||
    !checkPhoneNumber(body.receiverSpecifications.phoneNumber, res) ||
    checkReceiverStatus
  ) {
    return null;
  }

  Address.create(body)
    .then((result) => {
      User.findOne({ _id: body.userId }, (err, user) => {
        if (user) {
          // The below two lines will add the newly saved address's
          // ObjectID to the the User's addresses array field
          user.addresses.push(result._id);
          user.save();
          res.json(
            jsonResponse(200, { message: "آدرس جدید با موفقیت افزوده شد!" })
          );
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// check if the receiver is user himeself and he is exist or not
const checkReceiver = async (receiverSpecifications, res) => {
  const receiverUser = await User.findOne(receiverSpecifications);

  if (!receiverUser) {
    res.json(jsonResponse(406, { message: "گیرنده محصول معتبر نیست!" }));
  }

  return receiverUser ? true : false;
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

module.exports = { address_index, add_address };
