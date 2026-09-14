import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setBanners(data);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // 5 seconds per slide
    
    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) {
    return (
      <div style={S.fallbackBanner}>
        <h1 style={{ color: '#5a2d0c', fontSize: '2.5rem', marginBottom: '10px' }}>Welcome to Triveni Sangam Dialogues</h1>
        <p style={{ color: '#7a3d10', fontSize: '1.2rem' }}>Discover the best spiritual products at unbeatable prices.</p>
      </div>
    );
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={S.carouselContainer}>
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          style={{
            ...S.slide,
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          {/* Responsive Background Image */}
          <picture>
            <source media="(max-width: 768px)" srcSet={banner.mobileImage} />
            <source media="(min-width: 769px)" srcSet={banner.desktopImage} />
            <img src={banner.desktopImage} alt={banner.title || 'Ad Banner'} style={S.image} />
          </picture>

          {/* Ad banners: pure image, no overlay or text */}
          {!banner.isAdBanner && (
            <>
              {/* Gradient Overlay for Text Readability */}
              <div style={S.overlay}></div>

              {/* Text Content */}
              <div style={S.content}>
                <h1 style={S.title}>{banner.title}</h1>
                <div style={S.taglineWrapper}>
                  <span style={S.tagline}>{banner.tagline}</span>
                </div>
                {banner.btnLink && banner.btnText && (
                  <Link to={banner.btnLink} style={S.ctaBtn}>{banner.btnText}</Link>
                )}
              </div>
            </>
          )}
        </div>
      ))}

      {/* Navigation Dots */}
      {banners.length > 1 && (
        <div style={S.dotsContainer}>
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              style={{
                ...S.dot,
                background: index === currentIndex ? '#C8793A' : 'rgba(255,255,255,0.6)',
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const S = {
  carouselContainer: {
    position: 'relative',
    width: '100%',
    flex: 1,
    minHeight: '250px',
    overflow: 'hidden',
    background: '#fdf0e6',
    boxShadow: '0 4px 10px rgba(180, 100, 40, 0.05)',
    marginBottom: '0'
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 0.8s ease-in-out',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(253, 240, 230, 0.9) 0%, rgba(253, 240, 230, 0.4) 50%, rgba(253, 240, 230, 0.1) 100%)',
    zIndex: 1
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '8%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    maxWidth: '600px',
    padding: '20px'
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '800',
    color: '#3d1f0a',
    margin: '0 0 16px 0',
    lineHeight: '1.15',
    textShadow: '0 2px 10px rgba(255,255,255,0.5)'
  },
  taglineWrapper: {
    marginBottom: '32px'
  },
  tagline: {
    background: '#fdfcf8',
    color: '#9a6a44',
    padding: '8px 16px',
    borderRadius: '999px',
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    fontWeight: '600',
    display: 'inline-block',
    border: '1px solid #f0dcc8',
    boxShadow: '0 4px 12px rgba(180, 100, 40, 0.08)'
  },
  ctaBtn: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #C8793A, #a85e28)',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '700',
    textDecoration: 'none',
    boxShadow: '0 8px 20px rgba(200, 121, 58, 0.35)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px',
    zIndex: 3
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '1px solid rgba(200, 121, 58, 0.4)',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s ease'
  },
  fallbackBanner: {
    padding: '80px 20px',
    textAlign: 'center',
    background: '#fdf0e6',
    borderBottom: '2px solid #f0dcc8',
    marginBottom: '40px'
  }
};

export default BannerCarousel;
