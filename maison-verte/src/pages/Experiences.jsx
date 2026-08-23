import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTASection from '../components/CTASection'

const EXPERIENCES = [
  { n: '01', t: 'Bain de forêt', b: 'Une marche silencieuse à l\'aube, guidée par un botaniste local. Vous apprenez à reconnaître les arbres, les oiseaux, les traces. Vous rentrez plus lent.', d: ['2h · Aube', 'Guide privé', 'Inclus dans le séjour'] },
  { n: '02', t: 'SPA sur la rivière', b: 'Massages en cabane ouverte sur la rivière. Huiles essentielles distillées sur place. Sons de l\'eau, rien d\'autre.', d: ['60 à 120 min', 'Duo possible', 'Sur réservation'] },
  { n: '03', t: 'Table des chefs', b: 'Une seule table, dix couverts, trois plats. Le chef cuisine devant vous avec ce que la forêt et le marché ont donné ce jour-là.', d: ['3 services', '10 places seulement', 'Menu unique du jour'] },
  { n: '04', t: 'Excursion en pirogue', b: 'Descente lente de la rivière à l\'aube. Silence total. Vous croisez les oiseaux, parfois un cerf. Petit-déjeuner sur l\'eau.', d: ['3h · Aube', 'Piroguier expérimenté', 'Petit-déjeuner inclus'] },
]

export default function Experiences() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ex-item').forEach(item => {
        gsap.from(item, {
          y: 24, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={ref} style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div style={{ padding: 'calc(var(--nav-h) + 60px) clamp(24px,5vw,80px) clamp(48px,6vw,80px)', borderBottom: '1px solid var(--line)' }}>
        <div className="eyebrow ex-item"><span className="t-label" style={{ color: 'var(--moss)' }}>Ce qu'on vit ici</span></div>
        <h1 className="ex-item" style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(48px,9vw,120px)',
          fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.022em', color: 'var(--forest)',
        }}>
          Nos<br /><span style={{ fontStyle: 'italic', color: 'var(--moss)' }}>expériences</span>.
        </h1>
      </div>

      <div style={{ padding: '0 clamp(24px,5vw,80px)' }}>
        {EXPERIENCES.map(({ n, t, b, d }) => (
          <div key={n} className="ex-item ex-row" style={{
            display: 'grid', gridTemplateColumns: '60px 1fr auto',
            gap: 'clamp(1.5rem, 3vw, 3rem)', alignItems: 'start',
            padding: 'clamp(28px,4vw,52px) 0',
            borderBottom: '1px solid var(--line)',
            transition: 'padding-left 0.3s ease',
          }}
            onMouseEnter={(e) => e.currentTarget.style.paddingLeft = '12px'}
            onMouseLeave={(e) => e.currentTarget.style.paddingLeft = '0'}
          >
            <p className="t-label" style={{ color: 'var(--soft)', paddingTop: 4 }}>{n}</p>
            <div>
              <h2 style={{
                fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,42px)',
                fontWeight: 300, letterSpacing: '-0.01em', color: 'var(--forest)',
                marginBottom: 14,
              }}>{t}</h2>
              <p className="t-body" style={{ maxWidth: '54ch', marginBottom: 20 }}>{b}</p>
              <div style={{ display: 'flex', gap: 'clamp(14px, 3vw, 28px)', flexWrap: 'wrap' }}>
                {d.map(item => <span key={item} className="t-label" style={{ color: 'var(--moss)' }}>{item}</span>)}
              </div>
            </div>
            <p className="ex-arrow" style={{
              fontSize: 20, color: 'var(--soft)', paddingTop: 2,
              transition: 'transform 0.3s, color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(4px,-4px)'; e.currentTarget.style.color = 'var(--moss)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.color = 'var(--soft)' }}
            >↗</p>
          </div>
        ))}
      </div>

      <CTASection title="COMPOSEZ\nVOTRE SÉJOUR."
        subtitle="Dites-nous ce que vous voulez vivre. On s'occupe du reste."
        primary={{ label: 'Nous écrire', to: '/contact' }}
        secondary={{ label: 'Voir les refuges', to: '/refuges' }}
        variant="dark"
      />

      <style>{`
        @media (max-width: 640px) {
          .ex-row { grid-template-columns: 44px 1fr !important; gap: 1rem !important; }
          .ex-arrow { display: none !important; }
        }
      `}</style>
    </main>
  )
}
