const express = require('express');
const router = express.Router();
const ProductModel = require("../models/product-model")
const moment = require('moment');


router.post('/productinsert', async(req, res) => {
  try {
    const product = req.body.product;

    const existingProduct = await ProductModel.findOne({
      category: product.category,
      product_name: product.product_name,
    });

    if (existingProduct) {
      // If the product exists, update the stock and remaining_stock
      const stockValue = parseInt(product.stock, 10);
      console.log('Existing Product Stock Value:', stockValue);
      existingProduct.stock += stockValue;
      existingProduct.remaining_stock += stockValue;
      await existingProduct.save();
      return res.status(200).json({ message: 'Product stock updated successfully.' });
    }

    // If the product doesn't exist, create a new entry
    const stockValue = parseFloat(product.stock);
    const remainingStock = !isNaN(stockValue) ? stockValue : 0;
    console.log('New Product Stock Value:', remainingStock);
    
    const addedProduct = await ProductModel.create({
      ...product,
      remaining_stock: remainingStock,
    });

    res.status(201).json({ message: 'Product created successfully', data: addedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', message: 'An error occurred while creating/updating the product.' });
  }
  
  })



  router.put('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true }
        );

        res.json({ product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', message: 'An error occurred while updating the product.' });
    }
});

router.delete('/productsdel/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the product by ID and remove it from the database
      const deletedProduct = await ProductModel.findByIdAndRemove(id);
  
      if (deletedProduct) {
        res.json({ message: 'Product deleted successfully', data: deletedProduct });
      } else {
        res.status(404).json({ error: 'Not found', message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', message: 'An error occurred while deleting the product.' });
    }
  });


  router.get('/products', async (req, res) => {
    try {
      // Retrieve all accounts from the database
      const products = await ProductModel.find();
      res.json(products); // Send the accounts as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', message: 'An error occurred while fetching accounts.' });
    }
  });



  router.get('/productsall', async (req, res) => {
    try {
      const { category } = req.query;
      
      // If a category is provided, filter products based on the category
      const query = category ? { category } : {};
      
      const products = await ProductModel.find(query);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', message: 'An error occurred while fetching products.' });
    }
  });



  router.put('/updateStock', async (req, res) => {
    try {
      const { productName, stock } = req.query;
  
      if (!productName || !stock) {
        return res.status(400).json({ error: 'Bad Request', message: 'productName and stock are required query parameters.' });
      }
  
      // Find the product by name and update the stock
      const updatedProduct = await ProductModel.findOneAndUpdate(
        { product_name: productName },
        { $set: { remaining_stock: stock } },
        { new: true }
      );
  
      if (updatedProduct) {

         // Record the sale for the current day
      const today = moment().format('YYYY-MM-DD');
      if (!updatedProduct.daily_sales) {
        updatedProduct.daily_sales = {};
      }
      if (!updatedProduct.daily_sales[today]) {
        updatedProduct.daily_sales[today] = 0;
      }
      updatedProduct.daily_sales[today] += 1;

        res.json({ message: 'Product stock updated successfully', data: updatedProduct });
      } else {
        res.status(404).json({ error: 'Not found', message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', message: 'An error occurred while updating the product stock.' });
    }
  });




  router.post('/recordSale', async (req, res) => {
    try {
      const { productName } = req.query;
      const { quantity } = req.body;
  
      if (!productName) {
        return res.status(400).json({ error: 'Bad Request', message: 'productName is a required query parameter.' });
      }
  
      // Find the product by name
      const updatedProduct = await ProductModel.findOne({ product_name: productName });
  
      if (updatedProduct) {
        // Check if there is a sale entry for the current day
        const today = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
        const existingSaleIndex = updatedProduct.daily_sales.findIndex(sale => sale.date.toISOString().split('T')[0] === today);
  
        if (existingSaleIndex !== -1) {
          // If there is an existing sale for today, update the quantity
          updatedProduct.daily_sales[existingSaleIndex].quantity += quantity;
        } else {
          // If there is no existing sale for today, push a new entry
          updatedProduct.daily_sales.push({
            date: new Date(),
            quantity: quantity,
          });
        }


    //   if (updatedProduct) {
    //     // Update the monthly total sales
    //     const thisMonth = moment().format('YYYY-MMMM');
    //   updatedProduct.monthly_sales[thisMonth] = (updatedProduct.monthly_sales[thisMonth] || 0) + 1;

    //   await updatedProduct.save();

    //     res.json({ message: 'Sale recorded successfully', data: updatedProduct });
    //   } else {
    //     res.status(404).json({ error: 'Not found', message: 'Product not found' });
    //   }
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: 'Internal server error', message: 'An error occurred while recording the sale.' });
    // }

     // Update the monthly total sales
     const thisMonth = moment().format('YYYY-MMMM');
     updatedProduct.monthly_sales[thisMonth] = (updatedProduct.monthly_sales[thisMonth] || 0) + quantity;

     await updatedProduct.save();

     res.json({ message: 'Sale recorded successfully', data: updatedProduct });
   } else {
     res.status(404).json({ error: 'Not found', message: 'Product not found' });
   }
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Internal server error', message: 'An error occurred while recording the sale.' });
 }
  });

  router.get('/salesData', async (req, res) => {
    try {
      // Retrieve all products from the database
      const products = await ProductModel.find();
  
      // Calculate daily sales and monthly sales
      const dailySales = {};
      const monthlySales = {};
  
      products.forEach((product) => {
        // Calculate daily sales
        Object.entries(product.daily_sales).forEach(([date, quantity]) => {
          const formattedDate = moment(date).format('YYYY-MM-DD');
          dailySales[formattedDate] = (dailySales[formattedDate] || 0) + quantity;
        });
  
        // Calculate monthly sales
        Object.entries(product.monthly_sales).forEach(([month, quantity]) => {
          monthlySales[month] = (monthlySales[month] || 0) + quantity;
        });
      });
  
      res.json({ dailySales, monthlySales });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', message: 'An error occurred while fetching sales data.' });
    }
  });


module.exports = router;