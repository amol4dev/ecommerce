import React from 'react';

const TermsOfService = () => {
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
          Terms of Service
        </h2>
        
        <p style={{ marginBottom: '20px' }}>
          Welcome to Triveni Sangam Dialogues. By accessing or using our website, you agree to be bound by the following Terms of Service. Please read them carefully.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>1. General</h4>
        <p style={{ marginBottom: '20px' }}>
          This website is owned and operated by Triveni Sangam Dialogues, founded by Rishabh Agarwal. By using this site, you confirm you are at least 18 years old or using it under the supervision of a parent/guardian.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>2. Products & Orders</h4>
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>All products (rudraksha, pooja thalis, idols, sacred images, spiritual books, etc.) are subject to availability.</li>
          <li>We reserve the right to limit quantities, refuse orders, or discontinue products at our discretion.</li>
          <li>Prices are listed in INR and may change without prior notice.</li>
        </ul>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>3. Payment</h4>
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Payment must be made in full at the time of placing an order through our supported payment methods.</li>
          <li>All transactions are processed through secure third-party payment gateways.</li>
        </ul>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>4. Shipping</h4>
        <p style={{ marginBottom: '20px' }}>
          We aim to ship orders within the timeframe mentioned on the product page. Delivery timelines are estimates and may vary due to courier delays or unforeseen circumstances.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>5. Intellectual Property</h4>
        <p style={{ marginBottom: '20px' }}>
          All content on this website — including text, logos, images, and videos — is the property of Triveni Sangam Dialogues or its licensors and may not be reproduced without prior written permission.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>6. User Conduct</h4>
        <p style={{ marginBottom: '20px' }}>
          You agree not to misuse the website, including attempting unauthorized access, uploading harmful content, or using the site for any unlawful purpose.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>7. Limitation of Liability</h4>
        <p style={{ marginBottom: '20px' }}>
          Triveni Sangam Dialogues shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>8. Governing Law</h4>
        <p style={{ marginBottom: '20px' }}>
          These Terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>9. Changes to Terms</h4>
        <p style={{ marginBottom: '20px' }}>
          We reserve the right to update these Terms of Service at any time. Continued use of the website after changes constitutes acceptance of the revised terms.
        </p>

        <h4 style={{ color: '#C8793A', marginTop: '25px', marginBottom: '10px' }}>10. Contact</h4>
        <p style={{ marginBottom: '20px' }}>
          For any questions about these Terms, contact us at <a href="mailto:trivenisangamdialogues@gmail.com" style={{ color: '#C8793A' }}>trivenisangamdialogues@gmail.com</a>.
        </p>

      </div>
    </div>
  );
};

export default TermsOfService;
