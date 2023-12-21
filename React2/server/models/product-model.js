const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    _id: Number,
    category: String,
    product_name: String,
    price: Number,
    stock: Number,
    amount: Number,
    remaining_stock: Number,
    daily_sales: { type: Array, default: [] }, // Object to store daily sales
  monthly_sales: { type: Object, default: {} },
  });

  const ProductModel = mongoose.model("products", ProductSchema)
module.exports = ProductModel