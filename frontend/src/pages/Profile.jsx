import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const containerStyle = { maxWidth: '1000px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '16px', border: '1.5px solid #f0dcc8', boxShadow: '0 4px 16px rgba(180, 100, 40, 0.08)' };
  const badgeStyle = { background: '#fdf0e6', color: '#C8793A', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', display: 'inline-block', border: '1px solid #f0dcc8' };

  if (!user) return null;

  return (
    <div style={{ background: '#FDFCF8', minHeight: '90vh', padding: '20px' }}>
      <div style={containerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1.5px solid #f0dcc8', paddingBottom: '30px', marginBottom: '30px' }}>
          <div>
            <h2 style={{ color: '#5a2d0c', fontSize: '2.2rem', marginBottom: '10px' }}>My Profile</h2>
            <p style={{ color: '#7a3d10', fontSize: '1.1rem', marginBottom: '5px' }}><strong>Name:</strong> {user.name}</p>
            <p style={{ color: '#7a3d10', fontSize: '1.1rem', marginBottom: '15px' }}><strong>Email:</strong> {user.email}</p>
            <span style={badgeStyle}>Account Type: {user.role.toUpperCase()}</span>
          </div>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#c0392b', border: '1px solid rgba(239, 68, 68, 0.25)', boxShadow: 'none' }}>Logout</button>
        </div>

        <h3 style={{ color: '#C8793A', marginBottom: '20px', fontSize: '1.5rem' }}>Order History</h3>
        {loading ? (
          <p style={{ color: '#9a6a44' }}>Fetching your orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ background: '#fffaf5', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1.5px solid #d9b896' }}>
            <p style={{ color: '#7a3d10', marginBottom: '15px' }}>You haven't placed any orders yet.</p>
            <Link to="/shop" className="btn">Start Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {orders.map(order => (
              <div key={order._id} style={{ background: '#fffaf5', padding: '20px', borderRadius: '12px', border: '1.5px solid #d9b896', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                <div>
                  <p style={{ color: '#7a3d10', fontSize: '0.9rem', marginBottom: '5px' }}>Order ID: <span style={{ color: '#3d1f0a', fontWeight: 'bold' }}>{order._id}</span></p>
                  <p style={{ color: '#7a3d10', fontSize: '0.9rem', marginBottom: '5px' }}>Placed On: <span style={{ color: '#3d1f0a', fontWeight: 'bold' }}>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                  <p style={{ color: '#7a3d10', fontSize: '0.9rem' }}>Total: <strong style={{ color: '#C8793A' }}>₹{order.totalAmount.toFixed(2)}</strong></p>
                </div>
                <div>
                  <span style={{ 
                    background: order.status === 'Delivered' ? 'rgba(16,185,129,0.1)' : order.status === 'Shipped' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)', 
                    color: order.status === 'Delivered' ? '#059669' : order.status === 'Shipped' ? '#2563eb' : '#d97706',
                    padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' 
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
