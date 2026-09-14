import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css';

/* ─── Star Rating ───────────────────────────────────────────────────── */
const StarRating = ({ rating }) => {
  return (
    <span className="star-row">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= Math.round(rating) ? 'star filled' : 'star empty'}
        >
          ★
        </span>
      ))}
    </span>
  );
};

/* ─── Cart Toast ────────────────────────────────────────────────────── */
const CartToast = ({ show, productName }) => (
  <div className={`cart-toast ${show ? 'cart-toast--visible' : ''}`}>
    <span className="cart-toast__icon">🛒</span>
    <div className="cart-toast__text">
      <strong>Added to cart!</strong>
      <span>{productName}</span>
    </div>
  </div>
);

/* ─── ProductCard ───────────────────────────────────────────────────── */
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [toastVisible, setToastVisible] = useState(false);

  const {
    _id, name, price, imageUrl,
    tagline1, tagline2,
    adminRating = 0, adminReviewCount = 0,
    ratings = 0, numReviews = 0,
    badgeText, category, discountPercentage = 0,
  } = product;

  const existingItem = cartItems.find((x) => x.productId === _id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      productId: _id, name, price, imageUrl,
      qty: existingItem ? existingItem.qty + 1 : 1,
    }));
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const badge = badgeText || category || null;
  const displayRating = adminRating > 0 ? adminRating : ratings;
  const displayCount = adminRating > 0 ? adminReviewCount : numReviews;
  
  // Calculate MRP based on admin-defined discount percentage
  const discountPercent = Math.round(discountPercentage);
  let simulatedMRP = price;
  let savings = 0;
  
  if (discountPercent > 0 && discountPercent < 100) {
    simulatedMRP = Math.round(price / (1 - discountPercent / 100));
    savings = simulatedMRP - price;
  }

  return (
    <>
      <CartToast show={toastVisible} productName={name} />

      <div className="pc-card" onClick={() => navigate(`/product/${_id}`)}>
        
        {/* Image Section (Square) */}
        <div className="pc-img-wrap">
          {discountPercent > 0 && (
            <div className="pc-discount-badge">{discountPercent}% OFF</div>
          )}
          <img src={imageUrl} alt={name} className="pc-img" />
        </div>

        {/* Card Body */}
        <div className="pc-body">
          
          {/* Rating */}
          {displayRating > 0 && (
            <div className="pc-rating">
              <StarRating rating={displayRating} />
              <span className="pc-rating__num">{Number(displayRating).toFixed(1)}</span>
              {displayCount > 0 && (
                <span className="pc-rating__count">({displayCount.toLocaleString()})</span>
              )}
            </div>
          )}

          {/* Product Name */}
          <h3 className="pc-name" title={name}>{name}</h3>

          {/* Pricing Row */}
          <div className="pc-pricing">
            <span className="pc-price">₹{Number(price).toLocaleString('en-IN')}</span>
            {discountPercent > 0 && (
              <>
                <span className="pc-mrp">MRP ₹{simulatedMRP.toLocaleString('en-IN')}</span>
                <span className="pc-savings">Save ₹{savings.toLocaleString('en-IN')}</span>
              </>
            )}
          </div>

          {/* Tagline pills (if any) */}
          {(tagline1 || tagline2) && (
            <div className="pc-tags">
              {tagline1 && <span className="pc-tag pc-tag--green">{tagline1}</span>}
              {tagline2 && <span className="pc-tag pc-tag--amber">{tagline2}</span>}
            </div>
          )}

          {/* AstroGrade Badge */}
          {badge && <div className="pc-badge-text">{badge}</div>}

          {/* Add to Cart */}
          <button
            id={`add-to-cart-${_id}`}
            className="pc-btn"
            onClick={handleAddToCart}
          >
            {existingItem ? 'Update Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
