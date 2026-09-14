import React from 'react';
import '../styles/youtubeShowcase.css';

const videos = [
  {
    id: 'THBfWsFaR1I',
    title: 'Discover the Magic of Triveni Sangam',
    url: 'https://www.youtube.com/watch?v=THBfWsFaR1I'
  },
  {
    id: '9QBhmAMwhG4',
    title: 'Spiritual Journey and Awakening',
    url: 'https://www.youtube.com/watch?v=9QBhmAMwhG4'
  },
  {
    id: '3RgKcLxF7fU',
    title: 'Embracing Sanatan Traditions',
    url: 'https://www.youtube.com/watch?v=3RgKcLxF7fU'
  }
];

const YouTubeShowcase = () => {
  return (
    <section className="yt-showcase-section">
      <div className="yt-showcase-container">
        
        <div className="yt-header">
          <h2 className="yt-heading">Featured Dialogues</h2>
          <div className="yt-rule"></div>
          <p className="yt-subheading">Watch our latest discussions and spiritual insights.</p>
        </div>

        <div className="yt-grid">
          {videos.map((video) => (
            <div key={video.id} className="yt-card">
              <div className="yt-thumbnail-wrapper">
                <img 
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                  alt={video.title} 
                  className="yt-thumbnail" 
                />
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="yt-play-overlay">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="yt-play-icon">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
              <div className="yt-content">
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="yt-watch-btn">
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default YouTubeShowcase;
