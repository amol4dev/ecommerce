const API_BASE_URL = (process.env.REACT_APP_API_URL || 'https://ecommerce-ta3v.onrender.com').replace(/\/$/, '');

export function configureApi() {
  const originalFetch = window.fetch.bind(window);

  window.fetch = (input, init) => {
    if (typeof input === 'string' && input.startsWith('/api/')) {
      input = `${API_BASE_URL}${input}`;
    }

    return originalFetch(input, init);
  };
}