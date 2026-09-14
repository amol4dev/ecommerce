import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" width="30" height="30">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h1 style={styles.title}>Admin Portal</h1>
          <p style={styles.subtitle}>Secure access for administrators only</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={styles.errorBanner}>
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Admin Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={e => e.target.style.borderColor = '#C8793A'}
              onBlur={e => e.target.style.borderColor = '#d9b896'}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={e => e.target.style.borderColor = '#C8793A'}
              onBlur={e => e.target.style.borderColor = '#d9b896'}
            />
          </div>

          <button type="submit" disabled={loading} style={loading ? {...styles.btn, ...styles.btnDisabled} : styles.btn}>
            {loading ? 'Authenticating...' : 'Login as Admin'}
          </button>
        </form>

        <p style={styles.footer}>
          Not an admin? <Link to="/login" style={styles.link}>User Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fdf6ef 0%, #f5e6d3 100%)',
    padding: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 8px 40px rgba(180, 100, 40, 0.12)',
    border: '1px solid #f0dcc8',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  iconWrap: {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #C8793A, #a85e28)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    boxShadow: '0 4px 16px rgba(200, 121, 58, 0.3)',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#5a2d0c',
    margin: '0 0 6px',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#9a6a44',
    margin: 0,
  },
  errorBanner: {
    background: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#c0392b',
    fontSize: '0.9rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#7a3d10',
    letterSpacing: '0.02em',
  },
  input: {
    padding: '12px 16px',
    border: '1.5px solid #d9b896',
    borderRadius: '10px',
    fontSize: '14.5px',
    color: '#3d1f0a',
    outline: 'none',
    background: '#fffaf5',
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit',
  },
  btn: {
    padding: '13px',
    background: 'linear-gradient(135deg, #C8793A, #a85e28)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
    boxShadow: '0 4px 14px rgba(200, 121, 58, 0.3)',
    fontFamily: 'inherit',
    transition: 'opacity 0.2s ease',
  },
  btnDisabled: {
    opacity: 0.65,
    cursor: 'not-allowed',
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '0.9rem',
    color: '#9a6a44',
  },
  link: {
    color: '#C8793A',
    fontWeight: '600',
    textDecoration: 'none',
  },
};

export default AdminLogin;
