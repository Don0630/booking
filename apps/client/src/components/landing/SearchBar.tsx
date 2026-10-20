import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addDays, isoDate } from '@/lib/hotel'

export default function SearchBar() {
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState(isoDate(7))
  const [checkOut, setCheckOut] = useState(isoDate(9))
  const [guests, setGuests] = useState(2)
  const [error, setError] = useState('')

  const onCheckInChange = (value: string) => {
    setCheckIn(value)
    // keep check-out after check-in
    if (checkOut <= value) setCheckOut(addDays(value, 1))
    setError('')
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setError('Choose a check-out date after check-in.')
      return
    }
    navigate(`/book?in=${checkIn}&out=${checkOut}&guests=${guests}`)
  }

  return (
    <form
      id="search"
      onSubmit={onSubmit}
      className="scroll-mt-24 grid gap-3 rounded-2xl border bg-card p-4 shadow-lg sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end"
      aria-label="Check availability"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="check-in">Check-in</Label>
        <Input id="check-in" type="date" min={isoDate(0)} value={checkIn} onChange={(e) => onCheckInChange(e.target.value)} required />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="check-out">Check-out</Label>
        <Input id="check-out" type="date" min={addDays(checkIn, 1)} value={checkOut} onChange={(e) => { setCheckOut(e.target.value); setError('') }} required />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="guests">Guests</Label>
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <Button type="submit" className="sm:col-span-2 md:col-span-1">Check availability</Button>

      {error && (
        <p role="alert" className="text-sm text-destructive sm:col-span-2 md:col-span-4">{error}</p>
      )}
    </form>
  )
}