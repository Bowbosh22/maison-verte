import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTASection from '../components/CTASection'

const NUMBERS = [
  { v: '12', l: 'Refuges seulement' },
  { v: '18', l: 'Hectares de forêt' },
  { v: '100%', l: 'Énergie solaire' },
  { v: '2020', l: 'Ouvert depuis' },
]

export default function Lodge() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.lg-item').forEach(item => {
        gsap.from(item, {
          y: 32, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%' },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={ref} style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div style={{ padding: 'calc(var(--nav-h) + 80px) clamp(24px,5vw,80px) 0' }}>
        <p className="t-label lg-item" style={{ color: 'var(--moss)', marginBottom: 24 }}>Notre Histoire</p>
        <h1 className="lg-item" style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(52px, 10vw, 140px)',
          fontWeight: 300, lineHeight: 0.88, letterSpacing: '-0.025em',
          color: 'var(--forest)', maxWidth: 900, marginBottom: 56,
        }}>
          Un lieu<br />
          <span style={{ fontStyle: 'italic', color: 'var(--moss)' }}>gardé</span>.
        </h1>

        <p className="lg-item t-serif-sm" style={{
          color: 'var(--soft)', maxWidth: 620, lineHeight: 1.9, marginBottom: 80,
        }}>
          Maison Verte est née d'un pari. Prouver qu'on peut construire un hôtel de charme sans abîmer la forêt qui l'accueille. Cinq ans plus tard, les arbres sont toujours là. Les hôtes reviennent.
        </p>
      </div>

      <div className="lg-item" style={{ width: '100%', aspectRatio: '21/9', minHeight: 240, overflow: 'hidden', position: 'relative' }}>
        <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1800&q=80"
          alt="Notre forêt" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, var(--off-white) 100%)' }} />
      </div>

      <div className="lg-numbers" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        margin: '0 clamp(24px,5vw,80px)',
      }}>
        {NUMBERS.map(({ v, l }, i) => (
          <div key={v} className="lg-item lg-number" style={{
            padding: 'clamp(28px, 4vw, 56px) 12px',
            borderRight: i < NUMBERS.length - 1 ? '1px solid var(--line)' : 'none',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 300, color: 'var(--forest)', lineHeight: 1 }}>{v}</p>
            <p className="t-label" style={{ color: 'var(--soft)', marginTop: 10, fontSize: 'clamp(9px, 1vw, 10px)' }}>{l}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: 'clamp(80px,12vw,160px) clamp(24px,5vw,80px)' }}>
        <div className="lg-item" style={{ marginBottom: 'clamp(40px, 6vw, 60px)' }}>
          <div className="eyebrow"><span className="t-label" style={{ color: 'var(--moss)' }}>Nos Engagements</span></div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,6vw,80px)', fontWeight: 300, color: 'var(--forest)', lineHeight: 0.92 }}>
            Ce qu'on refuse<br />
            <span style={{ fontStyle: 'italic', color: 'var(--moss)' }}>de faire</span>.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 'clamp(32px,4vw,56px)' }}>
          {[
            { t: 'PAS DE PLASTIQUE', b: 'Aucun plastique à usage unique. Verre, bambou, textile — partout dans les refuges.' },
            { t: 'PAS DE MASSE', b: 'Douze refuges, jamais plus. La forêt et le silence ne se partagent pas à mille.' },
            { t: 'PAS DE SUPERFLU', b: 'Ce qui compte : le lit, la lumière, la vue. Tout le reste est distraction.' },
          ].map(({ t, b }) => (
            <div key={t} className="lg-item">
              <p className="t-label" style={{ color: 'var(--moss)', marginBottom: 14 }}>{t}</p>
              <div style={{ width: 24, height: 1, background: 'var(--moss)', marginBottom: 18 }} />
              <p className="t-body">{b}</p>
            </div>
          ))}
        </div>
      </div>

      <CTASection title="VENEZ VOIR." subtitle="Réservez une nuit, un week-end, une semaine."
        primary={{ label: 'Réserver', to: '/contact' }}
        secondary={{ label: 'Nos refuges', to: '/refuges' }}
        variant="dark"
      />

      <style>{`
        @media (max-width: 640px) {
          .lg-numbers { grid-template-columns: repeat(2, 1fr) !important; }
          .lg-number:nth-child(2) { border-right: none !important; }
          .lg-number:nth-child(1),
          .lg-number:nth-child(2) { border-bottom: 1px solid var(--line); }
        }
      `}</style>
    </main>
  )
}
