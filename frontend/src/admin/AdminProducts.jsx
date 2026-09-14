import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div style={S.page}>
      <div style={S.topBar}>
        <h2 style={S.title}>📦 Manage Products</h2>
        <Link to="/admin/add-product" style={S.addBtn}>+ Add Product</Link>
      </div>
      <div style={S.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead>
              <tr style={S.headRow}>
                <th style={S.th}>ID</th>
                <th style={S.th}>NAME</th>
                <th style={S.th}>PRICE</th>
                <th style={S.th}>CATEGORY</th>
                <th style={S.th}>STOCK</th>
                <th style={S.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} style={S.row}>
                  <td style={S.td}>{product._id.substring(0, 8)}...</td>
                  <td style={S.td}>{product.name}</td>
                  <td style={S.td}>₹{product.price.toFixed(2)}</td>
                  <td style={S.td}><span style={S.badge}>{product.category}</span></td>
                  <td style={S.td}>{product.stock}</td>
                  <td style={S.td}>
                    <Link to={`/admin/edit-product/${product._id}`} style={S.editBtn}>Edit</Link>
                    <button onClick={() => handleDelete(product._id)} style={S.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p style={{ textAlign: 'center', color: '#9a6a44', padding: '40px' }}>No products found.</p>}
        </div>
      </div>
    </div>
  );
};

const S = {
  page: { padding: '30px 40px', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(135deg, #fdf6ef 0%, #f5e6d3 100%)', minHeight: '90vh' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { fontSize: '1.6rem', fontWeight: '700', color: '#5a2d0c', margin: 0 },
  addBtn: { background: 'linear-gradient(135deg, #C8793A, #a85e28)', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(200,121,58,0.3)' },
  card: { background: '#fff', border: '1.5px solid #f0dcc8', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(180,100,40,0.07)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  headRow: { borderBottom: '2px solid #f0dcc8' },
  row: { borderBottom: '1px solid #faebd7' },
  th: { padding: '14px 16px', textAlign: 'left', color: '#9a6a44', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' },
  td: { padding: '14px 16px', textAlign: 'left', color: '#3d1f0a', fontSize: '14px' },
  badge: { background: '#fdf0e6', color: '#C8793A', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: '1px solid #f0dcc8' },
  editBtn: { background: '#e8f4fd', color: '#1a6fa8', padding: '6px 14px', borderRadius: '6px', marginRight: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' },
  deleteBtn: { background: 'rgba(239,68,68,0.1)', color: '#c0392b', padding: '6px 14px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: '13px', fontWeight: '600', fontFamily: 'inherit' },
};

export default AdminProducts;
