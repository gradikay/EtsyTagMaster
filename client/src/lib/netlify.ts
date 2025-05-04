/**
 * Helper functions for Netlify deployment
 */

/**
 * Checks if the application is running in a Netlify environment
 */
export const isNetlify = (): boolean => {
  return process.env.NETLIFY === 'true' || 
         window.location.hostname.includes('.netlify.app');
};

/**
 * Gets the base URL for API calls
 */
export const getApiBaseUrl = (): string => {
  // In development, use the local API
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1') {
    return '/api';
  }
  
  // In production on Netlify, use the Netlify Functions
  return '/.netlify/functions/api';
};

/**
 * Transforms an API endpoint to the correct URL based on environment
 */
export const getApiUrl = (endpoint: string): string => {
  // If the endpoint already has a base URL, return it as is
  if (endpoint.startsWith('http') || endpoint.startsWith('/.netlify')) {
    return endpoint;
  }
  
  // Remove leading /api if present
  const cleanEndpoint = endpoint.startsWith('/api/') 
    ? endpoint.substring(4) 
    : endpoint.startsWith('/api') 
      ? endpoint.substring(4) 
      : endpoint.startsWith('/') 
        ? endpoint 
        : `/${endpoint}`;
        
  // Get the base URL and combine with the endpoint
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${cleanEndpoint}`;
};