import { createFileRoute } from '@tanstack/react-router'
import { useUser, useAuth } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/(auth)/dashboard/demo/clerk')({
  component: App,
})

function App() {
  const { isSignedIn, user, isLoaded } = useUser()
  const { getToken, signOut } = useAuth()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Cargando...</span>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>
              Necesitas iniciar sesión para ver esta página
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Esta es una página protegida que requiere autenticación.
            </p>
            <Button asChild className="w-full">
              <a href="/login">Iniciar Sesión</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleGetToken = async () => {
    try {
      const token = await getToken()
      console.log('Token de sesión:', token)
      alert('Token obtenido exitosamente. Revisa la consola para ver el token.')
    } catch (error) {
      console.error('Error obteniendo token:', error)
      alert('Error obteniendo el token de sesión')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error cerrando sesión:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Demo de Clerk Authentication
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Información de usuario y funcionalidades disponibles
            </p>
          </div>

          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>👋</span>
                <span>¡Bienvenido, {user.firstName}!</span>
              </CardTitle>
              <CardDescription>
                Has iniciado sesión exitosamente con Clerk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                {user.imageUrl && (
                  <img
                    src={user.imageUrl}
                    alt="Avatar del usuario"
                    className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                  {user.username && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{user.username}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Información del Usuario</CardTitle>
              <CardDescription>
                Datos disponibles desde Clerk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ID de Usuario:
                  </label>
                  <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    {user.id}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nombre de Usuario:
                  </label>
                  <p className="text-sm">
                    {user.username || (
                      <span className="text-gray-500 italic">No configurado</span>
                    )}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Direcciones de Email:
                  </label>
                  <div className="space-y-2">
                    {user.emailAddresses.map((email) => (
                      <div key={email.id} className="flex items-center space-x-2">
                        <span className="text-sm">{email.emailAddress}</span>
                        {email.id === user.primaryEmailAddress?.id && (
                          <Badge variant="secondary" className="text-xs">
                            Primario
                          </Badge>
                        )}
                        {email.verification?.status === 'verified' && (
                          <Badge variant="outline" className="text-xs text-green-600">
                            ✓ Verificado
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Fecha de Creación:
                    </label>
                    <p className="text-sm">
                      {user.createdAt?.toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Última Actualización:
                    </label>
                    <p className="text-sm">
                      {user.updatedAt?.toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>🛠️ Acciones Disponibles</CardTitle>
              <CardDescription>
                Funciones que puedes realizar con Clerk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button onClick={handleGetToken} variant="outline" className="w-full">
                  🔑 Obtener Token de Sesión
                </Button>
                <Button 
                  onClick={handleSignOut} 
                  variant="destructive" 
                  className="w-full"
                >
                  🚪 Cerrar Sesión
                </Button>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  💡 Consejos:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                  <li>• El token de sesión se imprime en la consola del navegador</li>
                  <li>• Puedes usar este token para autenticar llamadas API</li>
                  <li>• El UserButton en la esquina superior derecha te da más opciones</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
