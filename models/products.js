const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const productSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 30 },
    description: { type: String },
    img: { type: String },
    price: { type: Number, min: 0 },
    qty: { type: Number, min: 0 },
  },
  { timestamps: true } // add a timestamp to each document
);

// create Model from Schema (singular)
const Product = mongoose.model('Product', productSchema);

// export the Model
module.exports = Product;
