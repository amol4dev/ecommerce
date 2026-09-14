import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';
import { useLocation } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryBanner, setCategoryBanner] = useState(null);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');
  const searchParam = queryParams.get('search') || '';

  const [search, setSearch] = useState(searchParam);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch category banner when categoryFilter changes
  useEffect(() => {
    const fetchCategoryBanner = async () => {
      if (!categoryFilter) {
        setCategoryBanner(null);
        return;
      }
      try {
        const res = await fetch(`/api/category-banners/${encodeURIComponent(categoryFilter)}`);
        if (res.ok) {
          const data = await res.json();
          setCategoryBanner(data);
        } else {
          setCategoryBanner(null);
        }
      } catch (err) {
        console.error("Failed to fetch category banner", err);
        setCategoryBanner(null);
      }
    };
    fetchCategoryBanner();
  }, [categoryFilter]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="shop-container">
      
      {/* Category Banner Display */}
      {categoryBanner && (
        <div style={{ marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(180,100,40,0.1)' }}>
          <picture>
            <source media="(max-width: 768px)" srcSet={categoryBanner.mobileImage} />
            <source media="(min-width: 769px)" srcSet={categoryBanner.desktopImage} />
            <img 
              src={categoryBanner.desktopImage} 
              alt={`${categoryFilter} Banner`} 
              style={{ width: '100%', display: 'block', objectFit: 'cover' }} 
            />
          </picture>
        </div>
      )}

      <h2>{categoryFilter ? `${categoryFilter} Products` : 'All Products'}</h2>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#C8793A' }}>Loading...</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
             <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#9a6a44', padding: '40px' }}>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
