const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
  const user = new User(req.body);

  let error = "";
  try {
    await user.save();
    res.json({
      user,
    });
  } catch (err) {
    error = errorHandler(err);
    res.json({
      error,
    });
    console.log(error);
  }
  return error;
};
