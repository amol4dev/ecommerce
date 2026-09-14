const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;
