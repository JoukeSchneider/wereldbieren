const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    country: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Lager', 'IPA', 'Stout', 'Wheat', 'Porter', 'Pilsner', 'Other'],
      default: 'Other',
    },
    abv: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x400?text=Beer',
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [{
      user: String,
      comment: String,
      rating: Number,
      createdAt: { type: Date, default: Date.now },
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
