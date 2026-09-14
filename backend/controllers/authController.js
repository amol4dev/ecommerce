const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const sendRegistrationOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send Email
    const message = `
      <h2>Welcome to ShopNest, ${name}!</h2>
      <p>Thank you for starting your registration.</p>
      <p>Your one-time verification OTP is: <strong>${otp}</strong></p>
    `;

    await sendEmail({
      email,
      subject: 'Welcome to ShopNest - Your OTP',
      message
    });

    // Create a temporary token that expires in 10 minutes
    const tempToken = jwt.sign(
      { name, email, password: hashedPassword, otp },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );

    res.status(200).json({ tempToken, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyRegistrationOtp = async (req, res) => {
  try {
    const { tempToken, userOtp } = req.body;

    if (!tempToken || !userOtp) {
      return res.status(400).json({ message: 'Token and OTP are required' });
    }

    // Verify token
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);

    if (decoded.otp !== userOtp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Create user in DB
    const user = await User.create({
      name: decoded.name,
      email: decoded.email,
      password: decoded.password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'OTP has expired. Please register again.' });
    }
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.role === 'admin') {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        });
      } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send Email
    const message = `
      <h2>ShopNest Password Reset</h2>
      <p>We received a request to reset your password.</p>
      <p>Your one-time verification OTP is: <strong>${otp}</strong></p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: 'ShopNest - Password Reset OTP',
      message
    });

    // Create a temporary token that expires in 15 minutes
    const tempToken = jwt.sign(
      { email: user.email, otp },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.status(200).json({ tempToken, message: 'Password reset OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { tempToken, userOtp, newPassword } = req.body;

    if (!tempToken || !userOtp || !newPassword) {
      return res.status(400).json({ message: 'Token, OTP, and new password are required' });
    }

    // Verify token
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);

    if (decoded.otp !== userOtp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Find the user
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'OTP has expired. Please request a new password reset.' });
    }
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendRegistrationOtp, verifyRegistrationOtp, loginUser, getUsers, loginAdmin, forgotPassword, resetPassword };
