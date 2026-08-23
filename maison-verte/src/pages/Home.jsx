import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImmersiveMorning from '../components/ImmersiveMorning'
import RefugeCard from '../components/RefugeCard'
import CTASection from '../components/CTASection'
import { refuges } from '../data/refuges'

function BrandReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.br-item'), {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '0 20px',
      background: 'linear-gradient(180deg, #FAF7F1 0%, #F3EFE6 100%)',
    }}>
      {/* Feuille SVG décorative */}
      <div style={{
        position: 'absolute', top: '20%', right: '-5%',
        width: 400, maxWidth: '35vw', height: 400, maxHeight: '35vw',
        opacity: 0.08, pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 200 200" fill="var(--moss)">
          <path d="M100 20 C 60 20, 30 60, 30 100 C 30 140, 60 180, 100 180 C 100 180, 100 100, 100 20 Z" />
        </svg>
      </div>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: 1000 }}>
        <p className="t-label br-item" style={{ color: 'var(--moss)', marginBottom: 32 }}>
          LODGE ÉCO-LUXE · AU CŒUR DE LA NATURE
        </p>

        <h1 className="br-item" style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(56px, 12vw, 180px)',
          fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.025em',
          color: 'var(--forest)', marginBottom: 32,
        }}>
          maison<br />
          <span style={{ fontStyle: 'italic', color: 'var(--moss)' }}>verte</span>
        </h1>

        <p className="t-serif-sm br-item" style={{
          color: 'var(--soft)', maxWidth: 460, margin: '0 auto',
        }}>
          Un lieu à part. Une nature qui respire. Des matinées qu'on ne fait qu'ici.
        </p>
      </div>
    </section>
  )
}

function OurRefuges() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.rp-item'), {
        y: 28, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      background: 'var(--off-white)',
      padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: 'clamp(48px, 6vw, 80px)', flexWrap: 'wrap', gap: 24,
      }}>
        <div>
          <div className="eyebrow rp-item">
            <span className="t-label" style={{ color: 'var(--moss)' }}>Nos Refuges</span>
          </div>
          <h2 className="rp-item" style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 7vw, 96px)',
            fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.02em', color: 'var(--forest)',
          }}>
            Trois manières<br />
            <span style={{ fontStyle: 'italic', color: 'var(--moss)' }}>d'habiter</span> le lieu.
          </h2>
        </div>
        <Link to="/refuges" className="btn-outline rp-item" style={{ flexShrink: 0 }}>
          Voir tous les refuges →
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: 'clamp(24px, 4vw, 56px)',
      }}>
        {refuges.map((r, i) => <RefugeCard key={r.id} refuge={r} index={i} />)}
      </div>
    </section>
  )
}

function Philosophy() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.ph-item'), {
        y: 36, opacity: 0, duration: 1, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 78%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      background: 'var(--sage)',
      padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)',
    }}>
      <p className="t-label ph-item" style={{ color: 'var(--moss)', marginBottom: 24 }}>Notre Philosophie</p>
      <h2 className="ph-item" style={{
        fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 7vw, 96px)',
        fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.02em',
        color: 'var(--forest)', maxWidth: 900, marginBottom: 'clamp(56px, 8vw, 100px)',
      }}>
        Le luxe ici,<br />
        c'est le <span style={{ fontStyle: 'italic', color: 'var(--moss)' }}>silence</span>.
      </h2>

      <div className="ph-item" style={{
        width: '100%', aspectRatio: '16/8', overflow: 'hidden',
        marginBottom: 'clamp(56px, 8vw, 100px)',
      }}>
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=80"
          alt="Forêt tropicale au petit matin"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
        gap: 'clamp(32px, 4vw, 56px)',
      }}>
        {[
          { t: 'RESPECT', b: 'Le lieu était là avant nous. Nous construisons pour qu\'il reste là après.' },
          { t: 'INTIMITÉ', b: 'Douze refuges. Jamais plus. Chaque hôte a sa part de forêt.' },
          { t: 'AUTHENTIQUE', b: 'Les matériaux viennent d\'ici. Les mains qui ont bâti aussi.' },
        ].map(({ t, b }) => (
          <div key={t} className="ph-item">
            <p className="t-label" style={{ color: 'var(--moss)', marginBottom: 14 }}>{t}</p>
            <div style={{ width: 24, height: 1, background: 'var(--moss)', marginBottom: 18 }} />
            <p className="t-body">{b}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <ImmersiveMorning />
      <BrandReveal />
      <OurRefuges />
      <Philosophy />
      <CTASection variant="dark" />
    </main>
  )
}