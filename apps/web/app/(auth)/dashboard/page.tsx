"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useAuth } from "@/lib/auth-context"
import { BarChart3, DollarSign, Package, ShoppingCart, TrendingUp, Users, Calendar } from "lucide-react"
// import {
//   mockSales,
//   mockProducts,
//   getTotalSales,
//   getSalesCount,
//   getTopProducts,
//   getSalesByDate,
// } from "@/lib/data/mock-data"
import { useSessionContext } from "@/lib/session-provider"

export default function DashboardPage() {
  const user = useSessionContext()
  // Filter sales by user role
//   const filteredSales = useMemo(() => {
//     if (!user) return []
//     if (user.role === "admin") {
//       return mockSales
//     }
//     return mockSales.filter((sale) => sale.sellerId === user.id)
//   }, [user])

//   if (!user) return null

  const totalSales = 10
  const salesCount = 1
  const topProducts = []
  const recentSales = []

  return (
<div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {user.name}. Aquí tienes un resumen de {user.role === "admin" ? "todas las" : "tus"} ventas.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {user.role === "admin" ? "Todas las ventas" : "Tus ventas"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Número de Ventas</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesCount}</div>
              <p className="text-xs text-muted-foreground">Ventas realizadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{2}</div>
              <p className="text-xs text-muted-foreground">Productos disponibles</p>
            </CardContent>
          </Card>

          {user.role === "admin" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendedores</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Usuarios activos</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Charts and Reports Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Ventas por Fecha
              </CardTitle>
              <CardDescription>Últimas ventas registradas</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <div className="space-y-3">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {new Date(sale.date).toLocaleDateString("es-ES", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="font-bold text-primary">${sale.total.toLocaleString()}</span>
                  </div>
                ))}
              </div> */}
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Productos Más Vendidos
              </CardTitle>
              <CardDescription>Top 5 productos por ingresos</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.quantity} unidades vendidas</p>
                    </div>
                    <div className="font-medium text-primary">${product.revenue.toLocaleString()}</div>
                  </div>
                ))}
              </div> */}
            </CardContent>
          </Card>
        </div>

        {/* Recent Sales Table */}
        <Card>
          <CardHeader>
            <CardTitle>Ventas Recientes</CardTitle>
            <CardDescription>
              {user.role === "admin" ? "Todas las ventas recientes" : "Tus ventas recientes"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="space-y-4">
              {filteredSales.slice(0, 5).map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{sale.customerName}</p>
                    <p className="text-sm text-muted-foreground">{sale.customerEmail}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(sale.date).toLocaleDateString("es-ES")} • {sale.sellerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${sale.total.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {sale.items.length} producto{sale.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
          </CardContent>
        </Card>
      </div>
  )
}
