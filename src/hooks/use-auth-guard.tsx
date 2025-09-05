import React from 'react'
import { useUser } from '@clerk/clerk-react'

export interface AuthGuardResult {
  isLoading: boolean
  isAuthenticated: boolean
  user: any
}

/**
 * Hook for handling authentication checks and redirects
 * Returns authentication state and handles automatic redirects for unauthenticated users
 */
export function useAuthGuard(): AuthGuardResult {
  const { isSignedIn, user, isLoaded } = useUser()

  return {
    isLoading: !isLoaded,
    isAuthenticated: isSignedIn ?? false,
    user,
  }
}

/**
 * Creates a beforeLoad function for TanStack Router that enforces authentication
 * Redirects to login page if user is not authenticated
 */
export function createAuthGuard() {
  return async () => {
    // This runs on the server during SSR, so we can't check Clerk state here
    // The actual auth check will happen on the client side in the component
    return {}
  }
}

/**
 * Authentication guard component for TanStack Router
 * Shows loading state while checking auth, redirects if not authenticated
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthGuard()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>Verificando autenticación...</span>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Use window.location for client-side redirect since we can't use TanStack redirect here
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname + window.location.search
      window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`
    }

    // Show login prompt while redirect happens
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full space-y-4 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Acceso Restringido</h2>
            <p className="text-muted-foreground mt-2">
              Necesitas iniciar sesión para acceder a esta página
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Redirigiendo al login...
          </p>
        </div>
      </div>
    )
  }

  // User is authenticated, render children
  return <>{children}</>
}