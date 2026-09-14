const mongoose = require('mongoose');

const categoryBannerSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  desktopImage: {
    type: String,
    required: true,
  },
  mobileImage: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('CategoryBanner', categoryBannerSchema);
