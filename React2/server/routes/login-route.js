const express = require('express')
const route = express.Router();
const cors = require("cors")
const AccountModel = require('../models/Account-model')
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(cors());
const jwt = require('jsonwebtoken');

const {Success, IncorrectPass, NoRecord} = require("../controllers/login-controller");

route.post("/login", async (req, res) => {
  const { emailadd, password } = req.body;


  AccountModel.findOne({ emailadd: emailadd })
    .then(user => {
      if (user) {
        if (user.password === password) {
          // Include the user's role in the response
          //res.json("Success")
          const token = jwt.sign({ _id: user._id }, 'msC0Gac0Po', { expiresIn: '1d' });

         res.json({ status: "Success", role: user.role, user: user , token: token});
         console.log("Usertoken:" +token)
        } else {
          // res.json("The password is incorrect");
          res.json({ status: "IncorrectPassword" });
        }
      } else {
        res.json({ status: "NoRecordExists" });
      }
    });
});

module.exports = route;