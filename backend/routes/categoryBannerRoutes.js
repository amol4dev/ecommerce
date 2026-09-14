const express = require('express');
const { getCategoryBanners, getCategoryBannerByName, upsertCategoryBanner, deleteCategoryBanner } = require('../controllers/categoryBannerController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const multer = require('multer');

// Configure multer for handling multiple files
const upload = multer({ dest: 'uploads/' });
const cpUpload = upload.fields([{ name: 'desktopImage', maxCount: 1 }, { name: 'mobileImage', maxCount: 1 }]);

const router = express.Router();

router.route('/')
  .get(getCategoryBanners)
  .post(protect, admin, cpUpload, upsertCategoryBanner);

router.route('/:categoryName')
  .get(getCategoryBannerByName)
  .delete(protect, admin, deleteCategoryBanner);

module.exports = router;
