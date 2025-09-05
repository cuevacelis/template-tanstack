import { Navigate, createFileRoute } from '@tanstack/react-router'
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

export const Route = createFileRoute('/(not-auth)/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
          <SignIn signUpUrl="/register" />
        </div>
      </SignedOut>
    </>
  )
}
