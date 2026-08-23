import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTASection({
  title = 'PRENEZ LE\nCHEMIN.',
  subtitle = 'Une nuit rare. Une matinée qu\'on n\'oublie pas.',
  primary = { label: 'Réserver un refuge', to: '/contact' },
  secondary = { label: 'Découvrir les refuges', to: '/refuges' },
  variant = 'light',
}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.cta-item'), {
        y: 30, opacity: 0, duration: 1, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 78%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const dark = variant === 'dark'

  return (
    <section ref={ref} style={{
      background: dark ? 'var(--forest)' : 'var(--ivory)',
      textAlign: 'center',
      padding: 'clamp(80px, 14vw, 160px) clamp(24px, 5vw, 80px)',
      borderTop: dark ? 'none' : '1px solid var(--line)',
    }}>
      <h2 className="cta-item" style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(48px, 10vw, 130px)',
        fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.025em',
        color: dark ? 'var(--off-white)' : 'var(--forest)',
        whiteSpace: 'pre-line', maxWidth: 900, margin: '0 auto',
      }}>{title}</h2>

      <p className="cta-item t-serif-sm" style={{
        color: dark ? 'rgba(250,247,241,0.65)' : 'var(--soft)',
        marginTop: 24,
      }}>{subtitle}</p>

      <div className="cta-item" style={{
        display: 'flex', gap: 14, justifyContent: 'center',
        marginTop: 44, flexWrap: 'wrap',
      }}>
        <Link to={primary.to} className="btn-solid">{primary.label}</Link>
        <Link to={secondary.to} className="btn-outline">{secondary.label}</Link>
      </div>
    </section>
  )
}
