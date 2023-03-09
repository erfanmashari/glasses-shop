const User = require("../models/user.model");
const Address = require("../models/address.model");
const { jsonResponse, checkDataExist } = require("../functions");

// create new addrss for user
const add_address = async (req, res) => {
  const body = req.body;

  const checkReceiverStatus = body.isMeReceiver
    ? await checkReceiver(body.receiverSpecifications, res)
    : false;

  if (
    !checkDataExist(
      body,
      ["user", "province", "city", "plaque", "postalAddress", "postalCode"],
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

  const previousAddress = await Address.findOne(body);

  if (!previousAddress) {
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
  } else {
    res.json(jsonResponse(406, { message: "این آدرس وجود دارد!" }));
  }
};

// update address informations
const address_update = async (req, res) => {
  const body = req.body;

  const checkReceiverStatus = body.isMeReceiver
    ? await checkReceiver(body.receiverSpecifications, res)
    : false;

  if (
    !checkDataExist(
      body,
      [
        "_id",
        "user",
        "province",
        "city",
        "plaque",
        "postalAddress",
        "postalCode",
      ],
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

  const previousAddress = await Address.findById(body._id);

  if (previousAddress) {
    // console.log("first")
    Address.findByIdAndUpdate(body._id, body)
      .then((result) => {
        res.json(
          jsonResponse(200, { message: "اطلاعات آدرس با موفقیت ویرایش شد!" })
        );
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    res.json(jsonResponse(406, { message: "این آدرس وجود ندارد!" }));
  }
};

// delete address
const address_delete = (req, res) => {
  const body = req.body;

  if (!checkDataExist(body, ["_id"], res)) {
    return null;
  }

  Address.findByIdAndDelete(body._id)
    .then((result) => {
      res.json(
        jsonResponse(200, { message: "آدرس موردنظر حذف شد!" })
      );
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

module.exports = { add_address, address_update, address_delete };
