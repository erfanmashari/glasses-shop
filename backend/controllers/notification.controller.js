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

  if (!checkDataExist(body, ["user", "title"], res)) {
    return null;
  }

  const checkUserStatus = await checkUser(body.user, res);
  if (!checkUserStatus) {
    return null;
  }

  Notification.create(body)
    .then((result) => {
      User.findOne({ _id: body.user }, (err, user) => {
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

// seen the notification
const seen_notification = async (req, res) => {
  checkAuthorization(req.headers.authorization);

  const body = req.body;

  if (!checkDataExist(body, ["id"], res)) {
    return null;
  }

  Notification.findOne({ _id: body.id }, (err, notification) => {
    if (notification) {
      // The below two lines will set seen field to true
      notification.seen = true;
      notification.save();
      res.json(
        jsonResponse(200, { message: "پیغام موردنظر به عنوان دیده شده ست شد!" })
      );
    }
  });
};

// delete notification
const delete_notification = (req, res) => {
  checkAuthorization(req.headers.authorization);
  
  const body = req.body;

  if (!checkDataExist(body, ["id", "user"], res)) {
    return null;
  }

  User.findOne({ _id: body.user }, (err, user) => {
    if (user) {
      // The below two lines will set the newly notifications
      // to the the User's notifications array field
      user.notifications = user.notifications.filter(item => item.valueOf() !== body.id);
      user.save();

      Notification.findByIdAndDelete(body.id)
        .then((result) => {
          res.json(jsonResponse(200, { message: "پیغام موردنظر حذف شد!" }));
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
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

module.exports = { add_notification, seen_notification, delete_notification };
