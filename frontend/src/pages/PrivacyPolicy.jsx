import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ background: '#FDFCF8', minHeight: '90vh', padding: '40px 20px' }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '16px',
        padding: '40px',
        border: '1.5px solid #f0dcc8',
        boxShadow: '0 8px 32px rgba(180, 100, 40, 0.1)'
      }}>
        <h2 style={{ fontSize: '2.5rem', color: '#5a2d0c', marginBottom: '20px', borderBottom: '2px solid #f0dcc8', paddingBottom: '10px' }}>
          Privacy Policy
        </h2>
        
        <p style={{ marginBottom: '20px' }}>
          Triveni Sangam Dialogues ("we," "us," "our") respects your privacy and is committed to protecting the personal information you share with us.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Information We Collect</h4>
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Personal details: name, email address, phone number, shipping/billing address.</li>
          <li>Payment information: processed securely through our third-party payment gateway — we do not store your card/bank details on our servers.</li>
          <li>Order history and preferences.</li>
          <li>Technical data: IP address, browser type, and cookies for improving site performance.</li>
        </ul>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>How We Use Your Information</h4>
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>To process and deliver your orders.</li>
          <li>To communicate order updates, offers, and customer support.</li>
          <li>To improve our website, products, and services.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Sharing of Information</h4>
        <p style={{ marginBottom: '10px' }}>We do not sell your personal information. We may share necessary data with:</p>
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Payment gateway providers, for processing transactions.</li>
          <li>Courier/logistics partners, for order delivery.</li>
          <li>Legal authorities, if required by law.</li>
        </ul>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Cookies</h4>
        <p style={{ marginBottom: '20px' }}>
          Our website uses cookies to enhance browsing experience, remember cart items, and analyze site traffic. You can disable cookies through your browser settings, though some features may not work as intended.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Data Security</h4>
        <p style={{ marginBottom: '20px' }}>
          We use reasonable technical and organizational measures to protect your personal data from unauthorized access, alteration, or disclosure.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Your Rights</h4>
        <p style={{ marginBottom: '20px' }}>
          You may request access to, correction of, or deletion of your personal data by contacting us at <a href="mailto:trivenisangamdialogues@gmail.com" style={{ color: '#C8793A' }}>trivenisangamdialogues@gmail.com</a>.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Changes to This Policy</h4>
        <p style={{ marginBottom: '20px' }}>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>Contact Us</h4>
        <p style={{ marginBottom: '20px' }}>
          For privacy-related questions, email <a href="mailto:trivenisangamdialogues@gmail.com" style={{ color: '#C8793A' }}>trivenisangamdialogues@gmail.com</a>.
        </p>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
