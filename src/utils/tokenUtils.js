/**
 * Token utility functions for JWT handling
 */

/**
 * Decode JWT token without verification
 * @param {string} token - JWT token to decode
 * @returns {object|null} Decoded token payload or null if invalid
 */
export const decodeToken = (token) => {
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    // JWT has three parts separated by dots: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} True if token is expired or invalid
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  // exp is in seconds, Date.now() is in milliseconds
  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  
  return currentTime >= expirationTime;
};

/**
 * Get token expiration time
 * @param {string} token - JWT token
 * @returns {Date|null} Expiration date or null if invalid
 */
export const getTokenExpiration = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return null;
  }

  return new Date(decoded.exp * 1000);
};

/**
 * Get time remaining until token expiration in milliseconds
 * @param {string} token - JWT token
 * @returns {number} Milliseconds until expiration, 0 if expired or invalid
 */
export const getTimeUntilExpiration = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return 0;
  }

  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  const timeRemaining = expirationTime - currentTime;
  
  return timeRemaining > 0 ? timeRemaining : 0;
};

/**
 * Check if token will expire soon (within threshold)
 * @param {string} token - JWT token
 * @param {number} thresholdMinutes - Minutes before expiration to trigger
 * @returns {boolean} True if token will expire soon
 */
export const willExpireSoon = (token, thresholdMinutes = 5) => {
  const timeRemaining = getTimeUntilExpiration(token);
  const thresholdMs = thresholdMinutes * 60 * 1000;
  
  return timeRemaining > 0 && timeRemaining <= thresholdMs;
};

/**
 * Validate token format
 * @param {string} token - JWT token to validate
 * @returns {boolean} True if token has valid JWT format
 */
export const isValidTokenFormat = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // JWT should have three parts separated by dots
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  // Check if each part is base64url encoded
  const base64UrlRegex = /^[A-Za-z0-9_-]+$/;
  return parts.every(part => base64UrlRegex.test(part));
};

/**
 * Get user role from token
 * @param {string} token - JWT token
 * @returns {string|null} User role or null if not found
 */
export const getRoleFromToken = (token) => {
  const decoded = decodeToken(token);
  return decoded?.role || null;
};

/**
 * Get user ID from token
 * @param {string} token - JWT token
 * @returns {number|string|null} User ID or null if not found
 */
export const getUserIdFromToken = (token) => {
  const decoded = decodeToken(token);
  return decoded?.user_id || decoded?.sub || null;
};

/**
 * Get user email from token
 * @param {string} token - JWT token
 * @returns {string|null} User email or null if not found
 */
export const getEmailFromToken = (token) => {
  const decoded = decodeToken(token);
  return decoded?.email || null;
};

/**
 * Check if token is valid (format + not expired)
 * @param {string} token - JWT token
 * @returns {boolean} True if token is valid and not expired
 */
export const isTokenValid = (token) => {
  return isValidTokenFormat(token) && !isTokenExpired(token);
};

/**
 * Get all token claims
 * @param {string} token - JWT token
 * @returns {object} Token payload with all claims
 */
export const getTokenClaims = (token) => {
  return decodeToken(token);
};

export default {
  decodeToken,
  isTokenExpired,
  getTokenExpiration,
  getTimeUntilExpiration,
  willExpireSoon,
  isValidTokenFormat,
  getRoleFromToken,
  getUserIdFromToken,
  getEmailFromToken,
  isTokenValid,
  getTokenClaims,
};
