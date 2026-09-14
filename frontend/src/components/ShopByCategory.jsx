import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shopByCategory.css';

const categories = [
  {
    name: 'Rudraksha',
    link: '/shop?category=Rudraksha',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.4 8.2L21 9L15.8 13.4L17.5 19.8L12 16.3L6.5 19.8L8.2 13.4L3 9L9.6 8.2L12 2Z"/>
      </svg>
    )
  },
  {
    name: 'Pooja Thali & Samagri',
    link: '/shop?category=Pooja%20Thali%20%26%20Samagri',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"/>
      </svg>
    )
  },
  {
    name: 'Idols & Murtis',
    link: '/shop?category=Idols%20%26%20Murtis',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"/>
      </svg>
    )
  },
  {
    name: 'Photos & Frames',
    link: '/shop?category=Photos%20%26%20Frames',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
      </svg>
    )
  },
  {
    name: 'Gemstones',
    link: '/shop?category=Gemstones',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-9-9 4-8h10l4 8-9 9z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V12"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4l5 8 5-8"/>
      </svg>
    )
  },
  {
    name: 'Books',
    link: '/shop?category=Books',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
      </svg>
    )
  }
];

const ShopByCategory = () => {
  return (
    <section className="shop-by-category-section">
      <div className="sbc-header">
        <p className="sbc-eyebrow">Find Your Purpose</p>
        <h2 className="sbc-title">Shop by Category</h2>
        <div className="sbc-divider"></div>
        <p className="sbc-subheading">Choose what calls to you.</p>
      </div>

      <div className="sbc-grid">
        {categories.map((cat, idx) => (
          <Link key={idx} to={cat.link} className="sbc-card">
            <div className="sbc-icon-wrapper">
              {cat.icon}
            </div>
            <h3 className="sbc-name">{cat.name}</h3>
            <span className="sbc-explore">Explore</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
