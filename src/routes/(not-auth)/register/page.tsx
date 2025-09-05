import { createFileRoute } from '@tanstack/react-router'
import { SignUp, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(not-auth)/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <SignUp signInUrl="/login" />
        </div>
      </SignedOut>
    </>
  )
}
