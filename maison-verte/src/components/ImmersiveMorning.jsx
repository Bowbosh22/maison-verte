import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const SECTIONS = [
  { id: 'dawn',
    content: { type: 'split', top: 'RÉVEILLEZ-VOUS', bot: 'EN PLEINE NATURE', italic: true, tag: 'I — L\'AUBE', pos: 'bottom-left' } },
  { id: 'path',
    content: { type: 'split-details', top: 'LE', bot: 'CHEMIN', tag: 'II — L\'ARRIVÉE', details: ['Sentier privé', 'Végétation endémique', 'Silence gardé'], pos: 'top-left' } },
  { id: 'refuge',
    content: { type: 'right-tags', top: 'VOTRE', bot: 'REFUGE', sub: 'Un lieu à vous. Rien qu\'à vous.', tag: 'III — LA VILLA', tags: ['90 M²', 'TERRASSE PRIVÉE', 'BAIN NATUREL'], pos: 'right' } },
  { id: 'table',
    content: { type: 'split-sub', top: 'TABLE', bot: 'DES SENS', sub: 'Le premier café du matin, en terrasse.', tag: 'IV — L\'INSTANT', pos: 'bottom-right' } },
  { id: 'silence',
    content: { type: 'split', top: 'BAIN DE', bot: 'FORÊT', italic: true, tag: 'V — LE SILENCE', pos: 'bottom' } },
  { id: 'final',
    content: { type: 'cta', top: 'RÉSERVEZ', bot: 'VOTRE SÉJOUR', tag: 'VI — L\'INVITATION', pos: 'center' } },
]

function pos(p) {
  const base = { position: 'absolute', padding: 'clamp(28px, 5vw, 72px)', maxWidth: 'min(680px, 90vw)' }
  if (p === 'center')       return { ...base, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', maxWidth: '100%' }
  if (p === 'bottom-left')  return { ...base, bottom: 0, left: 0 }
  if (p === 'bottom-right') return { ...base, bottom: 0, right: 0, textAlign: 'right' }
  if (p === 'top-left')     return { ...base, top: 'calc(var(--nav-h) + 20px)', left: 0 }
  if (p === 'right')        return { ...base, top: '50%', right: 0, transform: 'translateY(-50%)', textAlign: 'right' }
  if (p === 'bottom')       return { ...base, bottom: 0, left: 0, right: 0, maxWidth: '100%' }
  return base
}

const TIT = {
  fontFamily: 'var(--serif)', fontSize: 'clamp(52px, 10vw, 148px)',
  fontWeight: 300, lineHeight: 0.88, letterSpacing: '-0.022em', margin: 0,
  textShadow: '0 2px 30px rgba(0,0,0,0.35)',
}

const TAG = {
  fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500,
  letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(250,247,241,0.85)',
  marginBottom: 18, textShadow: '0 1px 8px rgba(0,0,0,0.7)',
}

function SectionText({ section, isActive }) {
  const { content: c } = section
  const wrapStyle = { ...pos(c.pos), opacity: isActive ? 1 : 0, transition: 'opacity 0.8s ease', pointerEvents: isActive ? 'auto' : 'none' }
  const cream = { color: 'var(--off-white)' }
  const terra = { color: '#E8C99A' }

  if (c.type === 'split') return (
    <div style={wrapStyle}>
      <p style={TAG}>{c.tag}</p>
      <p style={{ ...TIT, ...cream }}>{c.top}</p>
      <p style={{ ...TIT, ...(c.italic ? terra : cream), fontStyle: c.italic ? 'italic' : 'normal' }}>{c.bot}</p>
    </div>
  )
  if (c.type === 'split-details') return (
    <div style={wrapStyle}>
      <p style={TAG}>{c.tag}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(16px, 3vw, 48px)', flexWrap: 'wrap' }}>
        <div>
          <p style={{ ...TIT, ...cream }}>{c.top}</p>
          <p style={{ ...TIT, ...terra }}>{c.bot}</p>
        </div>
        <div style={{ paddingBottom: 8 }}>
          {c.details.map(d => <p key={d} style={{ ...TAG, marginBottom: 10, color: 'rgba(250,247,241,0.85)' }}>{d}</p>)}
        </div>
      </div>
    </div>
  )
  if (c.type === 'right-tags') return (
    <div style={wrapStyle}>
      <p style={TAG}>{c.tag}</p>
      <p style={{ ...TIT, ...cream }}>{c.top}</p>
      <p style={{ ...TIT, ...terra }}>{c.bot}</p>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.6vw, 22px)', fontStyle: 'italic', color: 'rgba(250,247,241,0.85)', marginTop: 16, textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}>{c.sub}</p>
      <div style={{ display: 'flex', gap: 20, marginTop: 20, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        {c.tags.map(t => <span key={t} style={{ ...TAG, marginBottom: 0 }}>{t}</span>)}
      </div>
    </div>
  )
  if (c.type === 'split-sub') return (
    <div style={wrapStyle}>
      <p style={{ ...TIT, ...cream }}>{c.top}</p>
      <p style={{ ...TIT, ...terra, fontStyle: 'italic' }}>{c.bot}</p>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.6vw, 22px)', fontStyle: 'italic', color: 'rgba(250,247,241,0.85)', marginTop: 16, textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}>{c.sub}</p>
      <p style={{ ...TAG, marginTop: 10 }}>{c.tag}</p>
    </div>
  )
  if (c.type === 'cta') return (
    <div style={wrapStyle}>
      <p style={{ ...TAG, marginBottom: 28 }}>{c.tag}</p>
      <p style={{ ...TIT, ...cream }}>{c.top}</p>
      <p style={{ ...TIT, ...terra, fontStyle: 'italic' }}>{c.bot}</p>
      <div style={{ marginTop: 44 }}>
        <Link to="/contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '14px 32px', border: '1px solid var(--off-white)',
          fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--off-white)', background: 'transparent',
        }}>DEMANDER UNE RÉSERVATION →</Link>
      </div>
    </div>
  )
  return null
}

