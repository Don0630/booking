import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Shield, Calendar, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Jun 1, 2026',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
    joined: 'Jun 2, 2026',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'Inactive',
    joined: 'Jun 3, 2026',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'Active',
    joined: 'Jun 4, 2026',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'User',
    status: 'Active',
    joined: 'Jun 5, 2026',
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana@example.com',
    role: 'Editor',
    status: 'Inactive',
    joined: 'Jun 6, 2026',
  },
  {
    id: 7,
    name: 'Eve Adams',
    email: 'eve@example.com',
    role: 'User',
    status: 'Active',
    joined: 'Jun 7, 2026',
  },
  {
    id: 8,
    name: 'Frank Castle',
    email: 'frank@example.com',
    role: 'User',
    status: 'Active',
    joined: 'Jun 8, 2026',
  },
  {
    id: 9,
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Jun 9, 2026',
  },
  {
    id: 10,
    name: 'Henry Ford',
    email: 'henry@example.com',
    role: 'User',
    status: 'Inactive',
    joined: 'Jun 10, 2026',
  },
  {
    id: 11,
    name: 'Iris West',
    email: 'iris@example.com',
    role: 'Editor',
    status: 'Active',
    joined: 'Jun 11, 2026',
  },
  {
    id: 12,
    name: 'Jack Ryan',
    email: 'jack@example.com',
    role: 'User',
    status: 'Active',
    joined: 'Jun 12, 2026',
  },
]

function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const user = users.find((u) => u.id === Number(id))

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground text-lg">User not found.</p>
        <Button variant="outline" onClick={() => navigate('/users')}>
          <ArrowLeft size={16} className="mr-2" /> Back to Users
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/users')}>
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">User Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
              {user.status}
            </Badge>
            <div className="flex gap-2 w-full">
              <Button className="w-full" size="sm">
                Edit
              </Button>
              <Button className="w-full" size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <User size={18} className="text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <Mail size={18} className="text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <Shield size={18} className="text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <Calendar size={18} className="text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Joined</p>
                <p className="font-medium">{user.joined}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserDetail
