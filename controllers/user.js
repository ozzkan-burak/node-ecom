const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
  const user = new User(req.body);

  let error = "";
  try {
    await user.save();

    console.log(user);

    const withOutPassword = {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    };

    res.json({
      withOutPassword,
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
