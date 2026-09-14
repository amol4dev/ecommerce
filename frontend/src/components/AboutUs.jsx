import React from 'react';
import '../styles/aboutUs.css';

/* ─── Inline SVG icons — lucide-react style ─── */
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const TwitterXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.737l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
    <path d="M2 12h20"/>
  </svg>
);

const brandLinks = [
  { icon: <MailIcon />,      label: 'Email',     href: 'mailto:trivenisangamdialogues@gmail.com',                   cls: 'lnk-email' },
  { icon: <YoutubeIcon />,   label: 'YouTube',   href: 'https://www.youtube.com/@TriveniSangamDialogues',           cls: 'lnk-yt'    },
  { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/trivenisangamdialogues/',         cls: 'lnk-ig'    },
  { icon: <TwitterXIcon />,  label: 'X',         href: 'https://x.com/rishabhagarwal',                             cls: 'lnk-x'     },
  { icon: <LinkedinIcon />,  label: 'LinkedIn',  href: 'https://linkedin.com/company/triveni-sangam-dialogues',     cls: 'lnk-li'    },
];

const founderLinks = [
  { icon: <GlobeIcon />,    label: 'Portfolio', href: 'https://www.rishabhagarwal.in/',                         cls: 'lnk-email' },
  { icon: <TwitterXIcon />, label: 'X',         href: 'https://x.com/rishabhagarwal',                          cls: 'lnk-x'     },
  { icon: <LinkedinIcon />, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/rishabhagarwaliimc/',        cls: 'lnk-li'    },
  { icon: <MailIcon />,     label: 'Email',     href: 'mailto:rishabh.mbax@gmail.com',                         cls: 'lnk-email' },
];

const AboutUs = () => (
  <section className="au-section" id="about-us">

    {/* ═══════════════════════════════════
        SECTION 1 — About the Brand
    ═══════════════════════════════════ */}
    <div className="au-box">

      {/* Text wordmark */}
      <div className="au-wordmark">
        <span className="au-wm-main">TriveniSangam</span>
        <span className="au-wm-sub">Dialogues</span>
      </div>

      <h2 className="au-heading">About Us</h2>
      <div className="au-rule" />

      <div className="au-body">
        <p>
          We are dedicated to bringing the timeless essence of Indian spirituality and
          Sanatan traditions into your everyday life. Our collection is thoughtfully
          curated to help you create a deeper connection with faith, devotion, positivity,
          and inner peace.
        </p>
        <p>
          From sacred essentials to spiritual products for your home and personal journey,
          we focus on offering quality products with authenticity and care.
        </p>
        <p>
          Explore our collection today and bring the spirit of tradition, devotion, and
          positivity into your life.
        </p>
      </div>

      <div className="au-links-row">
        {brandLinks.map((l) => (
          <a key={l.label} href={l.href} className={`au-lnk ${l.cls}`}
            target="_blank" rel="noopener noreferrer" aria-label={l.label}>
            {l.icon}
            <span>{l.label}</span>
          </a>
        ))}
      </div>
    </div>

    {/* ═══════════════════════════════════
        SECTION 2 — Meet the Founder
    ═══════════════════════════════════ */}
    <div className="au-box au-box--founder">
      <p className="au-section-label">✦ Meet the Founder ✦</p>

      <div className="au-founder-layout">

        {/* Avatar */}
        <div className="au-avatar-wrap">
          <img
            src="/rishabh.png"
            alt="Rishabh Agarwal"
            className="au-avatar-img"
          />
        </div>

        {/* Details */}
        <div className="au-founder-info">
          <h3 className="au-founder-name">Rishabh Agarwal</h3>
          <p className="au-founder-title">
            IIT–IIM Alumnus &nbsp;|&nbsp; Author &nbsp;|&nbsp; Entrepreneur &nbsp;|&nbsp; Speaker
          </p>
          <p className="au-founder-book">
            📚 Author of multiple books, including <em>Gurutvakarshna to Gravity</em>
          </p>
          <p className="au-founder-bio">
            AI Transformation | Founder, FaxLab AI | 20+ Years in EPC &amp; Supply Chain Leadership |
            Guest Faculty &amp; Keynote Speaker | Founder, Triveni Sangam Dialogues{' '}
            <strong>(🎥 150K+ Community)</strong> | Board Member – IIC | IIM Calcutta
          </p>

          <div className="au-links-row">
            {founderLinks.map((l) => (
              <a key={l.label} href={l.href} className={`au-lnk ${l.cls}`}
                target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                {l.icon}
                <span>{l.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>

  </section>
);

export default AboutUs;
