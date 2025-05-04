// Environment configuration helper

/**
 * Determine the API base URL based on environment
 * - In development, use relative URLs to the Express server
 * - In production (Netlify), use Netlify Functions
 */
export const getApiBaseUrl = (): string => {
  // Check if we're running in production or development
  const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';
  
  // In production (on Netlify), use Netlify Functions
  if (isProduction) {
    return '/.netlify/functions';
  }
  
  // In development, use the relative Express endpoint
  return '/api';
};

/**
 * Get the full API endpoint URL for a specific resource
 * @param endpoint The API endpoint path (without leading slash)
 * @returns The full URL for the API endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  // For the generate-tags endpoint, handle it specially
  if (endpoint === 'generate-tags') {
    const baseUrl = getApiBaseUrl();
    
    // In production, Netlify Functions are accessed directly
    if (baseUrl.includes('/.netlify/functions')) {
      return `${baseUrl}/generate-tags`;
    }
    
    // In development, use Express endpoint with '/api' prefix
    return `/api/${endpoint}`;
  }
  
  // For other endpoints
  return `${getApiBaseUrl()}/${endpoint}`;
};