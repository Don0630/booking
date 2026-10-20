import { useNavigate } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import {
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { useUsers } from '@/hooks/useUsers'
import type { User } from '@/api/users'

const SortIcon = ({ sorted }: { sorted: false | 'asc' | 'desc' }) => {
  if (sorted === 'asc') return <ArrowUp size={14} />
  if (sorted === 'desc') return <ArrowDown size={14} />
  return <ChevronsUpDown size={14} className="text-muted-foreground" />
}

function Users() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useUsers()

  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="gap-1"
        >
          Name <SortIcon sorted={column.getIsSorted()} />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="gap-1"
        >
          Email <SortIcon sorted={column.getIsSorted()} />
        </Button>
      ),
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue('email')}</span>,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      enableSorting: false,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: false,
      cell: ({ row }) => (
        <Badge variant={row.getValue('status') === 'Active' ? 'default' : 'secondary'}>
          {row.getValue('status')}
        </Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="gap-1"
        >
          Joined <SortIcon sorted={column.getIsSorted()} />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {new Date(row.getValue('createdAt')).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/users/${row.original.id}`)}>
              <Eye size={14} className="mr-2" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Edit ${row.original.name}`)}>
              <Pencil size={14} className="mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => alert(`Delete ${row.original.name}`)}
            >
              <Trash2 size={14} className="mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Failed to load users.</p>
      </div>
    )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button>+ Add User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data ?? []}
            searchKey="name"
            searchPlaceholder="Search by name..."
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
              { key: 'role', label: 'Role', options: ['Admin', 'Editor', 'User'] },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Users
