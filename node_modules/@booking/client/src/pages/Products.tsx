import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const products = [
  {
    id: 1,
    name: 'Product A',
    price: '$99',
    category: 'Electronics',
    stock: 45,
    status: 'In Stock',
  },
  { id: 2, name: 'Product B', price: '$149', category: 'Clothing', stock: 12, status: 'In Stock' },
  { id: 3, name: 'Product C', price: '$29', category: 'Books', stock: 0, status: 'Out of Stock' },
  {
    id: 4,
    name: 'Product D',
    price: '$199',
    category: 'Electronics',
    stock: 8,
    status: 'Low Stock',
  },
]

function Products() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button>+ Add Product</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-5 space-y-3">
              <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center text-4xl">
                📦
              </div>
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{product.price}</span>
                <Badge
                  variant={
                    product.status === 'In Stock'
                      ? 'default'
                      : product.status === 'Low Stock'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {product.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="w-full">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Products
