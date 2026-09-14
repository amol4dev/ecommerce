import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders', { headers: { Authorization: `Bearer ${user.token}` } });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    };
    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify({ status })
    });
    if (res.ok) setOrders(orders.map(order => order._id === id ? { ...order, status } : order));
  };

  const statusColor = { Pending: '#f59e0b', Shipped: '#3b82f6', Delivered: '#10b981' };

  return (
    <div style={S.page}>
      <h2 style={S.title}>🚚 Manage Orders</h2>
      <div style={S.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead>
              <tr style={S.headRow}>
                <th style={S.th}>ORDER ID</th>
                <th style={S.th}>USER</th>
                <th style={S.th}>TOTAL</th>
                <th style={S.th}>DATE</th>
                <th style={S.th}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} style={S.row}>
                  <td style={S.td}>{order._id.substring(0, 8)}...</td>
                  <td style={S.td}>{order.userId?.name || 'Deleted User'}</td>
                  <td style={S.td}>₹{order.totalAmount.toFixed(2)}</td>
                  <td style={S.td}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={S.td}>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      style={{ ...S.select, color: statusColor[order.status] || '#6b4423' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p style={{ textAlign: 'center', color: '#9a6a44', padding: '40px' }}>No orders found.</p>}
        </div>
      </div>
    </div>
  );
};

const S = {
  page: { padding: '30px 40px', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(135deg, #fdf6ef 0%, #f5e6d3 100%)', minHeight: '90vh' },
  title: { fontSize: '1.6rem', fontWeight: '700', color: '#5a2d0c', marginBottom: '24px' },
  card: { background: '#fff', border: '1.5px solid #f0dcc8', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(180,100,40,0.07)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  headRow: { borderBottom: '2px solid #f0dcc8' },
  row: { borderBottom: '1px solid #faebd7' },
  th: { padding: '14px 16px', textAlign: 'left', color: '#9a6a44', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' },
  td: { padding: '14px 16px', textAlign: 'left', color: '#3d1f0a', fontSize: '14px' },
  select: { background: '#fffaf5', border: '1.5px solid #d9b896', borderRadius: '8px', padding: '6px 10px', fontFamily: 'inherit', fontSize: '13px', cursor: 'pointer', outline: 'none', fontWeight: '600' },
};

export default AdminOrders;
