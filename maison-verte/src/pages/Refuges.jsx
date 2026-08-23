import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import RefugeCard from '../components/RefugeCard'
import CTASection from '../components/CTASection'
import { refuges } from '../data/refuges'

const FILTERS = ['Tous', 'Cabane sur pilotis', 'Villa privée', 'Suite au bord de l\'eau']

export default function Refuges() {
  const [filter, setFilter] = useState('Tous')
  const headerRef = useRef(null)
  const filtered = filter === 'Tous' ? refuges : refuges.filter(r => r.category === filter)

  useEffect(() => {
    gsap.from(headerRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 })
  }, [])

  return (
    <main style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div ref={headerRef} style={{
        padding: 'calc(var(--nav-h) + 60px) clamp(24px,5vw,80px) clamp(48px,6vw,80px)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div className="eyebrow"><span className="t-label" style={{ color: 'var(--moss)' }}>Nos Refuges</span></div>
        <h1 style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 9vw, 120px)',
          fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.022em',
          color: 'var(--forest)', marginBottom: 48,
        }}>
          Choisissez<br /><span style={{ fontStyle: 'italic', color: 'var(--moss)' }}>votre lieu</span>.
        </h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '10px 18px',
              border: `1px solid ${filter === f ? 'var(--forest)' : 'var(--line)'}`,
              fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: filter === f ? 'var(--forest)' : 'var(--soft)',
              background: filter === f ? 'var(--ivory)' : 'transparent',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(24px,4vw,56px)',
        }}>
          {filtered.map((r, i) => <RefugeCard key={r.id} refuge={r} index={i} />)}
        </div>
      </div>

      <CTASection title="OUVREZ VOTRE\nMATINÉE."
        subtitle="Réservez votre refuge. Notre équipe vous rappelle sous 24h."
        primary={{ label: 'Demander une réservation', to: '/contact' }}
        secondary={{ label: 'Nos expériences', to: '/experiences' }}
        variant="dark"
      />
    </main>
  )
}
