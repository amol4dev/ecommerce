import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', { headers: { Authorization: `Bearer ${user.token}` } });
        const data = await res.json();
        if (res.ok) setStats(data);
        else {
          setError(res.status === 401 ? 'Session expired. Please log in again.' : data.message || 'Failed to load stats.');
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      } catch (e) { console.error(e); }
    };
    fetchStats();
  }, [user, navigate]);

  const statCards = [
    { label: 'Total Orders', value: stats?.totalOrders, icon: '📦', color: '#C8793A' },
    { label: 'Total Products', value: stats?.totalProducts, icon: '🛍️', color: '#a85e28' },
    { label: 'Total Users', value: stats?.totalUsers, icon: '👥', color: '#7a3d10' },
    { label: 'Total Revenue', value: stats ? `₹${stats.totalRevenue.toFixed(2)}` : null, icon: '💰', color: '#5a2d0c' },
  ];

  const navButtons = [
    { label: '🖼️ Home Page Banners', path: '/admin/banners', primary: true },
    { label: '🏷️ Category Banners', path: '/admin/category-banners', primary: true },
    { label: '+ Add Product', path: '/admin/add-product' },
    { label: '📦 Manage Products', path: '/admin/products' },
    { label: '🚚 Manage Orders', path: '/admin/orders' },
    { label: '👥 User Directory', path: '/admin/users' },
  ];

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <h1 style={S.pageTitle}>Admin Dashboard</h1>
          <p style={S.pageSubtitle}>Welcome back, <strong style={{ color: '#C8793A' }}>{user?.name}</strong></p>
        </div>
        <img src="/triveni.png" alt="Logo" style={S.logo} />
      </div>

      {error && (
        <div style={S.errorBanner}>
          ⚠️ {error}
          {error.includes('expired') && (
            <button onClick={() => navigate('/admin-login')} style={S.reLoginBtn}>Re-Login</button>
          )}
        </div>
      )}

      {stats ? (
        <div style={S.statsGrid}>
          {statCards.map(card => (
            <div key={card.label} style={S.statCard}>
              <div style={S.statIcon}>{card.icon}</div>
              <div style={{ ...S.statNumber, color: card.color }}>{card.value ?? '—'}</div>
              <div style={S.statLabel}>{card.label}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={S.loading}>Loading metrics...</div>
      )}

      <div style={S.controlsBox}>
        <h3 style={S.controlsTitle}>Administrative Controls</h3>
        <div style={S.controlsRow}>
          {navButtons.map(btn => (
            <button key={btn.path} onClick={() => navigate(btn.path)}
              style={btn.primary ? { ...S.btn, ...S.btnPrimary } : S.btn}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const S = {
  page: { padding: '30px 40px', maxWidth: '1100px', margin: '0 auto', background: 'linear-gradient(135deg, #fdf6ef 0%, #f5e6d3 100%)', minHeight: '90vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  pageTitle: { fontSize: '2rem', fontWeight: '700', color: '#5a2d0c', margin: '0 0 4px' },
  pageSubtitle: { color: '#9a6a44', margin: 0, fontSize: '1rem' },
  logo: { height: '52px', width: '52px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 14px rgba(200,121,58,0.2)' },
  errorBanner: { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '12px 20px', color: '#c0392b', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  reLoginBtn: { background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' },
  statCard: { background: '#fff', border: '1.5px solid #f0dcc8', borderRadius: '16px', padding: '28px 24px', textAlign: 'center', boxShadow: '0 4px 16px rgba(180,100,40,0.07)' },
  statIcon: { fontSize: '2rem', marginBottom: '10px' },
  statNumber: { fontSize: '2.2rem', fontWeight: '700', marginBottom: '4px' },
  statLabel: { fontSize: '0.85rem', color: '#9a6a44', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' },
  loading: { textAlign: 'center', padding: '60px', color: '#C8793A', fontSize: '1.1rem' },
  controlsBox: { background: '#fff', border: '1.5px solid #f0dcc8', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px rgba(180,100,40,0.07)' },
  controlsTitle: { color: '#7a3d10', marginBottom: '20px', fontSize: '1.1rem', fontWeight: '600' },
  controlsRow: { display: 'flex', gap: '14px', flexWrap: 'wrap' },
  btn: { padding: '11px 20px', background: '#f5e6d3', color: '#7a3d10', border: '1.5px solid #e8d0b0', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', fontFamily: 'inherit' },
  btnPrimary: { background: 'linear-gradient(135deg, #C8793A, #a85e28)', color: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(200,121,58,0.3)' },
};

export default AdminDashboard;