export default function ImmersiveMorning() {
  const wrapRef  = useRef(null)
  const videoRef = useRef(null)
  const barRef   = useRef(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [vidReady, setVidReady] = useState(false)
  const [vidError, setVidError] = useState(false)
  const [loadPercent, setLoadPercent] = useState(0)

  useEffect(() => {
    let cancelled = false
    const url = '/assets/lodge-morning.mp4'

    async function preload() {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Fetch failed')
        const total = parseInt(response.headers.get('content-length') || '0', 10)
        const reader = response.body.getReader()
        const chunks = []
        let received = 0

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (cancelled) return
          chunks.push(value)
          received += value.length
          if (total > 0) setLoadPercent(Math.min(99, Math.round((received / total) * 100)))
        }

        if (cancelled) return
        const blob = new Blob(chunks, { type: 'video/mp4' })
        const blobUrl = URL.createObjectURL(blob)
        const vid = videoRef.current
        if (vid) {
          vid.src = blobUrl
          vid.load()
          const onReady = () => {
            setLoadPercent(100)
            setTimeout(() => setVidReady(true), 400)
            vid.removeEventListener('loadedmetadata', onReady)
          }
          vid.addEventListener('loadedmetadata', onReady)
        }
      } catch (err) {
        console.warn('Preload failed:', err)
        if (!cancelled) setVidError(true)
      }
    }

    preload()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const N = SECTIONS.length

    const update = () => {
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.max(0, Math.min(total, -rect.top))
      const p = total > 0 ? scrolled / total : 0

      const vid = videoRef.current
      if (vid && vidReady && vid.duration > 0) vid.currentTime = vid.duration * p
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`

      const idx = Math.min(N - 1, Math.floor(p * N))
      setCurrentIdx((cur) => (cur === idx ? cur : idx))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [vidReady])

  return (
    <div ref={wrapRef} style={{ height: '700vh' }} aria-label="Une matinée au lodge">
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--forest)' }}>

        {/* LOADER PREMIUM */}
        {!vidReady && !vidError && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 32, background: 'var(--forest)',
          }}>
            <div style={{ width: 32, height: 1, background: 'var(--terracotta)', opacity: 0.8 }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)',
                fontStyle: 'italic', color: 'var(--off-white)',
                margin: 0, marginBottom: 12,
              }}>
                Préparation de votre matinée
              </p>
              <p style={{
                fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'rgba(250,247,241,0.55)', margin: 0,
              }}>
                Chargement de l'expérience
              </p>
            </div>
            <div style={{
              width: 240, maxWidth: '70vw', height: 1,
              background: 'rgba(184,149,106,0.15)',
              position: 'relative', overflow: 'hidden', marginTop: 8,
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${loadPercent}%`, background: 'var(--terracotta)',
                transition: 'width 0.4s ease',
              }} />
            </div>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.25em',
              color: 'rgba(232,201,154,0.7)', margin: 0, minHeight: 16,
            }}>
              {loadPercent}%
            </p>
          </div>
        )}

        {/* VIDÉO */}
        {!vidError && (
          <video ref={videoRef}
            muted playsInline preload="none" aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 1,
              opacity: vidReady ? 1 : 0, transition: 'opacity 1.2s ease',
            }}
            onError={() => setVidError(true)}
          />
        )}

        {/* Erreur */}
        {vidError && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--forest)',
          }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--soft)' }}>
              La vidéo n'a pas pu être chargée.
            </p>
          </div>
        )}

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(31,42,36,0.35) 0%, rgba(31,42,36,0.1) 40%, rgba(31,42,36,0.65) 100%)',
        }} />

        {/* Textes */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
          {SECTIONS.map((sec, i) => (
            <SectionText key={sec.id} section={sec} isActive={i === currentIdx} />
          ))}
        </div>

        {/* Barre progression */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(250,247,241,0.1)', zIndex: 7 }}>
          <div ref={barRef} style={{ height: '100%', background: 'var(--terracotta)', transformOrigin: 'left', transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  )
}
