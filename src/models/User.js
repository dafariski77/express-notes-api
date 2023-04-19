const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
});

userSchema.methods.comparePassword = async function (reqPassword) {
  const isMatch = await bcrypt.compare(reqPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Users", userSchema);
