import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DestinationDetails from './pages/DestinationDetails'
import Destinations from './pages/Destinations'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Wishlist from './pages/Wishlist'
import Calculator from './pages/Calculator'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

