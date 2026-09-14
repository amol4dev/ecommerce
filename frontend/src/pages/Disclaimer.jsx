import React from 'react';

const textualStyle = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '40px',
  background: '#fff',
  borderRadius: '16px',
  border: '1.5px solid #f0dcc8',
  boxShadow: '0 8px 32px rgba(180, 100, 40, 0.1)',
  lineHeight: '1.8',
  color: '#7a3d10'
};

const Disclaimer = () => {
  return (
    <div style={{ background: '#FDFCF8', minHeight: '90vh', padding: '20px' }}>
      <div style={textualStyle}>
        <h2 style={{ color: '#5a2d0c', marginBottom: '20px', borderBottom: '1.5px solid #f0dcc8', paddingBottom: '15px' }}>
          Disclaimer
        </h2>
        
        <p style={{ marginBottom: '20px' }}>
          The information, products, and content provided on Triveni Sangam Dialogues ("we," "us," "our") are intended for educational, devotional, and informational purposes only.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>No Guaranteed Outcomes</h4>
        <p style={{ marginBottom: '15px' }}>
          We do not guarantee any specific astrological, spiritual, health, financial, or personal outcome from the use of any product (including but not limited to rudraksha, gemstones, pooja items, or idols) sold on this site. Any beliefs, practices, or benefits associated with spiritual products are based on traditional Sanatan belief systems and should not be treated as scientifically proven claims.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Not Professional Advice</h4>
        <p style={{ marginBottom: '15px' }}>
          Content on this website (including videos, articles, and product descriptions) does not constitute professional, medical, legal, or financial advice. Please consult a qualified professional for such matters.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Product Images & Descriptions</h4>
        <p style={{ marginBottom: '15px' }}>
          We try to display product colors, sizes, and details as accurately as possible. However, slight variations may occur due to the handmade/natural nature of certain items (e.g., rudraksha beads, idols) and screen display differences.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Third-Party Links</h4>
        <p style={{ marginBottom: '15px' }}>
          Our website and social channels (YouTube, Instagram, etc.) may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of these external sites.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Limitation of Liability</h4>
        <p style={{ marginBottom: '15px' }}>
          Triveni Sangam Dialogues, its founder, and team shall not be held liable for any direct or indirect loss or damage arising from the use of our products, website content, or reliance on any information provided.
        </p>

        <p style={{ marginTop: '30px', fontStyle: 'italic', fontSize: '0.9rem', color: '#9a6a44' }}>
          For any questions regarding this disclaimer, contact us at <a href="mailto:trivenisangamdialogues@gmail.com" style={{ color: '#C8793A' }}>trivenisangamdialogues@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
