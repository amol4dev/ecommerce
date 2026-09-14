import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BannerForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [btnText, setBtnText] = useState('');
  const [btnLink, setBtnLink] = useState('');
  
  const [desktopImage, setDesktopImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    if (isEditMode) {
      const fetchBanner = async () => {
        try {
          const res = await fetch('/api/banners');
          const data = await res.json();
          const banner = data.find(b => b._id === id);
          if (banner) {
            setTitle(banner.title);
            setTagline(banner.tagline);
            setBtnText(banner.btnText);
            setBtnLink(banner.btnLink);
          } else {
            setError('Banner not found');
          }
        } catch (err) {
          setError(err.message);
        }
      };
      fetchBanner();
    }
  }, [id, isEditMode, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tagline', tagline);
    formData.append('btnText', btnText);
    formData.append('btnLink', btnLink);
    
    if (desktopImage) formData.append('desktopImage', desktopImage);
    if (mobileImage) formData.append('mobileImage', mobileImage);

    if (!isEditMode && (!desktopImage || !mobileImage)) {
      setError('Both Desktop and Mobile images are required for new banners.');
      setLoading(false);
      return;
    }

    try {
      const url = isEditMode ? `/api/banners/${id}` : '/api/banners';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      });

      const data = await res.json();
      
      if (res.ok) {
        navigate('/admin/banners');
      } else {
        setError(data.message || 'Failed to save banner');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <h2 style={S.title}>{isEditMode ? '✏️ Edit Banner' : '🖼️ Add New Banner'}</h2>
        
        {error && <div style={S.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={S.form}>
          <div style={S.formGroup}>
            <label style={S.label}>Title</label>
            <input 
              type="text" 
              style={S.input} 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. Welcome to Triveni Sangam Dialogues"
              required 
            />
          </div>

          <div style={S.formGroup}>
            <label style={S.label}>Tagline</label>
            <input 
              type="text" 
              style={S.input} 
              value={tagline} 
              onChange={e => setTagline(e.target.value)} 
              placeholder="e.g. Discover the best spiritual products at unbeatable prices."
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{...S.formGroup, flex: 1}}>
              <label style={S.label}>Button Text</label>
              <input 
                type="text" 
                style={S.input} 
                value={btnText} 
                onChange={e => setBtnText(e.target.value)} 
                placeholder="e.g. Shop Now"
                required 
              />
            </div>
            <div style={{...S.formGroup, flex: 1}}>
              <label style={S.label}>Button Link URL</label>
              <input 
                type="text" 
                style={S.input} 
                value={btnLink} 
                onChange={e => setBtnLink(e.target.value)} 
                placeholder="e.g. /shop?category=Rudraksha"
                required 
              />
            </div>
          </div>

          <div style={S.formGroup}>
            <label style={S.label}>Desktop Image (Large Screen)</label>
            <input 
              type="file" 
              accept="image/*" 
              style={S.fileInput} 
              onChange={e => setDesktopImage(e.target.files[0])} 
              required={!isEditMode}
            />
            {isEditMode && <small style={S.helpText}>Leave blank to keep existing image</small>}
          </div>

          <div style={S.formGroup}>
            <label style={S.label}>Mobile Image (Phone Screen)</label>
            <input 
              type="file" 
              accept="image/*" 
              style={S.fileInput} 
              onChange={e => setMobileImage(e.target.files[0])} 
              required={!isEditMode}
            />
            {isEditMode && <small style={S.helpText}>Leave blank to keep existing image</small>}
          </div>

          <div style={S.actions}>
            <button type="button" onClick={() => navigate('/admin/banners')} style={S.cancelBtn}>Cancel</button>
            <button type="submit" disabled={loading} style={S.submitBtn}>
              {loading ? 'Saving...' : (isEditMode ? 'Update Banner' : 'Create Banner')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const S = {
  page: { padding: '40px', maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, #fdf6ef 0%, #f5e6d3 100%)', minHeight: '90vh' },
  card: { background: '#fff', border: '1.5px solid #f0dcc8', borderRadius: '16px', padding: '40px', boxShadow: '0 8px 24px rgba(180,100,40,0.08)' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#5a2d0c', marginBottom: '30px', borderBottom: '2px solid #f0dcc8', paddingBottom: '15px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '0.95rem', fontWeight: '600', color: '#7a3d10' },
  input: { padding: '12px 16px', border: '1.5px solid #e8d0b0', borderRadius: '10px', fontSize: '1rem', color: '#3d1f0a', outline: 'none', background: '#faf6f1', transition: 'border-color 0.2s', fontFamily: 'inherit' },
  fileInput: { padding: '10px', border: '1.5px dashed #C8793A', borderRadius: '10px', background: '#fffaf5', color: '#7a3d10', cursor: 'pointer' },
  helpText: { fontSize: '0.85rem', color: '#9a6a44', marginTop: '4px' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' },
  cancelBtn: { padding: '12px 24px', background: 'transparent', color: '#7a3d10', border: '1.5px solid #e8d0b0', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' },
  submitBtn: { padding: '12px 24px', background: 'linear-gradient(135deg, #C8793A, #a85e28)', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', boxShadow: '0 4px 12px rgba(200,121,58,0.3)' },
  errorAlert: { background: 'rgba(239,68,68,0.1)', color: '#c0392b', padding: '15px 20px', borderRadius: '10px', marginBottom: '25px', border: '1px solid rgba(239,68,68,0.25)', fontWeight: '600' }
};

export default BannerForm;
