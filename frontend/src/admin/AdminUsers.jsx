import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/auth/users', { headers: { Authorization: `Bearer ${user.token}` } });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    };
    fetchUsers();
  }, [user]);

  return (
    <div style={S.page}>
      <h2 style={S.title}>👥 User Directory</h2>
      <div style={S.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead>
              <tr style={S.headRow}>
                <th style={S.th}>ID</th>
                <th style={S.th}>NAME</th>
                <th style={S.th}>EMAIL</th>
                <th style={S.th}>ROLE</th>
                <th style={S.th}>JOINED</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={S.row}>
                  <td style={S.td}>{u._id.substring(0, 8)}...</td>
                  <td style={S.td}>{u.name}</td>
                  <td style={S.td}>{u.email}</td>
                  <td style={S.td}>
                    <span style={u.role === 'admin' ? S.adminBadge : S.userBadge}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={S.td}>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p style={{ textAlign: 'center', color: '#9a6a44', padding: '40px' }}>No users found.</p>}
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
  adminBadge: { background: 'rgba(200,121,58,0.15)', color: '#C8793A', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
  userBadge: { background: 'rgba(16,185,129,0.1)', color: '#059669', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
};

export default AdminUsers;
