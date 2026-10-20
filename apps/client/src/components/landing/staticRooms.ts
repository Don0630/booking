import type { RoomCardData } from './RoomCard'

export const STATIC_ROOMS: RoomCardData[] = [
  { id: 1, name: 'Garden Single', description: 'Quiet corner room facing the herb garden.', maxGuests: 1, priceCents: 500, image: '/rooms/1.jpg' },
  { id: 2, name: 'Pine Double', description: 'Pine panelling, reading nook, ridge-view balcony.', maxGuests: 2, priceCents: 600, image: '/rooms/2.jpg' },
  { id: 3, name: 'Ridge Twin', description: 'Two single beds, wide windows, sunrise light.', maxGuests: 2, priceCents: 700, image: '/rooms/3.jpg' },
  { id: 4, name: 'Hearth Suite', description: 'Wood-stove lounge and a deep bath.', maxGuests: 3, priceCents: 800, image: '/rooms/4.jpg' },
  { id: 5, name: 'Family Loft', description: 'Split-level loft with a kids sleeping gallery.', maxGuests: 4, priceCents: 900, image: '/rooms/5.jpg' },
  { id: 6, name: 'Observatory Suite', description: 'Skylight over the bed and a private roof terrace.', maxGuests: 2, priceCents: 1000, image: '/rooms/6.jpg' },
]