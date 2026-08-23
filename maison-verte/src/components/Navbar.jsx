import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/refuges',     label: 'Refuges' },
  { to: '/lodge',       label: 'Le Lodge' },
  { to: '/experiences', label: 'Expériences' },
  { to: '/contact',     label: 'Réserver' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [passedImmersion, setPassedImmersion] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!isHome) {
      setPassedImmersion(true)
      return
    }
    // Sur la home : navbar transparente jusqu'à la fin de l'immersion (700vh)
    const check = () => {
      const immersion = document.querySelector('[aria-label="Une matinée au lodge"]')
      if (!immersion) return
      const rect = immersion.getBoundingClientRect()
      // On considère passé quand le bas de l'immersion arrive en haut de l'écran
      setPassedImmersion(rect.bottom <= 100)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [isHome, pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Style : transparent + centré pendant immersion, plein cadre + fond crème après
  const isFloating = isHome && !passedImmersion

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: isFloating ? 24 : 0,
        left: isFloating ? '50%' : 0,
        right: isFloating ? 'auto' : 0,
        transform: isFloating ? 'translateX(-50%)' : 'none',
        zIndex: 200,
        height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center',
        justifyContent: isFloating ? 'center' : 'space-between',
        padding: isFloating ? '0 32px' : '0 clamp(24px, 5vw, 72px)',
        gap: isFloating ? 'clamp(20px, 2.5vw, 40px)' : 0,
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        background: isFloating ? 'rgba(31,42,36,0.35)' : 'rgba(250,247,241,0.94)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: isFloating ? 'none' : '1px solid var(--line)',
        borderRadius: isFloating ? '9999px' : '0',
        border: isFloating ? '1px solid rgba(250,247,241,0.15)' : '1px solid transparent',
        width: isFloating ? 'auto' : '100%',
        maxWidth: isFloating ? 'calc(100vw - 32px)' : 'none',
      }} aria-label="Navigation principale">

        {/* Logo — caché en mode flottant, visible sinon */}
        {!isFloating && (
          <Link to="/" style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 1.6vw, 21px)',
            fontWeight: 400, letterSpacing: '0.02em', fontStyle: 'italic',
            color: 'var(--forest)',
          }} aria-label="Maison Verte — Accueil">
            maison verte
          </Link>
        )}

        {/* Liens de navigation */}
        <ul style={{
          display: 'flex',
          gap: isFloating ? 'clamp(18px, 2.2vw, 34px)' : 'clamp(24px, 3vw, 48px)',
          listStyle: 'none',
          alignItems: 'center',
        }} className="nav-links">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} style={({ isActive }) => ({
                fontFamily: 'var(--sans)',
                fontSize: isFloating ? '10.5px' : '11px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: isFloating
                  ? (isActive ? 'var(--off-white)' : 'rgba(250,247,241,0.75)')
                  : (isActive ? 'var(--forest)' : 'var(--soft)'),
                transition: 'color 0.3s ease',
                whiteSpace: 'nowrap',
              })}>{label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Menu burger mobile — visible seulement en mode non-flottant */}
        {!isFloating && (
          <button onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Fermer' : 'Ouvrir'} aria-expanded={open}
            style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
            className="nav-burger"
          >
            <span style={{ display: 'block', width: 24, height: 1, background: 'var(--forest)',
              transition: 'transform 0.3s',
              transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 1, background: 'var(--forest)',
              transition: 'opacity 0.3s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 1, background: 'var(--forest)',
              transition: 'transform 0.3s',
              transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
          </button>
        )}
      </nav>

      {/* Menu mobile plein écran */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 199, background: 'var(--off-white)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }} aria-hidden={!open}>
        {LINKS.map(({ to, label }) => (
          <Link key={to} to={to} style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(38px, 10vw, 60px)',
            fontWeight: 300, color: 'var(--forest)', fontStyle: 'italic',
          }}>{label}</Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}