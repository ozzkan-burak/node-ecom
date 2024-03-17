const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function preSave(next) {
  if (this.isNew) {
    try {
      console.log("PASSWORD CONVERTING INTO HASH");
      this.password = await bcrypt.hash(this.password, 10);
      return next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = mongoose.model("User", userSchema);
