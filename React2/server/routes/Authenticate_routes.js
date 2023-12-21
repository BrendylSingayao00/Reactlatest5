const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AccountModel = require('../models/Account-model');

// Middleware to authenticate the user
router.use(async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Decoded Token:', jwt.decode(token));
    const secretKey = process.env.JWT_SECRET || 'msC0Gac0Po';
    const decoded = jwt.verify(token, secretKey); // Replace with your actual secret key

    const user = await AccountModel.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error(error);  // Log the error for debugging purposes
  res.status(401).send({ error: 'Authentication failed.' });
  }
});

// Endpoint to get user data
router.get('/authenticate', async (req, res) => {

  try {
    // Log the decoded token and user object for debugging
    console.log('Decoded Token:', jwt.decode(req.token));
    console.log('User Object:', req.user);

    // Assuming that the user object has the necessary data
    res.status(200).send({ user: req.user });
  } catch (error) {
    console.error('Error in /authenticate:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
  // try {
  //   // Assuming that the user object has the necessary data
  //   res.send({ user: req.user });
  // } catch (error) {
  //   res.status(500).send({ error: 'Internal Server Error' });
  // }
});

module.exports = router;