import React from 'react';
import '../styles/trustStats.css';

const TrustStats = () => {
  return (
    <section className="trust-stats-section">
      <div className="trust-stats-grid">
        
        {/* Block 1 */}
        <div className="stat-block">
          <div className="stat-value">
            10,000+
          </div>
          <div className="stat-label">
            Households Served
          </div>
        </div>

        {/* Block 2 */}
        <div className="stat-block">
          <div className="stat-value">
            4.8 <span className="star-icon">★</span>
          </div>
          <div className="stat-label">
            Customer Rating
          </div>
        </div>

        {/* Block 3 */}
        <div className="stat-block">
          <div className="stat-value">
            100%
          </div>
          <div className="stat-label">
            Lab Certified · AstroGrade™
          </div>
        </div>

        {/* Block 4 */}
        <div className="stat-block">
          <div className="stat-value" style={{ fontSize: '1.1rem' }}>
            <span className="youtube-icon">
              <svg viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.084 0 12 0 12s0 3.916.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.376-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.916 24 12 24 12s0-3.916-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </span>
            Triveni Sangam
          </div>
          <div className="stat-label">
            Sanatan Dharma Media Platform
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustStats;
