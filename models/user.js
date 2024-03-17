const mongoose = require("mongoose");
const argon2 = require("argon2");

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
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      defult: [],
    },
  },
  { timestamps: true }
);

// argo2 paketi ile password hash prosesi
userSchema.pre("save", async function (next) {
  if (!this.hashed_password) {
    return next();
  }

  const hash = await argon2.hash(this.hashed_password);
  this.hashed_password = hash;
  next();
});

userSchema.methods.verify = async function (password) {
  return await argon2.verify(this.hashed_password, password);
};

module.exports = mongoose.model("User", userSchema);
