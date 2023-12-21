const mongoose = require('mongoose');

const archivedAccountSchema = new mongoose.Schema({
    _id: Number,
    originalAccountId: Number,
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
    enum: ['archived'],
    default: 'archived',
  },
});

const ArchivedAccountModel = mongoose.model('archivedAccounts', archivedAccountSchema);

module.exports = ArchivedAccountModel;