const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const protect = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
          const { beerId, page = 1, limit = 10 } = req.query;
          const skip = (page - 1) * limit;
          const query = { isApproved: true };
          if (beerId) query.beerId = beerId;
          const reviews = await Review.find(query)
            .populate('beerId', 'name country type')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
          const total = await Review.countDocuments(query);
          res.json({
                  success: true,
                  count: reviews.length,
                  total,
                  page: parseInt(page),
                  pages: Math.ceil(total / limit),
                  data: reviews,
                });
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
  });

router.get('/:id', async (req, res) => {
    try {
          const review = await Review.findById(req.params.id).populate('beerId', 'name');
          if (!review) {
                  return res.status(404).json({ success: false, error: 'Review not found' });
                }
          if (!review.isApproved) {
                  return res.status(404).json({ success: false, error: 'Review not available' });
                }
          res.json({ success: true, data: review });
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
  });

router.post('/', async (req, res) => {
    try {
          const { beerId, authorName, text, rating, language, captchaToken } = req.body;
          const product = await Product.findById(beerId);
          if (!product) {
                  return res.status(404).json({ success: false, error: 'Beer not found' });
                }
          const review = new Review({
                  beerId,
                  authorName,
                  text,
                  rating,
                  language: language || 'nl',
                  captchaToken,
                });
          await review.save();
          res.status(201).json({
                  success: true,
                  message: 'Review posted. Awaiting moderation.',
                  data: review,
                });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
  });

router.put('/:id', protect, async (req, res) => {
    try {
          const { isApproved, rejectionReason } = req.body;
          const review = await Review.findById(req.params.id);
          if (!review) {
                  return res.status(404).json({ success: false, error: 'Review not found' });
Add Review API routes: GET (public), POST (public), PUT/DELETE (admin protected)          review.isApproved = isApproved !== undefined ? isApproved : review.isApproved;
          if (!isApproved && rejectionReason) {
                  review.rejectionReason = rejectionReason;
                }
          if (isApproved) {
                  review.approvedAt = new Date();
                  review.approvedBy = req.user.admin || 'admin';
                }
          await review.save();
          res.json({ success: true, data: review });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
  });

router.delete('/:id', protect, async (req, res) => {
    try {
          const review = await Review.findByIdAndDelete(req.params.id);
          if (!review) {
                  return res.status(404).json({ success: false, error: 'Review not found' });
                }
          res.json({ success: true, message: 'Review deleted', data: review });
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
  });

module.exports = router;
