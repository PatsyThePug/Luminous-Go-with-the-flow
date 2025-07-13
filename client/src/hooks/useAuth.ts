import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    staleTime: 0, // Always check authentication status
    refetchOnWindowFocus: false,
  });

  // User is authenticated only if we have user data and no 401 error
  const isAuthenticated = !!user && !error;
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('Auth status:', { user: !!user, error: !!error, isAuthenticated, isLoading });
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
  };
}
