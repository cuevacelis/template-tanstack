import { createFileRoute, Link } from '@tanstack/react-router'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import logo from '@/assets/img/logo/logo.svg'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/(not-auth)/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <img
              src={logo}
              className="size-64 pointer-events-none animate-[spin_20s_linear_infinite] drop-shadow-lg"
              alt="logo"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Plantilla de{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TanStack Start
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Una aplicación moderna construida con TanStack Router, React y Clerk
            para autenticación. Explora las funcionalidades y comienza tu viaje.
          </p>

          <SignedOut>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Comenzar Ahora
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard/demo/clerk">
                <Button size="lg" className="w-full sm:w-auto">
                  Ver Demo de Clerk
                </Button>
              </Link>
              <Link to="/dashboard/demo/convex">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Explorar Convex
                </Button>
              </Link>
            </div>
          </SignedIn>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">⚡</span>
                <span>TanStack Router</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Enrutamiento de próxima generación con type-safety completo y
                rendimiento óptimo.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🔐</span>
                <span>Clerk Auth</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Autenticación moderna con componentes preconfigurados y gestión
                de usuarios.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🎨</span>
                <span>Diseño Moderno</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Interfaz elegante con Tailwind CSS y componentes reutilizables.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <SignedOut>
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Únete a nuestra plataforma y descubre todas las funcionalidades
                que tenemos para ofrecerte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Crear Cuenta Gratis
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="default">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </SignedOut>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-gray-600 dark:text-gray-400">
            <a
              className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aprende React
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
              href="https://tanstack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aprende TanStack
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
              href="https://clerk.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aprende Clerk
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Edita{' '}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              src/routes/(not-auth)/page.tsx
            </code>{' '}
            y guarda para recargar.
          </p>
        </footer>
      </main>
    </div>
  )
}
