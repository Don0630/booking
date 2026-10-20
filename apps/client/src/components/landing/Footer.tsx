export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 text-sm md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">Amity Hotel</p>
          <p className="mt-2 max-w-[30ch] text-muted-foreground">
            A small hotel on a quiet city. Six rooms, one roadside.
          </p>
        </div>

        <dl className="grid gap-3">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Check-in</dt>
            <dd className="font-medium">From 3:00 pm</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Check-out</dt>
            <dd className="font-medium">By 11:00 am</dd>
          </div>
        </dl>

        <dl className="grid gap-3">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Address</dt>
            <dd className="font-medium">National Highway, San Fermin, Cauayan, Cauayan, Philippines</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Contact</dt>
            <dd className="font-medium">amityhotelph@gmail.com</dd>
          </div>
        </dl>
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-8 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Amity Hotel
      </div>
    </footer>
  )
}