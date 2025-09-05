import { Suspense, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation } from 'convex/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Package,
  DollarSign,
  ShoppingCart,
  Plus,
  Grid3X3,
  List,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/(auth)/dashboard/demo/convex')({
  component: App,
})

function NewProductDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createProduct = useMutation(api.products.create)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !price.trim()) return

    setIsSubmitting(true)
    try {
      await createProduct({
        title: title.trim(),
        price: parseFloat(price),
        imageId: 'placeholder', // Por ahora usamos un placeholder
      })

      // Limpiar formulario y cerrar diálogo
      setTitle('')
      setPrice('')
      setIsOpen(false)
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
          <DialogDescription>
            Completa la información del producto que deseas agregar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nombre del producto"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Precio
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !price.trim()}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ProductsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full mb-3" />
            <Skeleton className="h-4 w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProductsGrid() {
  const products = useQuery(api.products.get)

  if (!products) {
    return <ProductsSkeleton />
  }

  if (products.length === 0) {
    return (
      <Card className="col-span-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hay productos</h3>
          <p className="text-muted-foreground text-center mb-4">
            Aún no se han agregado productos a la base de datos.
          </p>
          <NewProductDialog />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card
          key={product._id}
          className="group hover:shadow-lg transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  ID: {product._id}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="ml-2">
                <DollarSign className="h-3 w-3 mr-1" />
                {product.price}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Placeholder para imagen */}
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <Button size="sm" className="ml-2">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Agregar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProductsList() {
  const products = useQuery(api.products.get)

  if (!products) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center space-x-4 p-4">
              <Skeleton className="h-12 w-12 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <List className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Lista vacía</h3>
          <p className="text-muted-foreground text-center">
            No hay productos para mostrar en la lista.
          </p>
        </CardContent>
      </Card>
    )
  }

  const totalValue = products.reduce((sum, product) => sum + product.price, 0)

  return (
    <div className="space-y-4">
      {/* Stats */}
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm text-muted-foreground">Total de productos</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor total</p>
            <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Precio promedio</p>
            <p className="text-2xl font-bold">
              ${(totalValue / products.length).toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      {products.map((product) => (
        <Card key={product._id} className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{product.title}</h4>
              <p className="text-xs text-muted-foreground">ID: {product._id}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">${product.price.toFixed(2)}</Badge>
              <Button size="sm" variant="outline">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function App() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demo Convex</h1>
          <p className="text-muted-foreground">
            Gestión de productos conectada a Convex Database
          </p>
        </div>
        <NewProductDialog />
      </div>

      {/* Content */}
      <Suspense fallback={<ProductsSkeleton />}>
        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center space-x-2">
              <Grid3X3 className="h-4 w-4" />
              <span>Vista de Cuadrícula</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <List className="h-4 w-4" />
              <span>Vista de Lista</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-4">
            <ProductsGrid />
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <ProductsList />
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  )
}
