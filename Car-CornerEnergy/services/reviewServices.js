const Review = require('../models/reviewModel');
const { StatusCodes } = require("http-status-codes");
const asyncHandler = require('express-async-handler');

// Create a new review
exports.createReview = asyncHandler(async (reviewData) => {
  const { title, body, rating } = reviewData;

  if (!title || !body || !rating) {
    throw new Error('Title, body, and rating are required.');
  }

  const newReview = new Review({ title, body, rating });
  return await newReview.save();
});

// Get all reviews
exports.getAllReviews = asyncHandler(async () => {
  return await Review.find();
});

// Get review by ID
exports.getReviewById = asyncHandler(async (id) => {
  if (!id) {
    throw new Error('Review ID is required.');
  }

  return await Review.findById(id);
});

// Update a review by ID
exports.updateReviewById = asyncHandler(async (id, updatedData) => {
  if (!id) {
    throw new Error('Review ID is required.');
  }

  const updatedReview = await Review.findByIdAndUpdate(id, updatedData, { new: true });
  if (!updatedReview) {
    throw new Error(`Review not found with ID: ${id}`);
  }

  return updatedReview;
});

// Delete a review by ID
exports.deleteReviewById = asyncHandler(async (id) => {
  if (!id) {
    throw new Error('Review ID is required.');
  }

  const deletedReview = await Review.findByIdAndDelete(id);
  if (!deletedReview) {
    throw new Error(`Review not found with ID: ${id}`);
  }
});
