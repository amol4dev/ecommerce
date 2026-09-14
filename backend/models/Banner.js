const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  tagline: { type: String, default: '' },
  btnText: { type: String, default: '' },
  btnLink: { type: String, default: '' },
  mobileImage: { type: String, required: true },
  desktopImage: { type: String, required: true },
  order: { type: Number, default: 0 },
  isAdBanner: { type: Boolean, default: false }, // Pure image ad — no text overlay, always priority 1
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
