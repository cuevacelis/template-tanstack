import { createFileRoute } from '@tanstack/react-router'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Calendar,
  Bell,
  Settings
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

export const Route = createFileRoute('/(auth)/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Hoy
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notificaciones
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingresos Totales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Suscripciones
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Activos Ahora
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 desde la última hora
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resumen General</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Crecimiento este mes
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Las ventas han aumentado un 25% comparado con el mes anterior
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Progreso del objetivo</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Últimas actividades de los usuarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Olivia Martin</p>
                      <p className="text-sm text-muted-foreground">
                        olivia.martin@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$1,999.00</div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                      <AvatarImage src="/avatars/02.png" alt="Avatar" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Jackson Lee</p>
                      <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                    </div>
                    <div className="ml-auto font-medium">+$39.00</div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/03.png" alt="Avatar" />
                      <AvatarFallback>IN</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                      <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$299.00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Métricas y análisis de rendimiento detallados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Tasa de Conversión</h4>
                  <div className="flex items-center space-x-2">
                    <Progress value={85} className="flex-1" />
                    <Badge variant="secondary">85%</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Retención de Usuarios</h4>
                  <div className="flex items-center space-x-2">
                    <Progress value={72} className="flex-1" />
                    <Badge variant="secondary">72%</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Satisfacción del Cliente</h4>
                  <div className="flex items-center space-x-2">
                    <Progress value={94} className="flex-1" />
                    <Badge variant="secondary">94%</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Tiempo de Respuesta</h4>
                  <div className="flex items-center space-x-2">
                    <Progress value={60} className="flex-1" />
                    <Badge variant="secondary">60%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes</CardTitle>
              <CardDescription>
                Genera y descarga reportes personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button className="w-full">
                    Reporte de Ventas
                  </Button>
                  <Button variant="outline" className="w-full">
                    Reporte de Usuarios
                  </Button>
                  <Button variant="outline" className="w-full">
                    Reporte Financiero
                  </Button>
                  <Button variant="outline" className="w-full">
                    Reporte de Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>
                Revisa tus notificaciones recientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <Bell className="h-4 w-4" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Nueva venta realizada</p>
                    <p className="text-sm text-muted-foreground">
                      Se ha procesado una nueva venta por $299.00
                    </p>
                  </div>
                  <Badge>Nueva</Badge>
                </div>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <Users className="h-4 w-4" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Nuevo usuario registrado</p>
                    <p className="text-sm text-muted-foreground">
                      Un nuevo usuario se ha unido a la plataforma
                    </p>
                  </div>
                  <Badge variant="secondary">Hace 2h</Badge>
                </div>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <TrendingUp className="h-4 w-4" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Meta alcanzada</p>
                    <p className="text-sm text-muted-foreground">
                      Has alcanzado el 100% de tu meta mensual
                    </p>
                  </div>
                  <Badge variant="outline">Hace 1d</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
