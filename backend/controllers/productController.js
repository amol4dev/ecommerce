const Product = require('../models/Product');
const Review = require('../models/Review');
const cloudinary = require('../config/cloudinary');

// Helper to get true time if local machine clock is out of sync
const getTrueTimestamp = async () => {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC');
    const data = await response.json();
    return data.unixtime;
  } catch (error) {
    return Math.round(Date.now() / 1000);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const customerReviews = await Review.find({ productId: product._id }).sort({ createdAt: -1 });
      res.json({ ...product.toObject(), customerReviews });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, tagline1, tagline2, adminRating, adminReviewCount, badgeText, discountPercentage } = req.body;
    let imageUrl = '';
    if (req.file) {
      const timestamp = await getTrueTimestamp();
      const result = await cloudinary.uploader.upload(req.file.path, { timestamp });
      imageUrl = result.secure_url;
    }
    
    const product = new Product({
      name, description, price, category, stock, imageUrl,
      tagline1: tagline1 || '',
      tagline2: tagline2 || '',
      adminRating: adminRating ? parseFloat(adminRating) : 0,
      adminReviewCount: adminReviewCount ? parseInt(adminReviewCount, 10) : 0,
      badgeText: badgeText || '',
      discountPercentage: discountPercentage ? parseFloat(discountPercentage) : 0,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, tagline1, tagline2, adminRating, adminReviewCount, badgeText, discountPercentage } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.stock = stock || product.stock;

      // Fix: FormData sends strings — explicitly handle taglines (allow clearing to empty)
      if (tagline1 !== undefined) product.tagline1 = tagline1;
      if (tagline2 !== undefined) product.tagline2 = tagline2;
      if (badgeText !== undefined) product.badgeText = badgeText;
      

      // Fix: Parse numbers explicitly — FormData sends strings
      if (adminRating !== undefined) {
        product.adminRating = adminRating === '' ? 0 : parseFloat(adminRating);
      }
      if (adminReviewCount !== undefined) {
        product.adminReviewCount = adminReviewCount === '' ? 0 : parseInt(adminReviewCount, 10);
      }
      if (discountPercentage !== undefined) {
        product.discountPercentage = discountPercentage === '' ? 0 : parseFloat(discountPercentage);
      }

      if (req.file) {
        const timestamp = await getTrueTimestamp();
        const result = await cloudinary.uploader.upload(req.file.path, { timestamp });
        product.imageUrl = result.secure_url;
      }
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // Check if user already reviewed
      const alreadyReviewed = await Review.findOne({
        productId: req.params.id,
        userId: req.user._id
      });

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'You have already reviewed this product' });
      }

      const review = new Review({
        productId: product._id,
        userId: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      });

      await review.save();

      // Optionally update product average rating here if needed
      // product.ratings = newAverage;
      // product.numReviews = count;
      // await product.save();

      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview };

