import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import BannerCarousel from '../components/BannerCarousel';
import TrustStats from '../components/TrustStats';
import ShopByCategory from '../components/ShopByCategory';
import ProductsForYou from '../components/ProductsForYou';
import AboutUs from '../components/AboutUs';
import AboutContact from '../components/AboutContact';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 8)); // Best sellers — 8 products

        // Shuffle for "Products For You"
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setAllProducts(shuffled.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ background: '#FDFCF8', minHeight: '100vh', paddingBottom: '60px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 67px)' }}>
        <BannerCarousel />
        <TrustStats />
      </div>

      {/* ── Best Sellers ── */}
      <div style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', color: '#2c1a0e', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>Best Sellers</h2>
            <p style={{ color: '#C8793A', margin: '8px 0 0', fontSize: '1.1rem', fontWeight: '500' }}>Discover our most loved products</p>
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

      {/* ── Shop by Intention / Category ── */}
      <ShopByCategory />

      {/* ── Products For You ── */}
      <ProductsForYou products={allProducts} loading={loading} />

      {/* ── About Us + Founder ── */}
      <AboutUs />

      {/* ── Contact Us Form ── */}
      <AboutContact />
    </div>
  );
};

export default Home;

