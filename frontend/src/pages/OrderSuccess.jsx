import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '50px 30px',
    background: '#fff',
    borderRadius: '16px',
    border: '1.5px solid #f0dcc8',
    boxShadow: '0 8px 32px rgba(180, 100, 40, 0.1)',
    textAlign: 'center'
  };

  return (
    <div style={{ background: '#FDFCF8', minHeight: '85vh', display: 'flex', alignItems: 'center', padding: '20px' }}>
      <div style={containerStyle}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#5a2d0c' }}>Payment Successful!</h2>
        <p style={{ color: '#7a3d10', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
          Thank you for your order. We have securely received your payment and will process your shipment shortly.
        </p>
        <Link to="/shop" className="btn">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
