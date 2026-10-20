import RoomCard from './RoomCard'
import type { RoomCardData } from './RoomCard'

export default function RoomsSection({ rooms }: { rooms: RoomCardData[] }) {
  return (
    <section id="rooms" className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-6 pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">Rooms</p>
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight md:text-4xl">Six ways to wake up here.</h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  )
}