import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.connect("mongodb://localhost:27017/paytm");

const userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Account,
};
