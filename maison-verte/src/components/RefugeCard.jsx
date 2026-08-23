import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function RefugeCard({ refuge, index = 0 }) {
  const cardRef = useRef(null)
  const imgRef  = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 44, opacity: 0, duration: 1.1, ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    }, el)
    return () => ctx.revert()
  }, [index])

  const onEnter = () => gsap.to(imgRef.current, { scale: 1.04, duration: 0.7, ease: 'power2.out' })
  const onLeave = () => gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: 'power2.out' })

  return (
    <Link to={`/refuge/${refuge.slug}`} ref={cardRef}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      aria-label={`Voir ${refuge.name}`}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', background: 'var(--ivory)' }}>
        <img ref={imgRef} src={refuge.coverImage} alt={refuge.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center' }} />
        <span className="t-label" style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(250,247,241,0.9)', color: 'var(--moss)',
          padding: '6px 12px', backdropFilter: 'blur(6px)',
        }}>
          {refuge.category}
        </span>
      </div>

      <div style={{ padding: '20px 0 24px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 60%', minWidth: 0 }}>
            <h3 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 2.4vw, 30px)',
              fontWeight: 300, color: 'var(--forest)', marginBottom: 6, lineHeight: 1.1,
            }}>
              {refuge.name}
            </h3>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic',
              color: 'var(--soft)', marginBottom: 8,
            }}>
              {refuge.tagline}
            </p>
            <p className="t-label" style={{ color: 'var(--soft)' }}>{refuge.location}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(15px, 1.3vw, 18px)',
              fontWeight: 400, color: 'var(--moss)', whiteSpace: 'nowrap',
            }}>
              {refuge.price}
            </p>
            <p className="t-label" style={{ color: 'var(--soft)', marginTop: 4 }}>{refuge.priceUnit}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 14, flexWrap: 'wrap' }}>
          {[`${refuge.surface} m²`, `${refuge.guests} personnes`, `${refuge.bathrooms} sdb`].map((v) => (
            <span key={v} style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--soft)' }}>{v}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
