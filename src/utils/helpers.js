// Utility functions for formatting and calculations

const CURRENCY_RATES = {
  USD: 1,
  INR: 83,
  EUR: 0.93,
  IDR: 15600,
  JPY: 148,
};

const CURRENCY_LOCALES = {
  USD: 'en-US',
  INR: 'en-IN',
  EUR: 'de-DE',
  IDR: 'id-ID',
  JPY: 'ja-JP',
};

export const formatCurrency = (amount, currency = 'USD') => {
  const numericAmount = Number(amount) || 0;

  return new Intl.NumberFormat(CURRENCY_LOCALES[currency] || 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'IDR' ? 0 : 0,
  }).format(numericAmount);
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
    Sunny: '☀️',
    Cloudy: '☁️',
    Rainy: '🌧️',
    Snowy: '❄️',
    Windy: '💨',
    Stormy: '⛈️',
  };
  return conditions[condition] || '🌡️';
};

export const getCurrencyForDestination = (destination) => {
  const normalized = (destination || '').toLowerCase();

  if (/india|delhi|mumbai|bangalore|kolkata|goa|kerala|chennai|jaipur|agra|uttar pradesh|tamil nadu|karnataka|hyderabad/.test(normalized)) {
    return 'INR';
  }

  if (/france|paris|lyon|nice|bordeaux|toulouse/.test(normalized)) {
    return 'EUR';
  }

  if (/indonesia|bali|jakarta|ubud|denpasar|kuta|nusa penida/.test(normalized)) {
    return 'IDR';
  }

  if (/japan|tokyo|kyoto|osaka|sapporo/.test(normalized)) {
    return 'JPY';
  }

  if (/usa|united states|new york|los angeles|san francisco|chicago|miami/.test(normalized)) {
    return 'USD';
  }

  return undefined;
};

export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'INR':
      return '₹';
    case 'EUR':
      return '€';
    case 'IDR':
      return 'Rp';
    case 'JPY':
      return '¥';
    case 'USD':
    default:
      return '$';
  }
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const numericAmount = Number(amount) || 0;
  if (fromCurrency === toCurrency) return numericAmount;
  const fromRate = CURRENCY_RATES[fromCurrency] || 1;
  const toRate = CURRENCY_RATES[toCurrency] || 1;
  const amountInUSD = numericAmount / fromRate;
  return Math.round(amountInUSD * toRate);
};

export const formatPriceWithCurrency = (amount, currency = 'USD') => {
  return formatCurrency(amount, currency);
};
