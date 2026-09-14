import React from 'react';
import '../styles/ytChannel.css';

const AboutContact = () => {
  return (
    <div className="about-contact-section" style={{ background: '#FDFCF8', padding: '80px 20px' }}>
      <div className="ac-super-container">

        {/* ── Featured Media Channel (LEFT/RIGHT structure inside) ── */}
        <div className="yt-showcase-box">

          {/* LEFT: Channel Card */}
          <div className="yt-channel-card">
            <div className="yt-badge-top">
              <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>

            <img src="/ytpic.jpg" alt="Triveni Sangam Dialogues" className="yt-logo-circle" />

            <div className="yt-channel-title">
              Triveni Sangam
              <svg className="yt-verified" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
              </svg>
            </div>

            <div className="yt-official-label">
              <span className="yt-dot"></span> Official Channel
            </div>

            <div className="yt-stats-row">
              <div className="yt-stat">
                <span className="yt-stat-num">180K+</span>
                <span className="yt-stat-label">Subscribers</span>
              </div>
              <div className="yt-stat">
                <span className="yt-stat-num">529+</span>
                <span className="yt-stat-label">Videos</span>
              </div>
            </div>

            <a href="https://www.youtube.com/@TriveniSangamDialogues" target="_blank" rel="noreferrer" className="yt-sub-btn">
              <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              Subscribe Channel
            </a>
          </div>

          {/* RIGHT: Description */}
          <div className="yt-desc-block">
            <span className="yt-eyebrow">Featured Media Channel</span>
            <h2 className="yt-heading-text">Triveni Sangam Dialogues</h2>
            <div className="yt-desc-rule"></div>

            <p className="yt-paragraph">
              Discover the profound depths of Sanatan Dharma through engaging storytelling, scriptural analysis, and practical philosophy. Our channel brings ancient wisdom to modern life.
            </p>
            <p className="yt-paragraph">
              From the science behind daily rituals to untold stories of our epics, join our growing community as we embark on a journey of spiritual awakening and cultural pride.
            </p>

            <div className="yt-pills">
              <div className="yt-pill">
                <svg className="yt-pill-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <div className="yt-pill-text">
                  <span className="yt-pill-stat">Spiritual Stories</span>
                  <span className="yt-pill-sub">Core Topics</span>
                </div>
              </div>
              <div className="yt-pill">
                <svg className="yt-pill-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="yt-pill-text">
                  <span className="yt-pill-stat">Verified Brand</span>
                  <span className="yt-pill-sub">Official Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Contact Us Form ── */}
        <div className="ac-contact" style={{ flex: '1 1 350px', padding: '30px', background: '#fff', borderRadius: '20px', border: '1px solid #f0dcc8', boxShadow: '0 8px 32px rgba(180, 100, 40, 0.08)' }}>
          <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0', color: '#5a2d0c', fontFamily: "'Playfair Display', serif" }}>Contact Us</h2>
          <p style={{ color: '#9a6a44', marginBottom: '25px', fontSize: '1.05rem' }}>We'd love to hear from you. Send us a message.</p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#7a3d10', fontWeight: '600', fontSize: '0.9rem' }}>Name</label>
              <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: '12px 15px', border: '1.5px solid #e8d0b0', borderRadius: '8px', background: '#fffaf5', fontSize: '1rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#7a3d10', fontWeight: '600', fontSize: '0.9rem' }}>Email</label>
              <input type="email" placeholder="Your Email" required style={{ width: '100%', padding: '12px 15px', border: '1.5px solid #e8d0b0', borderRadius: '8px', background: '#fffaf5', fontSize: '1rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#7a3d10', fontWeight: '600', fontSize: '0.9rem' }}>Message</label>
              <textarea placeholder="How can we help?" rows="4" required style={{ width: '100%', padding: '12px 15px', border: '1.5px solid #e8d0b0', borderRadius: '8px', background: '#fffaf5', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" style={{ padding: '14px', background: 'linear-gradient(135deg, #C8793A, #a85e28)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 12px rgba(200, 121, 58, 0.3)' }}>
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AboutContact;
