import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(search)}`);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // User Dropdown Content to avoid duplication
  const UserDropdownContent = () => (
    <div className="navbar-user-dropdown">
      {user ? (
        <>
          <p className="dropdown-username">Hi, {user.name}</p>
          <Link to="/profile" onClick={() => setShowUserMenu(false)}>My Profile</Link>
          {user.role === 'admin' && <Link to="/admin" onClick={() => setShowUserMenu(false)}>Admin Panel</Link>}
          <button onClick={handleLogout} className="dropdown-logout">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={() => setShowUserMenu(false)}>Login</Link>
          <Link to="/register" onClick={() => setShowUserMenu(false)}>Register</Link>
        </>
      )}
    </div>
  );

  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="navbar-brand">
        <Link to="/">
          <img src="/triveni.png" alt="Triveni Sangam Dialogues" className="navbar-logo" />
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">TriveniSangam</span>
            <span className="navbar-brand-tagline">Dialogues</span>
          </div>
        </Link>
      </div>

      {/* Desktop Category Links */}
      <ul className="navbar-links desktop-only">
        <li><Link to="/shop?category=Rudraksha">Rudraksha</Link></li>
        <li><Link to="/shop?category=Pooja%20Thali%20%26%20Samagri">Pooja Thali & Samagri</Link></li>
        <li><Link to="/shop?category=Idols%20%26%20Murtis">Idols & Murtis</Link></li>
        <li><Link to="/shop?category=Photos%20%26%20Frames">Photos & Frames</Link></li>
        <li><Link to="/shop?category=Gemstones">Gemstones</Link></li>
        <li><Link to="/shop?category=Books">Books</Link></li>
      </ul>

      {/* Desktop Right Cluster */}
      <div className="navbar-right desktop-only">
        <form onSubmit={handleSearch} className="navbar-search-form">
          <div className="navbar-search">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search rituals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>

        <div className="navbar-user-wrapper">
          <button className="navbar-user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="navbar-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </button>
          {showUserMenu && <UserDropdownContent />}
        </div>

        <Link to="/cart" className="navbar-cart-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#C8793A" width="26" height="26">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" />
          </svg>
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </Link>
      </div>

      {/* Mobile Header Right (Visible only on mobile) */}
      <div className="mobile-header-right">
        {user ? (
          <div className="navbar-user-wrapper">
            <button className="navbar-user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="navbar-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </button>
            {showUserMenu && <UserDropdownContent />}
          </div>
        ) : (
          <Link to="/login" className="mobile-login-btn">Login</Link>
        )}

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <div className="hamburger-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="28" height="28">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
            {!isMobileMenuOpen && cartItems.length > 0 && (
              <span className="cart-badge hamburger-badge">{cartItems.length}</span>
            )}
          </div>
        </button>
      </div>

      {/* Mobile Expanded Menu */}
      <div className={`mobile-expanded-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <form onSubmit={handleSearch} className="navbar-search-form mobile-search">
          <div className="navbar-search">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search rituals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        
        <ul className="mobile-nav-links">
          <li><Link to="/shop?category=Rudraksha" onClick={() => setIsMobileMenuOpen(false)}>Rudraksha</Link></li>
          <li><Link to="/shop?category=Pooja%20Thali%20%26%20Samagri" onClick={() => setIsMobileMenuOpen(false)}>Pooja Thali & Samagri</Link></li>
          <li><Link to="/shop?category=Idols%20%26%20Murtis" onClick={() => setIsMobileMenuOpen(false)}>Idols & Murtis</Link></li>
          <li><Link to="/shop?category=Photos%20%26%20Frames" onClick={() => setIsMobileMenuOpen(false)}>Photos & Frames</Link></li>
          <li><Link to="/shop?category=Gemstones" onClick={() => setIsMobileMenuOpen(false)}>Gemstones</Link></li>
          <li><Link to="/shop?category=Books" onClick={() => setIsMobileMenuOpen(false)}>Books</Link></li>
        </ul>

        <Link to="/cart" className="mobile-cart-link" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-cart-content">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#C8793A" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" />
            </svg>
            <span>View Cart</span>
            {cartItems.length > 0 && <span className="mobile-cart-count">{cartItems.length}</span>}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
