const express = require('express');
const { sendRegistrationOtp, verifyRegistrationOtp, loginUser, getUsers, loginAdmin, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/send-otp', sendRegistrationOtp);
router.post('/verify-otp', verifyRegistrationOtp);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/users', protect, admin, getUsers);

module.exports = router;
