import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: 'Total Users', value: '12,345', icon: '👥', change: '+12%', color: 'bg-blue-500' },
  { label: 'Revenue', value: '$45,678', icon: '💰', change: '+8%', color: 'bg-green-500' },
  { label: 'Orders', value: '1,234', icon: '📦', change: '+3%', color: 'bg-purple-500' },
  { label: 'Active Sessions', value: '567', icon: '🟢', change: '+1%', color: 'bg-orange-500' },
]

const recentUsers = [
  { name: 'John Doe', email: 'john@example.com', status: 'Active', joined: 'Jun 1, 2026' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Active', joined: 'Jun 3, 2026' },
  { name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', joined: 'Jun 5, 2026' },
  { name: 'Alice Brown', email: 'alice@example.com', status: 'Active', joined: 'Jun 7, 2026' },
]

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-green-500">{stat.change} this month</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
