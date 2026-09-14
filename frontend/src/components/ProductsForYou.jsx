import React from 'react';
import ProductCard from './ProductCard';

const ProductsForYou = ({ products, loading }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', color: '#2c1a0e', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>Products For You</h2>
          <p style={{ color: '#C8793A', margin: '8px 0 0', fontSize: '1.1rem', fontWeight: '500' }}>Curated selections just for you</p>
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#C8793A' }}>Loading...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsForYou;
