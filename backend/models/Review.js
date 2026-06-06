const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
          beerId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Product',
                  required: true,
                },

          // User input (no account needed)
          authorName: {
                  type: String,
                  required: [true, 'Please provide your name'],
                  trim: true,
                  maxlength: [100, 'Name cannot exceed 100 characters'],
                },

          // Review content
          text: {
                  type: String,
                  required: [true, 'Please write a review'],
                  minlength: [10, 'Review must be at least 10 characters'],
                  maxlength: [1000, 'Review cannot exceed 1000 characters'],
                },

          // Rating (1-5 stars, REQUIRED)
          rating: {
                  type: Number,
                  required: [true, 'Please provide a star rating'],
                  min: [1, 'Rating must be at least 1'],
                  max: [5, 'Rating cannot exceed 5'],
                },

          // Language of review
          language: {
                  type: String,
                  enum: ['nl', 'en'],
                  default: 'nl',
                },

          // Anti-bot protection (CAPTCHA token from frontend)
          captchaToken: {
                  type: String,
                  required: [true, 'CAPTCHA validation required'],
                },

          // Moderation (you approve first)
          isApproved: {
                  type: Boolean,
                  default: false,
                },

          rejectionReason: {
                  type: String,
                  default: null,
                },

          // Metadata
          approvedAt: {
                  type: Date,
                  default: null,
                },

          approvedBy: {
                  type: String,
                  default: null,
                },
        },
    { timestamps: true } // createdAt, updatedAt
  );

// Index for filtering
reviewSchema.index({ beerId: 1, isApproved: 1 });
reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
