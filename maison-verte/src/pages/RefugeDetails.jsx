import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import gsap from 'gsap'
import CTASection from '../components/CTASection'
import { getRefugeBySlug } from '../data/refuges'

export default function RefugeDetails() {
  const { slug } = useParams()
  const refuge = getRefugeBySlug(slug)
  const [activeImg, setActiveImg] = useState(0)
  const heroRef = useRef(null)
  const bodyRef = useRef(null)

  if (!refuge) return <Navigate to="/refuges" replace />

  useEffect(() => {
    gsap.from(heroRef.current, { opacity: 0, duration: 1.2, ease: 'power2.out' })
    gsap.from(bodyRef.current.querySelectorAll('.rd-item'), {
      y: 28, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.4,
    })
  }, [slug])

  return (
    <main style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div ref={heroRef} style={{ position: 'relative', height: 'clamp(60vh, 78vh, 78vh)', minHeight: 420, overflow: 'hidden' }}>
        <img src={refuge.images[activeImg]} alt={refuge.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(31,42,36,0.15) 0%, rgba(31,42,36,0.85) 100%)' }} />

        <Link to="/refuges" style={{
          position: 'absolute', top: 'calc(var(--nav-h) + 16px)', left: 'clamp(20px,5vw,80px)',
          fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(250,247,241,0.9)',
          background: 'rgba(31,42,36,0.4)', padding: '8px 14px', backdropFilter: 'blur(6px)',
        }}>← Tous les refuges</Link>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px,5vw,64px)' }}>
          <p className="t-label" style={{ color: '#E8C99A', marginBottom: 12 }}>{refuge.category} · {refuge.location}</p>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 8vw, 110px)',
            fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.022em', color: 'var(--off-white)',
          }}>
            {refuge.name}
          </h1>
        </div>
      </div>

      {refuge.images.length > 1 && (
        <div style={{ display: 'flex', gap: 8, padding: '14px clamp(20px,5vw,80px)', background: 'var(--ivory)', overflowX: 'auto' }}>
          {refuge.images.map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)} style={{
              width: 80, height: 54, overflow: 'hidden', flexShrink: 0, cursor: 'pointer',
              outline: i === activeImg ? '2px solid var(--moss)' : '1px solid var(--line)',
              transition: 'outline 0.3s',
            }}>
              <img src={img} alt={`Vue ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      <div ref={bodyRef} className="rd-body" style={{
        display: 'grid', gridTemplateColumns: '1fr 340px',
        gap: 'clamp(3rem, 5vw, 6rem)',
        padding: 'clamp(4rem, 6vw, 5rem) clamp(20px,5vw,80px) clamp(5rem, 8vw, 8rem)',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div>
          <p className="rd-item t-serif-sm" style={{ color: 'var(--forest)', marginBottom: 12, fontSize: 'clamp(20px, 2vw, 26px)' }}>
            {refuge.tagline}
          </p>
          <p className="rd-item" style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(15px,1.2vw,17px)',
            color: 'var(--soft)', lineHeight: 1.9, marginBottom: '3rem',
          }}>
            {refuge.description}
          </p>

          <div className="rd-item" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            gap: 'clamp(1rem, 3vw, 2rem)',
            borderTop: '1px solid var(--line)', paddingTop: '2.5rem', marginBottom: '3rem',
          }}>
            {[
              { v: refuge.surface, u: 'm²' },
              { v: refuge.guests, u: 'personnes' },
              { v: refuge.bathrooms, u: 'salles de bain' },
            ].map(({ v, u }) => (
              <div key={u}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,50px)', fontWeight: 300, color: 'var(--forest)', lineHeight: 1 }}>{v}</p>
                <p className="t-label" style={{ color: 'var(--soft)', marginTop: 6 }}>{u}</p>
              </div>
            ))}
          </div>

          <div className="rd-item">
            <p className="t-label" style={{ color: 'var(--moss)', marginBottom: 20 }}>Équipements & Attentions</p>
            <ul className="rd-features" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', listStyle: 'none' }}>
              {refuge.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--forest)' }}>
                  <span style={{ width: 6, height: 6, background: 'var(--moss)', borderRadius: '50%', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="rd-sidebar" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', alignSelf: 'start' }}>
          <div className="rd-item" style={{ background: 'var(--ivory)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <p className="t-label" style={{ color: 'var(--soft)', marginBottom: 8 }}>Tarif</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,2.2vw,30px)', fontWeight: 400, color: 'var(--moss)', marginBottom: 4 }}>
              {refuge.price}
            </p>
            <p className="t-label" style={{ color: 'var(--soft)', marginBottom: '2rem' }}>{refuge.priceUnit}</p>
            <Link to="/contact" className="btn-solid" style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: 10 }}>
              Demander la disponibilité
            </Link>
            <Link to="/contact" className="btn-outline" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              Poser une question
            </Link>
          </div>
          <p className="t-label" style={{ color: 'var(--soft)', marginTop: 20, textAlign: 'center' }}>
            Ref. {refuge.id.toString().padStart(3, '0')}
          </p>
        </aside>
      </div>

      <CTASection title="D'AUTRES\nREFUGES ?"
        subtitle="Découvrez toutes nos manières de vivre le lieu."
        primary={{ label: 'Voir les autres refuges', to: '/refuges' }}
        secondary={{ label: 'Nos expériences', to: '/experiences' }}
      />

      <style>{`
        @media (max-width: 900px) {
          .rd-body { grid-template-columns: 1fr !important; }
          .rd-sidebar { position: static !important; }
        }
        @media (max-width: 480px) {
          .rd-features { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
