const express = require('express');
const { getBanners, createBanner, updateBanner, deleteBanner } = require('../controllers/bannerController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Route to handle multiple files: 'desktopImage' and 'mobileImage'
const bannerUpload = upload.fields([
  { name: 'desktopImage', maxCount: 1 },
  { name: 'mobileImage', maxCount: 1 }
]);

router.route('/')
  .get(getBanners)
  .post(protect, admin, bannerUpload, createBanner);

router.route('/:id')
  .put(protect, admin, bannerUpload, updateBanner)
  .delete(protect, admin, deleteBanner);

module.exports = router;
