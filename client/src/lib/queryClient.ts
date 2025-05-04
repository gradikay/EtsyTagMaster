import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Helper function to determine if we're in a production environment
const isProduction = (): boolean => {
  return window.location.hostname !== 'localhost' && 
         window.location.hostname !== '127.0.0.1';
};

// Function to get the correct API URL based on environment
const getApiUrl = (url: string): string => {
  // If it's already a full URL, return it as is
  if (url.startsWith('http')) {
    return url;
  }
  
  // For API endpoints, route to Netlify Functions in production
  if (url.startsWith('/api/')) {
    return isProduction() 
      ? `/.netlify/functions/api${url.replace('/api', '')}`
      : url;
  }
  
  // Default case - return URL as is
  return url;
};

export async function apiRequest<T = any>({
  method,
  url,
  body,
}: {
  method: string;
  url: string;
  body?: unknown | undefined;
}): Promise<T> {
  // Get the correct API URL based on environment
  const apiUrl = getApiUrl(url);
  
  const res = await fetch(apiUrl, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Get the correct API URL based on environment
    const apiUrl = getApiUrl(queryKey[0] as string);
    
    const res = await fetch(apiUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
