const Banner = require('../models/Banner');
const cloudinary = require('../config/cloudinary');

const getBanners = async (req, res) => {
  try {
    // Ad banners always come first, then regular banners sorted by order
    const banners = await Banner.find({}).sort({ isAdBanner: -1, order: 1, createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBanner = async (req, res) => {
  try {
    const { title, tagline, btnText, btnLink, isAdBanner } = req.body;
    const adBanner = isAdBanner === 'true' || isAdBanner === true;

    // Enforce one ad banner at a time
    if (adBanner) {
      const existing = await Banner.findOne({ isAdBanner: true });
      if (existing) {
        return res.status(400).json({ message: 'An ad banner already exists. Please delete or replace the existing one first.' });
      }
    } else {
      const count = await Banner.countDocuments({ isAdBanner: false });
      if (count >= 6) {
        return res.status(400).json({ message: 'Maximum limit of 6 banners reached. Please delete an existing banner first.' });
      }
    }

    if (!req.files || !req.files['desktopImage'] || !req.files['mobileImage']) {
      return res.status(400).json({ message: 'Both desktop and mobile images are required' });
    }

    const desktopResult = await cloudinary.uploader.upload(req.files['desktopImage'][0].path);
    const mobileResult = await cloudinary.uploader.upload(req.files['mobileImage'][0].path);

    const count = await Banner.countDocuments({ isAdBanner: false });
    const banner = new Banner({
      title: title || '',
      tagline: tagline || '',
      btnText: btnText || '',
      btnLink: btnLink || '',
      desktopImage: desktopResult.secure_url,
      mobileImage: mobileResult.secure_url,
      order: adBanner ? -999 : count,
      isAdBanner: adBanner,
    });

    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { title, tagline, btnText, btnLink, order } = req.body;
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    banner.title = title || banner.title;
    banner.tagline = tagline || banner.tagline;
    banner.btnText = btnText || banner.btnText;
    banner.btnLink = btnLink || banner.btnLink;
    if (order !== undefined) banner.order = order;

    if (req.files && req.files['desktopImage']) {
      const desktopResult = await cloudinary.uploader.upload(req.files['desktopImage'][0].path);
      banner.desktopImage = desktopResult.secure_url;
    }

    if (req.files && req.files['mobileImage']) {
      const mobileResult = await cloudinary.uploader.upload(req.files['mobileImage'][0].path);
      banner.mobileImage = mobileResult.secure_url;
    }

    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    
    await banner.deleteOne();
    res.json({ message: 'Banner removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBanners, createBanner, updateBanner, deleteBanner };
