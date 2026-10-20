import LandingHeader from '@/components/landing/LandingHeader'
import Hero from '@/components/landing/Hero'
import SearchBar from '@/components/landing/SearchBar'
import Features from '@/components/landing/Features'
import RoomsSection from '@/components/landing/RoomsSection'
import CtaBanner from '@/components/landing/CtaBanner'
import Footer from '@/components/landing/Footer'
import Reviews from '@/components/landing/Reviews'
import Amenities from '@/components/landing/Amenities'
import Gallery from '@/components/landing/Gallery'
import Offers from '@/components/landing/Offers'
import { STATIC_ROOMS } from '@/components/landing/staticRooms'

export default function Landing() {
  return (
      <div className="landing min-h-screen bg-background text-foreground">
      <LandingHeader />
      <Hero />
      <main>
        <div className="relative z-20 mx-auto -mt-16 max-w-5xl px-5">
          <SearchBar />
        </div>
        <Features />
        <RoomsSection rooms={STATIC_ROOMS} />
        <Offers />
        <Gallery />
        <Amenities />
        <Reviews />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}