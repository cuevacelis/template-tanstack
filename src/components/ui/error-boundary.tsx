import React from 'react'
import { Button } from './button'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

/**
 * Default error fallback component
 */
function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>Error de Aplicación</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-mono text-destructive">
                {error.message}
              </p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-muted-foreground">
                    Ver stack trace
                  </summary>
                  <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div className="flex space-x-2">
            <Button onClick={resetError} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/')}
              className="flex-1"
            >
              Ir al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Error boundary component for React error handling
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const ErrorFallback = this.props.fallback || DefaultErrorFallback

      return (
        <ErrorFallback
          error={this.state.error}
          resetError={() =>
            this.setState({ hasError: false, error: undefined })
          }
        />
      )
    }

    return this.props.children
  }
}

/**
 * Authentication-specific error fallback
 */
export function AuthErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>Error de Autenticación</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Ha ocurrido un problema con la autenticación. Por favor, intenta
            iniciar sesión nuevamente.
          </p>

          <div className="flex space-x-2">
            <Button
              onClick={() => (window.location.href = '/login')}
              className="flex-1"
            >
              Iniciar Sesión
            </Button>
            <Button variant="outline" onClick={resetError} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Hook for using error boundary functionality in functional components
 */
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const throwError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  if (error) {
    throw error
  }

  return { throwError, resetError }
}
