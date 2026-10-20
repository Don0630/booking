import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface FilterOption {
  key: string
  label: string
  options: string[]
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey: string
  searchPlaceholder?: string
  filters?: FilterOption[]
  filterValues?: Record<string, string>
  onFilterChange?: (key: string, value: string) => void
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = 'Search...',
  filters = [],
  filterValues = {},
  onFilterChange,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Search - full width on mobile */}
      <Input
        placeholder={searchPlaceholder}
        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
        onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
        className="w-full sm:max-w-sm"
      />

      {/* Filters + Columns - same row on both mobile and desktop */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Radio Filters */}
        {filters.map((filter) => {
          const currentValue = filterValues[filter.key] ?? 'All'
          const isFiltered = currentValue !== 'All'

          return (
            <Popover key={filter.key}>
              <PopoverTrigger asChild>
                <Button variant={isFiltered ? 'default' : 'outline'} size="sm" className="gap-1">
                  {filter.label}
                  {isFiltered && (
                    <span className="ml-1 rounded-full bg-white text-primary text-xs px-1.5">
                      {currentValue}
                    </span>
                  )}
                  <ChevronDown size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-3" align="start">
                <p className="text-sm font-semibold mb-3">{filter.label}</p>
                <RadioGroup
                  value={currentValue}
                  onValueChange={(value) => onFilterChange?.(filter.key, value)}
                  className="space-y-2"
                >
                  {['All', ...filter.options].map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <RadioGroupItem value={option} id={`${filter.key}-${option}`} />
                      <Label htmlFor={`${filter.key}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </PopoverContent>
            </Popover>
          )
        })}

        {/* Column visibility toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Columns <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
