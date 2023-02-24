const Transaction = require("../models/transaction.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");

const add_transaction = () => {
  res.json(
    jsonResponse(201, {
      message: "تراکنش جدید با موفقیت افزوده شد!"
    })
  );
};

module.exports = { add_transaction };
