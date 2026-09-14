import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminCategoryBanners = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('');
  const desktopRef = useRef();
  const mobileRef = useRef();
  const [desktopPreview, setDesktopPreview] = useState(null);
  const [mobilePreview, setMobilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
useEffect(() => {
  if (!user || user.role !== 'admin') { navigate('/'); return; }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [user, navigate]);
  // useEffect(() => {
  //   if (!user || user.role !== 'admin') { navigate('/'); return; }
  //   fetchData();
  // }, [user, navigate]);

  const predefinedCategories = [
    'Rudraksha',
    'Pooja Thali & Samagri',
    'Idols & Murtis',
    'Photos & Frames',
    'Gemstones',
    'Books'
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      setCategories(predefinedCategories);

      // Fetch existing category banners
      const banRes = await fetch('/api/category-banners');
      const bannerData = await banRes.json();
      
      const bannerMap = {};
      if (Array.isArray(bannerData)) {
        bannerData.forEach(b => {
          bannerMap[b.categoryName] = b;
        });
      }
      setBanners(bannerMap);

      if (!selectedCategory) {
        setSelectedCategory(predefinedCategories[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setDesktopPreview(null);
    setMobilePreview(null);
    setMessage({ type: '', text: '' });
    if (desktopRef.current) desktopRef.current.value = '';
    if (mobileRef.current) mobileRef.current.value = '';
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const desktop = desktopRef.current?.files[0];
    const mobile = mobileRef.current?.files[0];
    
    if (!desktop || !mobile) {
      setMessage({ type: 'error', text: 'Please select both desktop and mobile images.' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('categoryName', selectedCategory);
    formData.append('desktopImage', desktop);
    formData.append('mobileImage', mobile);

    try {
      const res = await fetch('/api/category-banners', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ type: 'success', text: `Banner uploaded successfully for ${selectedCategory}` });
        setDesktopPreview(null); setMobilePreview(null);
        if (desktopRef.current) desktopRef.current.value = '';
        if (mobileRef.current) mobileRef.current.value = '';
        fetchData(); // Refresh banners
      } else {
        setMessage({ type: 'error', text: data.message || 'Upload failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred during upload' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (categoryName) => {
    if (!window.confirm(`Are you sure you want to remove the banner for ${categoryName}?`)) return;
    
    try {
      const res = await fetch(`/api/category-banners/${encodeURIComponent(categoryName)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Banner removed' });
        fetchData();
      } else {
        setMessage({ type: 'error', text: 'Failed to remove banner' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <h2 style={S.title}>🏷️ Manage Category Banners</h2>
          <p style={S.subtitle}>Upload specific banners to show at the top of category pages.</p>
        </div>
        <button onClick={() => navigate('/admin')} style={S.backBtn}>Back to Dashboard</button>
      </div>

      {loading ? <p>Loading categories...</p> : (
        <div style={S.container}>
          {/* Left Panel: Category List */}
          <div style={S.sidebar}>
            <h3 style={S.sidebarTitle}>Categories</h3>
            {categories.length === 0 ? <p style={S.muted}>No categories found. Add some products first.</p> : (
              <ul style={S.catList}>
                {categories.map(cat => {
                  const hasBanner = !!banners[cat];
                  return (
                    <li 
                      key={cat} 
                      onClick={() => handleCategorySelect(cat)}
                      style={{...S.catItem, ...(selectedCategory === cat ? S.catItemActive : {})}}
                    >
                      <span>{cat}</span>
                      {hasBanner && <span style={S.bannerIndicator}>🖼️</span>}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Right Panel: Banner Manager */}
          <div style={S.mainPanel}>
            {selectedCategory ? (
              <>
                <h3 style={S.panelTitle}>Banner for: <span style={{color: '#C8793A'}}>{selectedCategory}</span></h3>
                
                {message.text && (
                  <div style={message.type === 'error' ? S.alertError : S.alertSuccess}>
                    {message.text}
                  </div>
                )}

                {/* Current Banner Display */}
                {banners[selectedCategory] ? (
                  <div style={S.currentBannerCard}>
                    <div style={S.bannerHeader}>
                      <h4 style={{margin: 0, color: '#059669'}}>✅ Active Banner</h4>
                      <button onClick={() => handleDelete(selectedCategory)} style={S.deleteBtn}>🗑️ Remove</button>
                    </div>
                    <div style={S.previewGrid}>
                      <div>
                        <p style={S.previewLabel}>Desktop View</p>
                        <img src={banners[selectedCategory].desktopImage} alt="Desktop" style={S.previewImgDesktop} />
                      </div>
                      <div>
                        <p style={S.previewLabel}>Mobile View</p>
                        <img src={banners[selectedCategory].mobileImage} alt="Mobile" style={S.previewImgMobile} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={S.noBannerCard}>
                    <p style={{margin: 0, color: '#9a6a44'}}>No banner uploaded for this category yet.</p>
                  </div>
                )}

                {/* Upload Form */}
                <div style={S.uploadCard}>
                  <h4 style={{margin: '0 0 15px', color: '#5a2d0c'}}>{banners[selectedCategory] ? '🔄 Replace Banner' : '⬆️ Upload New Banner'}</h4>
                  <form onSubmit={handleUpload}>
                    <div style={S.formGrid}>
                      <div style={S.fileGroup}>
                        <label style={S.fileLabel}>Desktop Image (Recommended 1920×400)</label>
                        <input type="file" accept="image/*" ref={desktopRef} style={S.fileInput} onChange={e => { const f = e.target.files[0]; setDesktopPreview(f ? URL.createObjectURL(f) : null) }} />
                        {desktopPreview && <img src={desktopPreview} alt="Preview" style={S.thumbDesktop} />}
                      </div>
                      <div style={S.fileGroup}>
                        <label style={S.fileLabel}>Mobile Image (Recommended 600×400)</label>
                        <input type="file" accept="image/*" ref={mobileRef} style={S.fileInput} onChange={e => { const f = e.target.files[0]; setMobilePreview(f ? URL.createObjectURL(f) : null) }} />
                        {mobilePreview && <img src={mobilePreview} alt="Preview" style={S.thumbMobile} />}
                      </div>
                    </div>
                    <button type="submit" disabled={uploading} style={uploading ? {...S.uploadBtn, opacity: 0.7} : S.uploadBtn}>
                      {uploading ? '⏳ Uploading...' : '🚀 Save Banner'}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <p style={{color: '#9a6a44', textAlign: 'center', marginTop: '40px'}}>Select a category from the left to manage its banner.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const S = {
  page: { padding: '30px 40px', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(135deg, #fdf6ef 0%, #f5e6d3 100%)', minHeight: '90vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#5a2d0c', margin: '0 0 5px' },
  subtitle: { fontSize: '0.95rem', color: '#9a6a44', margin: 0 },
  backBtn: { padding: '8px 16px', background: '#fff', border: '1.5px solid #e8d0b0', borderRadius: '8px', cursor: 'pointer', color: '#7a3d10', fontWeight: '600' },
  
  container: { display: 'flex', gap: '30px', alignItems: 'flex-start' },
  
  // Sidebar
  sidebar: { width: '280px', background: '#fff', border: '1.5px solid #f0dcc8', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(180,100,40,0.05)' },
  sidebarTitle: { margin: '0 0 15px', color: '#5a2d0c', fontSize: '1.2rem', borderBottom: '1.5px solid #f0dcc8', paddingBottom: '10px' },
  catList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' },
  catItem: { padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#7a3d10', fontWeight: '500', transition: 'all 0.2s', background: '#faf6f1' },
  catItemActive: { background: '#fdf0e6', border: '1.5px solid #C8793A', color: '#C8793A', fontWeight: '700' },
  bannerIndicator: { fontSize: '0.9rem' },
  muted: { color: '#9a6a44', fontSize: '0.9rem' },

  // Main Panel
  mainPanel: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
  panelTitle: { margin: '0', fontSize: '1.5rem', color: '#5a2d0c', background: '#fff', padding: '20px', borderRadius: '12px', border: '1.5px solid #f0dcc8', boxShadow: '0 4px 16px rgba(180,100,40,0.05)' },
  
  alertSuccess: { background: 'rgba(16,185,129,0.1)', color: '#059669', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' },
  alertError: { background: 'rgba(239,68,68,0.1)', color: '#c0392b', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' },
  
  currentBannerCard: { background: '#fff', border: '2px solid #a7f3d0', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 16px rgba(16,185,129,0.05)' },
  bannerHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  deleteBtn: { background: 'rgba(239,68,68,0.1)', color: '#c0392b', border: '1px solid rgba(239,68,68,0.2)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  previewGrid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  previewLabel: { margin: '0 0 8px', fontSize: '0.85rem', fontWeight: '600', color: '#7a3d10', textTransform: 'uppercase' },
  previewImgDesktop: { width: '100%', maxWidth: '400px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e8d0b0' },
  previewImgMobile: { width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e8d0b0' },
  
  noBannerCard: { background: '#fffaf5', border: '1.5px dashed #e8d0b0', borderRadius: '12px', padding: '30px', textAlign: 'center' },
  
  uploadCard: { background: '#fff', border: '1.5px solid #f0dcc8', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 16px rgba(180,100,40,0.05)' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  fileGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  fileLabel: { fontSize: '0.85rem', fontWeight: '600', color: '#7a3d10' },
  fileInput: { padding: '10px', border: '1.5px dashed #C8793A', borderRadius: '8px', background: '#fffaf5', cursor: 'pointer', fontSize: '13px' },
  thumbDesktop: { width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', marginTop: '10px' },
  thumbMobile: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px', marginTop: '10px' },
  uploadBtn: { padding: '12px 24px', background: 'linear-gradient(135deg, #C8793A, #a85e28)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(200,121,58,0.3)' }
};

export default AdminCategoryBanners;
