import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [tempToken, setTempToken] = useState('');
  
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setTempToken(data.tempToken);
        setStep(2);
        alert('OTP sent successfully! Please check your email.');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, userOtp: otp, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Password has been reset successfully!');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="auth-form">
          <h2>Forgot Password</h2>
          <p style={{marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem', color: '#9a6a44'}}>Enter your email address to receive a password reset OTP.</p>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit" className="btn">Send OTP</button>
          <p><Link to="/login">Back to Login</Link></p>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="auth-form">
          <h2>Reset Password</h2>
          <p style={{marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem', color: '#9a6a44'}}>An OTP has been sent to <strong style={{color: '#7a3d10'}}>{email}</strong></p>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit" className="btn">Reset Password</button>
          <p><button type="button" className="btn-link" onClick={() => setStep(1)} style={{background: 'none', border: 'none', color: '#C8793A', cursor: 'pointer', fontWeight: '600', fontSize: '15px', fontFamily: 'inherit'}}>Change Email</button></p>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
