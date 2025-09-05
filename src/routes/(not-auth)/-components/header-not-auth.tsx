import { Link } from '@tanstack/react-router'
import logo from '@/assets/img/logo/logo.svg'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'

export default function HeaderNotAuth() {
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} className="h-8 w-8" alt="logo" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Plantilla TanStack Start
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Registrarse</Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8',
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}
