const CategoryBanner = require('../models/CategoryBanner');
const cloudinary = require('../config/cloudinary');

// Get all category banners
const getCategoryBanners = async (req, res) => {
  try {
    const banners = await CategoryBanner.find({});
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific category banner by category name
const getCategoryBannerByName = async (req, res) => {
  try {
    // Decoding just in case the name contains spaces or special characters
    const categoryName = decodeURIComponent(req.params.categoryName);
    const banner = await CategoryBanner.findOne({ categoryName });
    if (banner) {
      res.json(banner);
    } else {
      res.status(404).json({ message: 'Banner not found for this category' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upsert (Create or Update) a category banner
const upsertCategoryBanner = async (req, res) => {
  try {
    const { categoryName } = req.body;
    
    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    if (!req.files || !req.files['desktopImage'] || !req.files['mobileImage']) {
      return res.status(400).json({ message: 'Both desktop and mobile images are required' });
    }

    const desktopResult = await cloudinary.uploader.upload(req.files['desktopImage'][0].path);
    const mobileResult = await cloudinary.uploader.upload(req.files['mobileImage'][0].path);

    // Find if exists, update it, else create new
    let banner = await CategoryBanner.findOne({ categoryName });
    
    if (banner) {
      banner.desktopImage = desktopResult.secure_url;
      banner.mobileImage = mobileResult.secure_url;
    } else {
      banner = new CategoryBanner({
        categoryName,
        desktopImage: desktopResult.secure_url,
        mobileImage: mobileResult.secure_url,
      });
    }

    const savedBanner = await banner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category banner
const deleteCategoryBanner = async (req, res) => {
  try {
    const categoryName = decodeURIComponent(req.params.categoryName);
    const banner = await CategoryBanner.findOne({ categoryName });
    
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    
    await banner.deleteOne();
    res.json({ message: 'Category banner removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategoryBanners, getCategoryBannerByName, upsertCategoryBanner, deleteCategoryBanner };
