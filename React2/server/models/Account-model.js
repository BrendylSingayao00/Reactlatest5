const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: Number,
    emailadd: String,
    password: String,
    verifypass: String,
    Fname: String,
    Mname: String,
    Lname: String,
    gender: String,
    role: String,
    status: {
      type: String,
      enum: ['active', 'archived'], // Add other possible statuses if needed
      default: 'active',
    }
  });

  const AccountModel = mongoose.model("accounts", userSchema)
module.exports = AccountModel