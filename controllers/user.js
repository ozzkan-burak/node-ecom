const User = require("../models/user");

exports.signup = async (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  // user.save((err, user) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error,
  //     });
  //   }
  //   res.json({
  //     user,
  //   });
  // });

  try {
    await user.save();
    console.log("User created successful");
    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
