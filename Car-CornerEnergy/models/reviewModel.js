const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  body: String,
  rating: Number,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
