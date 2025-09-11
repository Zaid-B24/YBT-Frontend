// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Application Constants
export const APP_NAME = 'Young Boy Toyz';
export const APP_VERSION = '1.0.0';

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  MODELS: '/models',
  COLLECTIONS: '/collections',
  RENTALS: '/rentals',
  AUCTIONS: '/auctions',
  EVENTS: '/events',
  MERCHANDISE: '/merchandise',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  FAQ: '/faq',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  ORDERS: '/orders',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  PRIVACY: '/privacy',
  IMPRINT: '/imprint'
};

// Theme Colors
export const COLORS = {
  PRIMARY: '#22c55e',
  SECONDARY: '#16a34a',
  ACCENT: '#15803d',
  BACKGROUND: '#000000',
  SURFACE: 'rgba(255, 255, 255, 0.02)',
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#cccccc',
  TEXT_MUTED: '#999999',
  BORDER: 'rgba(255, 255, 255, 0.1)',
  ERROR: '#ef4444',
  WARNING: '#fbbf24',
  SUCCESS: '#22c55e',
  INFO: '#3b82f6'
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE: '1200px',
  XLARGE: '1600px'
};

// Animation Durations
export const ANIMATIONS = {
  FAST: '0.15s',
  NORMAL: '0.3s',
  SLOW: '0.5s'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ybt_auth_token',
  USER_DATA: 'ybt_user_data',
  CART_ITEMS: 'ybt_cart_items',
  WISHLIST_ITEMS: 'ybt_wishlist_items',
  THEME_PREFERENCE: 'ybt_theme_preference'
}; 