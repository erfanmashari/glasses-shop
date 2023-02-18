const User = require("../models/user.model");

const set_password = (req, res) => {
    jsonResponse(200, { message: "رمز عبور با موفقیت تعیین شد!" })
}

module.exports = { set_password }