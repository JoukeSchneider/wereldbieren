const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    // Bilingual fields (nested)
    title: {
      nl: { type: String, required: true },
      en: { type: String, required: true },
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    content: {
      nl: {
        type: String,
        required: true,
        minlength: [100, 'Content must be at least 100 characters'],
      },
      en: {
        type: String,
        required: true,
        minlength: [100, 'Content must be at least 100 characters'],
      },
    },

    excerpt: {
      nl: { type: String, maxlength: 500 },
      en: { type: String, maxlength: 500 },
    },

    // Metadata
    author: {
      type: String,
      default: 'Admin',
    },

    // Relations
    relatedBeerIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],

    // Publishing
    isPublished: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    // SEO
    keywords: [String],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for faster queries
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ publishedAt: -1 });
blogPostSchema.index({ featured: 1, publishedAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
