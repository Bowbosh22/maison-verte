import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Refuges from './pages/Refuges'
import RefugeDetails from './pages/RefugeDetails'
import Lodge from './pages/Lodge'
import Experiences from './pages/Experiences'
import Contact from './pages/Contact'

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppContent() {
  return (
    <>
      <Navbar />
      <ScrollReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/refuges" element={<Refuges />} />
        <Route path="/refuge/:slug" element={<RefugeDetails />} />
        <Route path="/lodge" element={<Lodge />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>
}
