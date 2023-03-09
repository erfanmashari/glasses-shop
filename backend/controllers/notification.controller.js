const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const {
  jsonResponse,
  checkDataExist,
  checkAuthorization,
} = require("../functions");

const add_notification = async (req, res) => {
  checkAuthorization(req.headers.authorization);

  const body = req.body;

  if (!checkDataExist(body, ["userId", "title"], res)) {
    return null;
  }

  const checkUserStatus = await checkUser(body.userId, res);
  if (!checkUserStatus) {
    return null;
  }

  Notification.create(body)
    .then((result) => {
      User.findOne({ _id: body.userId }, (err, user) => {
        if (user) {
          // The below two lines will add the newly saved notification's
          // ObjectID to the the User's notifications array field
          user.notifications.push(result._id);
          user.save();
          res.json(
            jsonResponse(200, { message: "پیغام جدید با موفقیت افزوده شد!" })
          );
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// check if user is real or not
const checkUser = async (userId, res) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.json(jsonResponse(406, { message: "کاربر مورد نظر معتبر نمی باشد!" }));
  }

  return user ? true : false;
};

module.exports = { add_notification };
