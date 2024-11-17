const express = require('express');
const router = express.Router();
const reviewService = require('../services/reviewServices');


// POST a new review
router.post('/Addreview', async (req, res) => {
  try {
    const newReview = await reviewService.createReview(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// GET all reviews
router.get('/ViewAllreviews', async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific review by ID
router.get('/Viewreview/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// PUT/update a review
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await reviewService.updateReviewById(id, req.body);
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a review
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await reviewService.deleteReviewById(id);
    res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
