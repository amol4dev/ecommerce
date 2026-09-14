import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Rudraksha', 'Pooja Thali & Samagri', 'Idols & Murtis', 'Photos & Frames', 'Gemstones', 'Books'];

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: '',
    tagline1: '', tagline2: '', adminRating: '', adminReviewCount: '', badgeText: '',
    discountPercentage: ''
  });
  

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') { navigate('/'); return null; }

  const handleChange = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    data.append('image', image);
    try {
      const res = await fetch('/api/products', { method: 'POST', headers: { Authorization: `Bearer ${user.token}` }, body: data });
      const responseData = await res.json();
      if (res.ok) { alert('Product created successfully!'); navigate('/admin/products'); }
      else alert(responseData.message || 'Error creating product');
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <h2 style={S.title}>+ Add New Product</h2>
        <form onSubmit={handleSubmit} style={S.form}>

          {/* ── Core Fields ── */}
          <p style={S.sectionLabel}>PRODUCT INFO</p>

          {[
            { label: 'Product Name', key: 'name', type: 'text', placeholder: 'Enter product name' },
            { label: 'Price (₹)', key: 'price', type: 'number', placeholder: '0.00' },
            { label: 'Stock Quantity', key: 'stock', type: 'number', placeholder: '0' },
          ].map(field => (
            <div key={field.key} style={S.group}>
              <label style={S.label}>{field.label}</label>
              <input type={field.type} placeholder={field.placeholder} required value={formData[field.key]}
                onChange={handleChange(field.key)} style={S.input}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
          ))}

          <div style={S.group}>
            <label style={S.label}>Description</label>
            <textarea placeholder="Product description" required rows="4" value={formData.description}
              onChange={handleChange('description')} style={{ ...S.input, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = '#C8793A'}
              onBlur={e => e.target.style.borderColor = '#d9b896'}
            />
          </div>

          <div style={S.group}>
            <label style={S.label}>Category</label>
            <select required value={formData.category} onChange={handleChange('category')} style={S.input}
              onFocus={e => e.target.style.borderColor = '#C8793A'}
              onBlur={e => e.target.style.borderColor = '#d9b896'}
            >
              <option value="" disabled>Select Category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* ── Product Card Display Fields ── */}
          <div style={S.divider} />
          <p style={S.sectionLabel}>🃏 PRODUCT CARD DISPLAY</p>
          <p style={{ fontSize: '12px', color: '#9a6a44', marginTop: '-12px' }}>
            These appear on the customer-facing product card
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={S.group}>
              <label style={S.label}>Tagline 1 <span style={S.hint}>(e.g. Positive Energy)</span></label>
              <input type="text" placeholder="Positive Energy" value={formData.tagline1}
                onChange={handleChange('tagline1')} style={S.input}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
            <div style={S.group}>
              <label style={S.label}>Tagline 2 <span style={S.hint}>(e.g. Health Improve)</span></label>
              <input type="text" placeholder="Health Improve" value={formData.tagline2}
                onChange={handleChange('tagline2')} style={S.input}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={S.group}>
              <label style={S.label}>Star Rating <span style={S.hint}>(0 – 5)</span></label>
              <input type="number" placeholder="4.5" min="0" max="5" step="0.1" value={formData.adminRating}
                onChange={handleChange('adminRating')} style={S.input}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
            <div style={S.group}>
              <label style={S.label}>Review Count <span style={S.hint}>(e.g. 128)</span></label>
              <input type="number" placeholder="128" min="0" value={formData.adminReviewCount}
                onChange={handleChange('adminReviewCount')} style={S.input}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={S.group}>
              <label style={S.label}>Badge Text <span style={S.hint}>(e.g. AstroGrade™)</span></label>
              <input type="text" placeholder="AstroGrade™" value={formData.badgeText}
                onChange={handleChange('badgeText')} style={S.input}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
            <div style={S.group}>
              <label style={S.label}>Discount % <span style={S.hint}>(e.g. 30)</span></label>
              <input type="number" placeholder="30" min="0" max="100" value={formData.discountPercentage}
                onChange={handleChange('discountPercentage')} style={S.input}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
          </div>


          {/* ── Image Upload ── */}
          <div style={S.divider} />
          <p style={S.sectionLabel}>📸 IMAGE</p>
          <div style={S.group}>
            <div style={S.fileBox}>
              <input type="file" accept="image/*" required onChange={(e) => setImage(e.target.files[0])} style={{ color: '#6b4423' }} />
              <p style={{ color: '#9a6a44', fontSize: '12px', margin: '8px 0 0' }}>Uploaded to Cloudinary</p>
            </div>
          </div>

          <button type="submit" disabled={loading} style={loading ? { ...S.btn, opacity: 0.65 } : S.btn}>
            {loading ? 'Uploading & Creating...' : '🚀 Publish Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

const S = {
  page: { padding: '30px 40px', background: 'linear-gradient(135deg, #fdf6ef 0%, #f5e6d3 100%)', minHeight: '90vh' },
  card: { maxWidth: '640px', margin: '0 auto', background: '#fff', border: '1.5px solid #f0dcc8', borderRadius: '20px', padding: '40px', boxShadow: '0 8px 32px rgba(180,100,40,0.1)' },
  title: { fontSize: '1.5rem', fontWeight: '700', color: '#5a2d0c', marginBottom: '28px' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  group: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.82rem', fontWeight: '600', color: '#7a3d10', letterSpacing: '0.02em' },
  hint: { fontWeight: '400', color: '#b08060', fontSize: '0.78rem' },
  input: { padding: '12px 16px', border: '1.5px solid #d9b896', borderRadius: '10px', fontSize: '14.5px', color: '#3d1f0a', outline: 'none', background: '#fffaf5', fontFamily: 'inherit', transition: 'border-color 0.2s' },
  fileBox: { padding: '16px', border: '1.5px dashed #d9b896', borderRadius: '10px', background: '#fffaf5' },
  btn: { padding: '13px', background: 'linear-gradient(135deg, #C8793A, #a85e28)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px rgba(200,121,58,0.3)', fontFamily: 'inherit', marginTop: '6px' },
  outlineBtn: { padding: '6px 12px', background: 'transparent', color: '#C8793A', border: '1.5px solid #C8793A', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  divider: { borderTop: '1.5px dashed #f0dcc8', margin: '4px 0' },
  sectionLabel: { fontSize: '0.72rem', fontWeight: '700', color: '#C8793A', letterSpacing: '2px', margin: '0 0 -4px' },
};

export default AddProduct;
