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

const ReturnPolicy = () => {
  return (
    <div style={{ background: '#FDFCF8', minHeight: '90vh', padding: '20px' }}>
      <div style={textualStyle}>
        <h2 style={{ color: '#5a2d0c', marginBottom: '20px', borderBottom: '1.5px solid #f0dcc8', paddingBottom: '15px' }}>
          Return & Refund Policy
        </h2>
        
        <p style={{ marginBottom: '20px' }}>
          At Triveni Sangam Dialogues, we want you to be fully satisfied with your purchase. Since many of our products are sacred and spiritual items, please read our return policy carefully before placing an order.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Eligibility for Returns</h4>
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Returns are accepted only for items that arrive damaged, defective, or incorrect compared to what was ordered.</li>
          <li>Return requests must be raised within 7 days of delivery, along with unboxing photos/video as proof.</li>
          <li>The item must be unused, in its original packaging, with all tags and certificates (if any) intact.</li>
        </ul>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Non-Returnable Items</h4>
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Rudraksha, malas, and other worn/consecrated spiritual items once opened or used, due to their sacred nature.</li>
          <li>Books, once the package/seal has been opened.</li>
          <li>Personalized or custom-made items (e.g., engraved idols).</li>
          <li>Items marked "Final Sale" on the product page.</li>
        </ul>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Refund Process</h4>
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Once your return is received and inspected, we will notify you of the approval or rejection of your refund.</li>
          <li>Approved refunds are processed within 7–10 business days to your original payment method.</li>
          <li>Shipping charges (if any) are non-refundable, unless the return is due to our error (wrong/damaged item).</li>
        </ul>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Exchanges</h4>
        <p style={{ marginBottom: '20px' }}>
          We offer exchanges for damaged or defective items, subject to stock availability.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>How to Request a Return</h4>
        <p style={{ marginBottom: '20px' }}>
          Email us at <a href="mailto:trivenisangamdialogues@gmail.com" style={{ color: '#C8793A' }}>trivenisangamdialogues@gmail.com</a> with your order number, reason for return, and photos of the product. Our team will guide you through the next steps.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
