const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, maxlength: 30 },
    activeSession: { type: Boolean },
    shopping_cart: [
      {
        _id: Schema.Types.ObjectId,
        name: { type: String, maxlength: 30 },
        price: { type: Number, min: 0 },
        qty: { type: Number, min: 0 },
      },
    ],
  },
  { timestamps: true } // add a timestamp to each document
);

// create Model from Schema (singular)
const User = mongoose.model('User', userSchema);

// export the Model
module.exports = User;
