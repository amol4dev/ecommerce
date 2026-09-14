import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { AuthContext } from '../context/AuthContext';
import '../styles/product.css';

/* ─── Star Rating Component ─── */
const StarRating = ({ rating }) => {
  return (
    <span className="pd-star-row">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? 'pd-star filled' : 'pd-star empty'}>
          ★
        </span>
      ))}
    </span>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Review states
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
      }));
      alert('Successfully added to your cart!');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
      }));
      navigate('/cart');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to write a review');
      navigate('/login');
      return;
    }
    setReviewSubmitLoading(true);
    try {
      const res = await fetch(`/api/products/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(reviewForm)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Review submitted successfully!');
        setReviewForm({ rating: 5, comment: '' });
        fetchProduct();
      } else {
        alert(data.message || 'Error submitting review');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReviewSubmitLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', margin: '100px', color: '#C8793A', fontSize: '1.2rem' }}>Loading Product...</div>;
  if (!product) return <div style={{ textAlign: 'center', margin: '100px', color: '#ef4444', fontSize: '1.2rem' }}>Product Not Found</div>;

  const displayRating = product.adminRating > 0 ? product.adminRating : product.ratings || 0;
  const displayCount = product.adminRating > 0 ? product.adminReviewCount : product.numReviews || 0;

  const discountPercent = Math.round(product.discountPercentage || 0);
  let simulatedMRP = product.price;
  let savings = 0;

  if (discountPercent > 0 && discountPercent < 100) {
    simulatedMRP = Math.round(product.price / (1 - discountPercent / 100));
    savings = simulatedMRP - product.price;
  }

  // ─── Reviews Logic ───
  const adminRevs = (product.adminReviews || []).map(r => ({ ...r, isAdmin: true }));
  const custRevs = (product.customerReviews || []).map(r => ({ ...r, isAdmin: false }));
  const allReviews = [...adminRevs, ...custRevs];

  // Top 5 reviews (shown in the expandable section)
  const topReviews = allReviews.slice(0, 5);
  // Remaining reviews (shown in paginated section)
  const remainingReviews = allReviews.slice(5);

  const reviewsPerPage = 5;
  const totalPages = Math.ceil(remainingReviews.length / reviewsPerPage);
  const currentPaginatedReviews = remainingReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="pd-wrapper">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.category}</span> / <span className="current">{product.name}</span>
      </div>

      <div className="pd-container">
        {/* Left: Image */}
        <div className="pd-image-section">
          {discountPercent > 0 && (
            <div className="pd-discount-badge">{discountPercent}% OFF</div>
          )}
          <img src={product.imageUrl} alt={product.name} className="pd-image" />
        </div>

        {/* Right: Info */}
        <div className="pd-info-section">
          <div className="pd-tags">
            {product.tagline1 && <span className="pd-tag pd-tag--green">{product.tagline1}</span>}
            {product.tagline2 && <span className="pd-tag pd-tag--amber">{product.tagline2}</span>}
          </div>

          <h1 className="pd-title">{product.name}</h1>

          {displayRating > 0 && (
            <div className="pd-rating-wrap">
              <StarRating rating={displayRating} />
              <span className="pd-rating-num">{Number(displayRating).toFixed(1)}</span>
              {displayCount > 0 && <span className="pd-rating-count">({displayCount} reviews)</span>}
            </div>
          )}

          <div className="pd-pricing-box">
            <span className="pd-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
            {discountPercent > 0 && (
              <div className="pd-mrp-box">
                <span className="pd-mrp">MRP: <strike>₹{simulatedMRP.toLocaleString('en-IN')}</strike></span>
                <span className="pd-savings">You Save: ₹{savings.toLocaleString('en-IN')}</span>
              </div>
            )}
            <p className="pd-tax-note">Inclusive of all taxes</p>
          </div>

          {/* Stock */}
          <div className="pd-stock-status">
            {product.stock > 0
              ? <span className="in-stock">● In Stock ({product.stock} units available)</span>
              : <span className="out-stock">● Temporarily Out of Stock</span>}
          </div>

          {/* Buttons */}
          <div className="pd-actions">
            <button onClick={handleAddToCart} disabled={product.stock <= 0} className="pd-btn pd-btn-secondary">Add to Cart</button>
            <button onClick={handleBuyNow} disabled={product.stock <= 0} className="pd-btn pd-btn-primary">Buy Now</button>
          </div>

          {/* Description */}
          <div className="pd-description-section">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* ═══════ Reviews Section (full width below) ═══════ */}
      <div className="pd-reviews-wrapper">
        <h3 className="pd-reviews-heading">Customer & Expert Reviews</h3>

        {/* Top Reviews (expandable) */}
        {allReviews.length > 0 ? (
          <div className="pd-top-reviews-block">
            {/* Always show first review */}
            <ReviewCard rev={allReviews[0]} />

            {/* Expand/collapse button */}
            {topReviews.length > 1 && (
              <button className="pd-expand-btn" onClick={() => setReviewsExpanded(!reviewsExpanded)}>
                {reviewsExpanded
                  ? <span>▲ Show Less</span>
                  : <span>▼ View {topReviews.length - 1} More Top Review{topReviews.length > 2 ? 's' : ''}</span>
                }
              </button>
            )}

            {/* Expanded reviews (2-5) */}
            {reviewsExpanded && topReviews.slice(1).map((rev, idx) => (
              <ReviewCard key={idx} rev={rev} />
            ))}
          </div>
        ) : (
          <p className="pd-no-reviews">No reviews yet. Be the first to review this product!</p>
        )}

        {/* Paginated remaining reviews */}
        {remainingReviews.length > 0 && (
          <div className="pd-paginated-block">
            <h4 className="pd-more-heading">More Reviews</h4>
            {currentPaginatedReviews.map((rev, idx) => (
              <ReviewCard key={idx} rev={rev} />
            ))}

            {totalPages > 1 && (
              <div className="pd-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`pd-page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Write a Review Form */}
        <div className="pd-review-form-wrap">
          <h4>Write a Review</h4>
          {user ? (
            <form onSubmit={handleReviewSubmit} className="pd-review-form">
              <div className="pd-form-group">
                <label>Your Rating</label>
                <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}>
                  <option value="5">★★★★★ — Excellent</option>
                  <option value="4">★★★★☆ — Very Good</option>
                  <option value="3">★★★☆☆ — Good</option>
                  <option value="2">★★☆☆☆ — Fair</option>
                  <option value="1">★☆☆☆☆ — Poor</option>
                </select>
              </div>
              <div className="pd-form-group">
                <label>Your Comment</label>
                <textarea
                  required rows="3"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Share your experience with this product..."
                />
              </div>
              <button type="submit" disabled={reviewSubmitLoading} className="pd-submit-review-btn">
                {reviewSubmitLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <div className="pd-login-prompt">
              <p>Please <span onClick={() => navigate('/login')} style={{ color: '#C8793A', cursor: 'pointer', fontWeight: 700, textDecoration: 'underline' }}>log in</span> to write a review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Review Card Component ─── */
const ReviewCard = ({ rev }) => (
  <div className={`pd-review-card ${rev.isAdmin ? 'pd-review-admin' : ''}`}>
    <div className="pd-review-meta">
      <span className="pd-reviewer-name">
        {rev.isAdmin && <span className="pd-admin-badge">Expert</span>}
        {rev.name}
      </span>
      <StarRating rating={rev.rating} />
    </div>
    <p className="pd-review-comment">"{rev.comment}"</p>
  </div>
);

export default ProductDetail;
