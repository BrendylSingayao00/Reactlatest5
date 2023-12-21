const express = require('express');
const router = express.Router();
const AccountModel = require('../../server/models/Account-model') // Make sure to adjust the path based on your project structure
const ArchivedAccountModel = require("../models/Archived_account_models")
// Endpoint to check if a user with a given email exists in the database
const bcrypt = require('bcrypt');


router.post('/checkUser', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if a user with the provided email exists
    const user = await AccountModel.findOne({ emailadd: email });

    if (user) {
      // User exists in the database
      res.json({ exists: true,  role: user.role, user: user });
    } else {
      // User does not exist in the database
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking user in the database:', error);
    res.status(500).json({ error: 'Internal server error', message: 'An error occurred while checking the user.' });
  }
});

router.get('/accounts', async (req, res) => {
    try {
      // Retrieve all accounts from the database
      const accounts = await AccountModel.find();
      res.json(accounts); // Send the accounts as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', message: 'An error occurred while fetching accounts.' });
    }
  });

  router.get('/archived-accounts', async (req, res) => {
    try {
      // Retrieve all accounts from the database
      const archivedaccounts = await ArchivedAccountModel.find();
      res.json(archivedaccounts); // Send the accounts as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', message: 'An error occurred while fetching accounts.' });
    }
  });


   // Express route to archive an account
router.post('/archive-account/:accountId', async (req, res) => {

    try {
      const accountId = req.params.accountId;
      // Find the account document
      const account = await AccountModel.findById(accountId);
  
      const accountFieldsToCopy = ['emailadd', 'password', 'verifypass', 'Fname', 'Mname', 'Lname', 'gender', 'role'];
      // Move the account to the archived collection
      const archivedAccount = new ArchivedAccountModel({
        _id: accountId, // Set _id to originalAccountId assuming it's unique
        originalAccountId: accountId,
        // Copy other relevant fields from the original account
        status: 'archived'
       
      });
       // Copy other relevant fields from the original account
      accountFieldsToCopy.forEach(field => {
    archivedAccount[field] = account[field];
  })
      await archivedAccount.save();
  
      // Remove the original account from the active collection
      await AccountModel.findByIdAndDelete(accountId);
  
      res.status(200).json({ message: 'Account archived successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  //Express route to active an account
  router.post('/active-account/:accountId', async (req, res) => {
  
    try {
      const accountId = req.params.accountId;
      // Find the account document
      const account = await ArchivedAccountModel.findById(accountId);
  
      const accountFieldsToCopy = ['emailadd', 'password', 'verifypass', 'Fname', 'Mname', 'Lname', 'gender', 'role'];
      // Move the account to the active collection
      const activateAccount = new AccountModel({
        _id: accountId, // Set _id to originalAccountId assuming it's unique
        originalAccountId: accountId,
        // Copy other relevant fields from the original account
        status: 'active'
       
      });
       // Copy other relevant fields from the original account
      accountFieldsToCopy.forEach(field => {
    activateAccount[field] = account[field];
  })
      await activateAccount.save();
  
      // Remove the original account from the archive collection
      await ArchivedAccountModel.findByIdAndDelete(accountId);
  
      res.status(200).json({ message: 'Account archived successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.post('/register', async(req, res) => {
    const employee = req.body.employee

    console.log(employee)

    try {
      const existingEmployee = await AccountModel.findOne({ _id: employee._id });

      if(existingEmployee){
      return res.status(400).json({ error: 'Duplicate key error', message: 'An employee with the same _id already exists.' });
      }

      const hashedPassword = await bcrypt.hash(employee.password, 10);
        employee.password = hashedPassword;
      
      const addedEmployee = await AccountModel.create(employee);
      res.status(201).json({ message: 'Employee created successfully', data: addedEmployee });
    } catch (error) {
      console.error('Error creating employee:', error);
       res.status(500).json({ error: 'Internal server error', message: 'An error occurred while creating the employee.' });
    }
   
  });

module.exports = router;