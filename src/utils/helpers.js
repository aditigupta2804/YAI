// Utility functions for formatting and calculations

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const calculateTotalCost = (days, dailyCost, travelers) => {
  return days * dailyCost * travelers;
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const calculateDaysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getRating = (rating) => {
  return Math.min(5, Math.max(0, rating));
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('')
    .slice(0, 2);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getWeatherEmoji = (condition) => {
  const conditions = {
    'Sunny': '☀️',
    'Cloudy': '☁️',
    'Rainy': '🌧️',
    'Snowy': '❄️',
    'Windy': '💨',
    'Stormy': '⛈️',
  };
  return conditions[condition] || '🌡️';
};

// Currency utilities
const USD_TO_INR = 83; // Approximate exchange rate

export const getCurrencySymbol = (currency) => {
  return currency === 'INR' ? '₹' : '$';
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  if (fromCurrency === 'USD' && toCurrency === 'INR') {
    return Math.round(amount * USD_TO_INR);
  }
  if (fromCurrency === 'INR' && toCurrency === 'USD') {
    return Math.round(amount / USD_TO_INR);
  }
  return amount;
};

export const formatPriceWithCurrency = (amount, currency = 'USD') => {
  const symbol = getCurrencySymbol(currency);
  const formatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return `${symbol}${formatter.format(amount)}`;
};
