import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminBanners = () => {
  const { user } = useContext(AuthContext);
  const [banners, setBanners] = useState([]);
  const [adBanner, setAdBanner] = useState(null);
  const [adLoading, setAdLoading] = useState(false);
  const [adError, setAdError] = useState('');
  const [adSuccess, setAdSuccess] = useState('');
  const [desktopPreview, setDesktopPreview] = useState(null);
  const [mobilePreview, setMobilePreview] = useState(null);
  const desktopRef = useRef();
  const mobileRef = useRef();
  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners');
      const data = await res.json();
      if (Array.isArray(data)) {
        setAdBanner(data.find(b => b.isAdBanner) || null);
        setBanners(data.filter(b => !b.isAdBanner));
      }
    } catch (err) {
      console.error('Error fetching banners:', err);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    fetchBanners();
  }, [user, navigate]);

  const handleAdUpload = async (e) => {
    e.preventDefault();
    const desktop = desktopRef.current?.files[0];
    const mobile = mobileRef.current?.files[0];
    if (!desktop || !mobile) { setAdError('Please select both Desktop and Mobile images.'); return; }

    setAdLoading(true); setAdError(''); setAdSuccess('');

    // If existing ad banner, delete it first
    if (adBanner) {
      await fetch(`/api/banners/${adBanner._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
    }

    const formData = new FormData();
    formData.append('isAdBanner', 'true');
    formData.append('desktopImage', desktop);
    formData.append('mobileImage', mobile);

    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setAdSuccess('✅ Ad banner uploaded successfully!');
        setDesktopPreview(null); setMobilePreview(null);
        if (desktopRef.current) desktopRef.current.value = '';
        if (mobileRef.current) mobileRef.current.value = '';
        fetchBanners();
      } else {
        setAdError(data.message || 'Upload failed.');
      }
    } catch (err) {
      setAdError('An error occurred. Please try again.');
    } finally {
      setAdLoading(false);
    }
  };

  const handleDeleteAdBanner = async () => {
    if (!adBanner) return;
    if (!window.confirm('Remove the ad banner from the home page?')) return;
    const res = await fetch(`/api/banners/${adBanner._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` }
    });
    if (res.ok) { setAdBanner(null); fetchBanners(); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      const res = await fetch(`/api/banners/${id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) fetchBanners();
    }
  };

  const handleMove = async (index, direction) => {
    if ((direction === -1 && index === 0) || (direction === 1 && index === banners.length - 1)) return;
    const newBanners = [...banners];
    const temp = newBanners[index];
    newBanners[index] = newBanners[index + direction];
    newBanners[index + direction] = temp;
    setBanners(newBanners);
    try {
      for (let i = 0; i < newBanners.length; i++) {
        await fetch(`/api/banners/${newBanners[i]._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
          body: JSON.stringify({ order: i })
        });
      }
    } catch (err) { console.error('Error saving order', err); }
  };

  return (
    <div style={S.page}>

      {/* ── AD BANNER SECTION ── */}
      <div style={S.adCard}>
        <div style={S.adCardHeader}>
          <div>
            <h2 style={S.adCardTitle}>📣 Promotional Ad Banner</h2>
            <p style={S.adCardSubtitle}>
              Pure image banner — shows <strong style={{ color: '#C8793A' }}>first in the slider</strong> above all other banners. Upload one image for desktop and one for mobile.
            </p>
          </div>
          <span style={adBanner ? S.badgeActive : S.badgeInactive}>
            {adBanner ? '● Active' : '○ None'}
          </span>
        </div>

        {/* Current Ad Banner Preview */}
        {adBanner && (
          <div style={S.adPreviewRow}>
            <div style={S.adPreviewBox}>
              <p style={S.adPreviewLabel}>🖥️ Desktop</p>
              <img src={adBanner.desktopImage} alt="Desktop Ad" style={S.adPreviewImg} />
            </div>
            <div style={S.adPreviewBox}>
              <p style={S.adPreviewLabel}>📱 Mobile</p>
              <img src={adBanner.mobileImage} alt="Mobile Ad" style={{ ...S.adPreviewImg, aspectRatio: '9/16', objectFit: 'cover' }} />
            </div>
            <button onClick={handleDeleteAdBanner} style={S.adDeleteBtn}>🗑️ Remove Ad Banner</button>
          </div>
        )}

        {/* Upload Form */}
        <form onSubmit={handleAdUpload} style={S.adForm}>
          <p style={S.adFormTitle}>{adBanner ? '🔄 Replace Ad Banner' : '⬆️ Upload Ad Banner'}</p>

          {adError && <div style={S.alertError}>{adError}</div>}
          {adSuccess && <div style={S.alertSuccess}>{adSuccess}</div>}

          <div style={S.adFileGrid}>
            <div style={S.fileBox}>
              <label style={S.fileLabel}>🖥️ Desktop Image <span style={S.fileHint}>(recommended 1920×600)</span></label>
              <input
                ref={desktopRef}
                type="file"
                accept="image/*"
                style={S.fileInput}
                onChange={e => { const f = e.target.files[0]; setDesktopPreview(f ? URL.createObjectURL(f) : null); }}
              />
              {desktopPreview && <img src={desktopPreview} alt="Desktop Preview" style={S.thumbPreview} />}
            </div>
            <div style={S.fileBox}>
              <label style={S.fileLabel}>📱 Mobile Image <span style={S.fileHint}>(recommended 600×900)</span></label>
              <input
                ref={mobileRef}
                type="file"
                accept="image/*"
                style={S.fileInput}
                onChange={e => { const f = e.target.files[0]; setMobilePreview(f ? URL.createObjectURL(f) : null); }}
              />
              {mobilePreview && <img src={mobilePreview} alt="Mobile Preview" style={{ ...S.thumbPreview, aspectRatio: '3/4' }} />}
            </div>
          </div>

          <button type="submit" disabled={adLoading} style={adLoading ? { ...S.adUploadBtn, opacity: 0.6, cursor: 'not-allowed' } : S.adUploadBtn}>
            {adLoading ? '⏳ Uploading...' : (adBanner ? '🔄 Replace Ad Banner' : '🚀 Publish Ad Banner')}
          </button>
        </form>
      </div>

      {/* ── REGULAR BANNERS SECTION ── */}
      <div style={S.topBar}>
        <div>
          <h2 style={S.title}>🖼️ Manage Home Banners</h2>
          <p style={S.subtitle}>{banners.length} / 6 Banners Active</p>
        </div>
        {banners.length >= 6 ? (
          <button style={{ ...S.addBtn, opacity: 0.5, cursor: 'not-allowed' }} disabled>Limit Reached (Max 6)</button>
        ) : (
          <Link to="/admin/banners/new" style={S.addBtn}>+ Add Banner</Link>
        )}
      </div>

      <div style={S.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead>
              <tr style={S.headRow}>
                <th style={S.th}>Preview</th>
                <th style={S.th}>Title</th>
                <th style={S.th}>Tagline</th>
                <th style={S.th}>Order</th>
                <th style={S.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr key={banner._id} style={S.row}>
                  <td style={S.td}><img src={banner.desktopImage} alt="Desktop Preview" style={S.previewImg} /></td>
                  <td style={S.td}><strong>{banner.title}</strong></td>
                  <td style={S.td}><span style={S.badge}>{banner.tagline}</span></td>
                  <td style={S.td}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleMove(index, -1)} disabled={index === 0} style={{ ...S.orderBtn, opacity: index === 0 ? 0.3 : 1 }}>↑</button>
                      <button onClick={() => handleMove(index, 1)} disabled={index === banners.length - 1} style={{ ...S.orderBtn, opacity: index === banners.length - 1 ? 0.3 : 1 }}>↓</button>
                    </div>
                  </td>
                  <td style={S.td}>
                    <Link to={`/admin/banners/edit/${banner._id}`} style={S.editBtn}>Edit</Link>
                    <button onClick={() => handleDelete(banner._id)} style={S.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {banners.length === 0 && <p style={{ textAlign: 'center', color: '#9a6a44', padding: '40px' }}>No banners configured yet. Add your first banner!</p>}
        </div>
      </div>
    </div>
  );
};

const S = {
  page: { padding: '30px 40px', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(135deg, #fdf6ef 0%, #f5e6d3 100%)', minHeight: '90vh' },

  // Ad Banner Card
  adCard: { background: '#fff', border: '2px solid #C8793A', borderRadius: '18px', padding: '28px 32px', marginBottom: '36px', boxShadow: '0 6px 24px rgba(200,121,58,0.12)' },
  adCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  adCardTitle: { fontSize: '1.4rem', fontWeight: '700', color: '#5a2d0c', margin: '0 0 6px' },
  adCardSubtitle: { fontSize: '0.9rem', color: '#9a6a44', margin: 0, lineHeight: '1.5' },
  badgeActive: { background: 'rgba(16,185,129,0.12)', color: '#059669', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', whiteSpace: 'nowrap', border: '1px solid rgba(16,185,129,0.25)' },
  badgeInactive: { background: 'rgba(156,163,175,0.15)', color: '#6b7280', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', whiteSpace: 'nowrap', border: '1px solid rgba(156,163,175,0.25)' },

  adPreviewRow: { display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '24px', padding: '20px', background: '#fffaf5', borderRadius: '12px', border: '1px solid #f0dcc8', flexWrap: 'wrap' },
  adPreviewBox: { flex: 1, minWidth: '180px' },
  adPreviewLabel: { fontSize: '0.8rem', fontWeight: '700', color: '#9a6a44', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  adPreviewImg: { width: '100%', maxWidth: '300px', borderRadius: '10px', border: '1.5px solid #e8d0b0', display: 'block', aspectRatio: '16/5', objectFit: 'cover' },
  adDeleteBtn: { alignSelf: 'center', background: 'rgba(239,68,68,0.1)', color: '#c0392b', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '10px 18px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', fontFamily: 'inherit', whiteSpace: 'nowrap' },

  adForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
  adFormTitle: { fontSize: '0.85rem', fontWeight: '700', color: '#C8793A', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 },
  alertError: { background: 'rgba(239,68,68,0.08)', color: '#c0392b', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.2)', fontWeight: '600', fontSize: '14px' },
  alertSuccess: { background: 'rgba(16,185,129,0.08)', color: '#059669', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)', fontWeight: '600', fontSize: '14px' },

  adFileGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  fileBox: { display: 'flex', flexDirection: 'column', gap: '10px' },
  fileLabel: { fontSize: '0.85rem', fontWeight: '600', color: '#7a3d10' },
  fileHint: { fontWeight: '400', color: '#b08060', fontSize: '0.78rem' },
  fileInput: { padding: '10px 12px', border: '1.5px dashed #C8793A', borderRadius: '10px', background: '#fffaf5', color: '#7a3d10', cursor: 'pointer', fontSize: '13px' },
  thumbPreview: { width: '100%', borderRadius: '10px', border: '1.5px solid #e8d0b0', objectFit: 'cover', maxHeight: '160px' },
  adUploadBtn: { padding: '13px 28px', background: 'linear-gradient(135deg, #C8793A, #a85e28)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 14px rgba(200,121,58,0.35)', fontFamily: 'inherit', alignSelf: 'flex-start' },

  // Regular banners
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { fontSize: '1.6rem', fontWeight: '700', color: '#5a2d0c', margin: '0 0 5px 0' },
  subtitle: { fontSize: '0.95rem', color: '#9a6a44', margin: 0, fontWeight: '600' },
  addBtn: { background: 'linear-gradient(135deg, #C8793A, #a85e28)', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(200,121,58,0.3)', border: 'none', cursor: 'pointer' },
  card: { background: '#fff', border: '1.5px solid #f0dcc8', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(180,100,40,0.07)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  headRow: { borderBottom: '2px solid #f0dcc8' },
  row: { borderBottom: '1px solid #faebd7' },
  th: { padding: '14px 16px', textAlign: 'left', color: '#9a6a44', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' },
  td: { padding: '14px 16px', textAlign: 'left', color: '#3d1f0a', fontSize: '14px', verticalAlign: 'middle' },
  badge: { background: '#fdf0e6', color: '#C8793A', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: '1px solid #f0dcc8' },
  editBtn: { background: '#e8f4fd', color: '#1a6fa8', padding: '6px 14px', borderRadius: '6px', marginRight: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' },
  deleteBtn: { background: 'rgba(239,68,68,0.1)', color: '#c0392b', padding: '6px 14px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: '13px', fontWeight: '600', fontFamily: 'inherit' },
  previewImg: { width: '120px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e8d0b0' },
  orderBtn: { background: '#f5e6d3', border: '1px solid #e8d0b0', color: '#5a2d0c', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
};

export default AdminBanners;
