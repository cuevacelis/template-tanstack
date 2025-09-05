import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import ClerkProvider from '../context/clerk/provider'
import ConvexProvider from '../context/convex/provider'
import appCss from '../styles/index.css?url'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@/context/theme/theme-provider'
import {
  ErrorBoundary,
  AuthErrorFallback,
} from '@/components/ui/error-boundary'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Template TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <ErrorBoundary fallback={AuthErrorFallback}>
          <ClerkProvider>
            <ThemeProvider defaultTheme="system">
              <ConvexProvider>
                {children}
                <TanStackDevtools
                  config={{
                    position: 'bottom-left',
                  }}
                  plugins={[
                    {
                      name: 'Tanstack Router',
                      render: <TanStackRouterDevtoolsPanel />,
                    },
                    {
                      name: 'Tanstack Query',
                      render: <ReactQueryDevtoolsPanel />,
                    },
                  ]}
                />
              </ConvexProvider>
            </ThemeProvider>
          </ClerkProvider>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  )
}
