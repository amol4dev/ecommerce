import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const CATEGORIES = ['Rudraksha', 'Pooja Thali & Samagri', 'Idols & Murtis', 'Photos & Frames', 'Gemstones', 'Books'];

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: '',
    tagline1: '', tagline2: '', adminRating: '', adminReviewCount: '', badgeText: '',
    discountPercentage: ''
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setFormData({
        name: data.name || '',
        description: data.description || '',
        price: data.price || '',
        category: data.category || '',
        stock: data.stock || '',
        tagline1: data.tagline1 || '',
        tagline2: data.tagline2 || '',
        adminRating: data.adminRating || '',
        adminReviewCount: data.adminReviewCount || '',
        badgeText: data.badgeText || '',
        discountPercentage: data.discountPercentage || '',
      });

    };
    fetchProduct();
  }, [id]);

  const handleChange = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    if (image) data.append('image', image);

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${user.token}` },
      body: data
    });
    setLoading(false);
    if (res.ok) {
      alert('Product updated successfully!');
      navigate('/admin/products');
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <h2 style={S.title}>✏️ Edit Product</h2>
        <form onSubmit={handleSubmit} style={S.form}>

          {/* ── Core Fields ── */}
          <p style={S.sectionLabel}>PRODUCT INFO</p>

          <div style={S.group}>
            <label style={labelStyle}>Product Name</label>
            <input type="text" placeholder="Product Name" required value={formData.name}
              onChange={handleChange('name')} style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#C8793A'}
              onBlur={e => e.target.style.borderColor = '#d9b896'}
            />
          </div>

          <div style={S.group}>
            <label style={labelStyle}>Description</label>
            <textarea placeholder="Description" required rows="4" value={formData.description}
              onChange={handleChange('description')} style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = '#C8793A'}
              onBlur={e => e.target.style.borderColor = '#d9b896'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={S.group}>
              <label style={labelStyle}>Price (₹)</label>
              <input type="number" placeholder="Price" required value={formData.price}
                onChange={handleChange('price')} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
            <div style={S.group}>
              <label style={labelStyle}>Stock Quantity</label>
              <input type="number" placeholder="Stock" required value={formData.stock}
                onChange={handleChange('stock')} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
          </div>

          <div style={S.group}>
            <label style={labelStyle}>Category</label>
            <select required value={formData.category} onChange={handleChange('category')} style={inputStyle}
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
              <label style={labelStyle}>Tagline 1 <span style={S.hint}>(e.g. Positive Energy)</span></label>
              <input type="text" placeholder="Positive Energy" value={formData.tagline1}
                onChange={handleChange('tagline1')} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
            <div style={S.group}>
              <label style={labelStyle}>Tagline 2 <span style={S.hint}>(e.g. Health Improve)</span></label>
              <input type="text" placeholder="Health Improve" value={formData.tagline2}
                onChange={handleChange('tagline2')} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={S.group}>
              <label style={labelStyle}>Star Rating <span style={S.hint}>(0 – 5)</span></label>
              <input type="number" placeholder="4.5" min="0" max="5" step="0.1" value={formData.adminRating}
                onChange={handleChange('adminRating')} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
            <div style={S.group}>
              <label style={labelStyle}>Review Count <span style={S.hint}>(e.g. 128)</span></label>
              <input type="number" placeholder="128" min="0" value={formData.adminReviewCount}
                onChange={handleChange('adminReviewCount')} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={S.group}>
              <label style={labelStyle}>Badge Text <span style={S.hint}>(e.g. AstroGrade™)</span></label>
              <input type="text" placeholder="AstroGrade™" value={formData.badgeText}
                onChange={handleChange('badgeText')} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
            <div style={S.group}>
              <label style={labelStyle}>Discount % <span style={S.hint}>(e.g. 30)</span></label>
              <input type="number" placeholder="30" min="0" max="100" value={formData.discountPercentage}
                onChange={handleChange('discountPercentage')} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C8793A'}
                onBlur={e => e.target.style.borderColor = '#d9b896'}
              />
            </div>
          </div>


          {/* ── Replace Image ── */}
          <div style={S.divider} />
          <p style={S.sectionLabel}>📸 IMAGE</p>
          <div style={{ padding: '16px', border: '1.5px dashed #d9b896', borderRadius: '10px', background: '#fffaf5' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: '#7a3d10', fontWeight: '600', fontSize: '0.82rem' }}>
              Replace Image <span style={S.hint}>(optional)</span>
            </label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ color: '#6b4423' }} />
          </div>

          <button type="submit" disabled={loading} style={{
            padding: '13px', background: 'linear-gradient(135deg, #C8793A, #a85e28)', color: '#fff',
            border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.65 : 1,
            fontFamily: 'inherit', marginTop: '4px', boxShadow: '0 4px 14px rgba(200,121,58,0.3)'
          }}>
            {loading ? 'Updating...' : '✅ Update Product'}
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
  hint: { fontWeight: '400', color: '#b08060', fontSize: '0.78rem' },
  outlineBtn: { padding: '6px 12px', background: 'transparent', color: '#C8793A', border: '1.5px solid #C8793A', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  divider: { borderTop: '1.5px dashed #f0dcc8', margin: '4px 0' },
  sectionLabel: { fontSize: '0.72rem', fontWeight: '700', color: '#C8793A', letterSpacing: '2px', margin: '0 0 -4px' },
};

const labelStyle = { fontSize: '0.82rem', fontWeight: '600', color: '#7a3d10', letterSpacing: '0.02em' };
const inputStyle = { padding: '12px 16px', background: '#fffaf5', border: '1.5px solid #d9b896', borderRadius: '10px', color: '#3d1f0a', fontSize: '15px', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' };

export default EditProduct;
