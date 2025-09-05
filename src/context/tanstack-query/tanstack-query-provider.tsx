import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function tanstackQueryGetContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Cache data for 5 minutes before considering it stale
        staleTime: 5 * 60 * 1000,
        // Keep unused data in cache for 10 minutes before garbage collecting
        gcTime: 10 * 60 * 1000,
        // Don't refetch on window focus to avoid unnecessary requests
        refetchOnWindowFocus: false,
        // Refetch when network reconnects
        refetchOnReconnect: true,
        // Smart retry logic: don't retry 404s, retry others up to 3 times
        retry: (failureCount, error: any) => {
          // Don't retry on 404 or other client errors
          if (error?.status >= 400 && error?.status < 500) {
            return false
          }
          // Retry up to 3 times for server errors or network issues
          return failureCount < 3
        },
        // Exponential backoff for retries
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        // Retry mutations once on failure
        retry: 1,
        // Quick retry for mutations
        retryDelay: 1000,
      },
    },
  })
  return {
    queryClient,
  }
}

export function TanstackQueryProvider({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
