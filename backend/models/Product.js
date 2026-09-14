const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  // Admin-configurable card display fields
  tagline1: { type: String, default: '' },
  tagline2: { type: String, default: '' },
  adminRating: { type: Number, default: 0, min: 0, max: 5 },
  adminReviewCount: { type: Number, default: 0 },
  badgeText: { type: String, default: '' },
  discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
  adminReviews: [
    {
      name: { type: String, default: 'Expert Review' },
      rating: { type: Number, default: 5 },
      comment: { type: String, required: true }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
