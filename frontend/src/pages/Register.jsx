import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const Register = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [tempToken, setTempToken] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, userOtp: otp })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration Successful!');
        login(data);
        navigate('/');
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
          <h2>Register</h2>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn">Continue</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="auth-form">
          <h2>Verify OTP</h2>
          <p>An OTP has been sent to {email}</p>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit" className="btn">Verify and Register</button>
          <p><button type="button" className="btn-link" onClick={() => setStep(1)} style={{background: 'none', border: 'none', color: '#C8793A', cursor: 'pointer', fontWeight: '600', fontSize: '15px', fontFamily: 'inherit'}}>Back to Details</button></p>
        </form>
      )}
    </div>
  );
};

export default Register;
