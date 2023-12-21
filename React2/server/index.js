const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const POSModel = require('./models/Account-model-for-login')
const AccountModel = require('./models/Account-model')
const ProductModel = require('./models/product-model')
const ArchivedAccountModel = require("./models/Archived_account_models")
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(cors());

// const LoginRoutes = require("./routes/login-route");

const dbUrl = "mongodb+srv://tawoplays11:1109200213G@clusterpos.hftfpg5.mongodb.net/POS-DBS";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


mongoose.connect(dbUrl, connectionParams).then(() =>
 {console.info("Connected to the DB");
}).catch((e) => {
    console.log("Error;", e);
});

// app.use('/login', LoginRoutes);


app.use('/', require('../server/routes/Account-routes'));

app.use('/', require("../server/routes/login-route"))

app.use('/', require("../server/routes/Product-routes"))

app.use('/' , require("../server/routes/Authenticate_routes"))

app.use('/' , require("../server/routes/print-routes"))


//   app.post("/login", async (req, res) => {
//     const { emailadd, password } = req.body;
//     try {
//         const user = await AccountModel.findOne({ emailadd: emailadd });

//         if (user) {
//             const passwordMatch = await bcrypt.compare(password, user.password);

//             if (passwordMatch) {
//                 res.json({ status: "Success", role: user.role, user: user });
//             } else {
//                 res.json({ status: "IncorrectPassword" });
//             }
//         } else {
//             res.json({ status: "NoRecordExists" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error', message: 'An error occurred during login.' });
//     }
// });


  // app.post('/register', async(req, res) => {
  //   const employee = req.body.employee


  //   try {
  //     const existingEmployee = await AccountModel.findOne({ _id: employee._id });

  //     if(existingEmployee){
  //     return res.status(400).json({ error: 'Duplicate key error', message: 'An employee with the same _id already exists.' });
  //     }

  //     const hashedPassword = await bcrypt.hash(employee.password, 10);
  //       employee.password = hashedPassword;
      
  //     const addedEmployee = await AccountModel.create(employee);
  //     res.status(201).json({ message: 'Employee created successfully', data: addedEmployee });
  //   } catch (error) {
  //      res.status(500).json({ error: 'Internal server error', message: 'An error occurred while creating the employee.' });
  //   }
   
  // });


  // app.post('/productinsert', async(req, res) => {
  //   const product = req.body.product

  //   // const addedProduct = await ProductModel.create(product);
  //   // try {
  //   //   const existingProduct = await ProductModel.findOne({ _id: product._id });

  //   //   if(existingProduct){
  //   //   return res.status(400).json({ error: 'Duplicate key error', message: 'A product with the same _id already exists.' });
  //   //   }
      
  //   //   const addedProduct = await ProductModel.create(product);
  //   //   res.status(201).json({ message: 'Employee created successfully', data: addedProduct });
  //   // } catch (error) {
  //   //    res.status(500).json({ error: 'Internal server error', message: 'An error occurred while creating the employee.' });
  //   // }

  //   try {
  //     const addedProduct = await ProductModel.create(product);
  //     res.status(201).json({ message: 'Product created successfully', data: addedProduct });
  // } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error', message: 'An error occurred while creating the product.' });
  // }
  // })

//   app.put('/products/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const updatedProduct = await ProductModel.findOneAndUpdate(
//             { _id: id },
//             { $set: req.body },
//             { new: true }
//         );

//         res.json({ product: updatedProduct });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error', message: 'An error occurred while updating the product.' });
//     }
// });


// app.delete('/productsdel/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Find the product by ID and remove it from the database
//     const deletedProduct = await ProductModel.findByIdAndRemove(id);

//     if (deletedProduct) {
//       res.json({ message: 'Product deleted successfully', data: deletedProduct });
//     } else {
//       res.status(404).json({ error: 'Not found', message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error', message: 'An error occurred while deleting the product.' });
//   }
// });



  // app.get('/archived-accounts', async (req, res) => {
  //   try {
  //     // Retrieve all accounts from the database
  //     const archivedaccounts = await ArchivedAccountModel.find();
  //     res.json(archivedaccounts); // Send the accounts as a JSON response
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error', message: 'An error occurred while fetching accounts.' });
  //   }
  // });



  // Express route to archive an account
// app.post('/archive-account/:accountId', async (req, res) => {

//   try {
//     const accountId = req.params.accountId;
//     // Find the account document
//     const account = await AccountModel.findById(accountId);

//     const accountFieldsToCopy = ['emailadd', 'password', 'verifypass', 'Fname', 'Mname', 'Lname', 'gender', 'role'];
//     // Move the account to the archived collection
//     const archivedAccount = new ArchivedAccountModel({
//       _id: accountId, // Set _id to originalAccountId assuming it's unique
//       originalAccountId: accountId,
//       // Copy other relevant fields from the original account
//       status: 'archived'
     
//     });
//      // Copy other relevant fields from the original account
//     accountFieldsToCopy.forEach(field => {
//   archivedAccount[field] = account[field];
// })
//     await archivedAccount.save();

//     // Remove the original account from the active collection
//     await AccountModel.findByIdAndDelete(accountId);

//     res.status(200).json({ message: 'Account archived successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


//Express route to active an account
// app.post('/active-account/:accountId', async (req, res) => {

//   try {
//     const accountId = req.params.accountId;
//     // Find the account document
//     const account = await ArchivedAccountModel.findById(accountId);

//     const accountFieldsToCopy = ['emailadd', 'password', 'verifypass', 'Fname', 'Mname', 'Lname', 'gender', 'role'];
//     // Move the account to the active collection
//     const activateAccount = new AccountModel({
//       _id: accountId, // Set _id to originalAccountId assuming it's unique
//       originalAccountId: accountId,
//       // Copy other relevant fields from the original account
//       status: 'active'
     
//     });
//      // Copy other relevant fields from the original account
//     accountFieldsToCopy.forEach(field => {
//   activateAccount[field] = account[field];
// })
//     await activateAccount.save();

//     // Remove the original account from the archive collection
//     await ArchivedAccountModel.findByIdAndDelete(accountId);

//     res.status(200).json({ message: 'Account archived successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


  // app.get('/products', async (req, res) => {
  //   try {
  //     // Retrieve all accounts from the database
  //     const products = await ProductModel.find();
  //     res.json(products); // Send the accounts as a JSON response
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error', message: 'An error occurred while fetching accounts.' });
  //   }
  // });

  // app.get('/productsall', async (req, res) => {
  //   try {
  //     const { category } = req.query;
      
  //     // If a category is provided, filter products based on the category
  //     const query = category ? { category } : {};
      
  //     const products = await ProductModel.find(query);
  //     res.json(products);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error', message: 'An error occurred while fetching products.' });
  //   }
  // });


app.listen(3001, () => {
console.log('server is running')
})
