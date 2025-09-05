import { createFileRoute, Outlet } from '@tanstack/react-router'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { SidebarLoggedComponent } from '@/routes/(auth)/-components/sidebar-logged/sidebar-logged'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { formatDateTime } from '@/lib/utils/date-utils'

/**
 * Defines the route for pages that require authentication.
 * Uses the LayoutAuth component as the main layout.
 * Handles authentication and permission checks before loading the route.
 */
export const Route = createFileRoute('/(auth)')({
  component: LayoutAuth,
})

/**
 * Layout for authenticated routes.
 * Provides sidebar, top bar, and footer for the main application layout.
 * Renders the React Router Outlet component to display child routes.
 * @returns The layout for authenticated routes.
 */
function LayoutAuth() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useLocalStorage<boolean>('isSidebarOpen')

  return (
    <SidebarProvider
      open={isSidebarOpen}
      onOpenChange={(open) => {
        setIsSidebarOpen(open)
      }}
    >
      <SidebarLoggedComponent />
      <SidebarInset className="bg-transparent mx-1 lg:max-w-[calc(100vw-var(--sidebar-width)-20px)] peer-data-[state=collapsed]:max-w-[calc(100vw-var(--sidebar-width-icon)-40px)]">
        <Outlet />
        <footer className="mt-4 w-full p-2 text-center text-sm bg-linear-to-t from-gray-100 via-gray-100 to-transparent dark:from-transparent dark:via-transparent dark:to-transparent">
          <div className="relative">
            <p className="text-sm text-muted-foreground">
              ©
              {formatDateTime({
                format: 'yyyy',
              })}{' '}
              Template TanStack
            </p>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
