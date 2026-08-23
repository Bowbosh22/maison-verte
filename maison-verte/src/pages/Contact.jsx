import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const input = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid var(--line)',
  padding: '14px 0', fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 300,
  color: 'var(--forest)', outline: 'none',
  transition: 'border-color 0.3s',
}

export default function Contact() {
  const ref = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', dates: '', refuge: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    gsap.from(ref.current.querySelectorAll('.ct-item'), {
      y: 28, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.15,
    })
  }, [])

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = e => { e.preventDefault(); setSent(true) }

  return (
    <main ref={ref} style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div className="ct-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 8rem)',
        padding: 'calc(var(--nav-h) + 60px) clamp(24px,5vw,80px) clamp(4rem, 8vw, 8rem)',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div>
          <div className="eyebrow ct-item"><span className="t-label" style={{ color: 'var(--moss)' }}>Réserver</span></div>
          <h1 className="ct-item" style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(40px,7vw,90px)',
            fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.022em',
            color: 'var(--forest)', marginBottom: 'clamp(24px, 3vw, 32px)',
          }}>
            Une nuit<br /><span style={{ fontStyle: 'italic', color: 'var(--moss)' }}>rare</span>.
          </h1>
          <p className="t-body ct-item" style={{ maxWidth: '42ch', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
            Envoyez-nous vos dates et vos envies. Nous vous répondons sous 24h avec une proposition sur mesure. Aucun paiement à l'avance sur ce formulaire.
          </p>
          <div className="ct-item" style={{
            display: 'flex', flexDirection: 'column', gap: 24,
            borderTop: '1px solid var(--line)', paddingTop: 32,
          }}>
            {[
              { l: 'Adresse', v: 'Route de la forêt, PK 42, Congo' },
              { l: 'Téléphone', v: '+242 06 411 42 56' },
              { l: 'Email', v: 'reservations@maison-verte.com' },
              { l: 'Ouverture', v: 'Toute l\'année' },
            ].map(({ l, v }) => (
              <div key={l}>
                <p className="t-label" style={{ color: 'var(--soft)', marginBottom: 4 }}>{l}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--forest)' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ct-item">
          {sent ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', minHeight: 320, textAlign: 'center', gap: 20,
              background: 'var(--sage)', padding: '48px 24px',
            }}>
              <div style={{ width: 40, height: 1, background: 'var(--moss)' }} />
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: 'var(--forest)' }}>Merci.</p>
              <p className="t-serif-sm" style={{ color: 'var(--soft)' }}>
                Nous revenons vers vous sous 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
              {[
                { k: 'name', l: 'Nom complet', t: 'text', r: true },
                { k: 'email', l: 'Email', t: 'email', r: true },
                { k: 'phone', l: 'Téléphone', t: 'tel', r: false },
                { k: 'dates', l: 'Dates souhaitées', t: 'text', r: false },
              ].map(({ k, l, t, r }) => (
                <div key={k}>
                  <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: 8 }}>{l}</label>
                  <input type={t} required={r} value={form[k]} onChange={update(k)} style={input}
                    onFocus={e => e.target.style.borderBottomColor = 'var(--moss)'}
                    onBlur={e => e.target.style.borderBottomColor = 'var(--line)'}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: 8 }}>Refuge souhaité</label>
                <select value={form.refuge} onChange={update('refuge')} style={{ ...input, cursor: 'pointer' }}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--moss)'}
                  onBlur={e => e.target.style.borderBottomColor = 'var(--line)'}
                >
                  <option value="">À déterminer avec vous</option>
                  <option value="canopee">La Canopée — Cabane sur pilotis</option>
                  <option value="villa">Villa Sereine — Villa privée</option>
                  <option value="source">Refuge Source — Suite au bord de l'eau</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: 8 }}>Vos envies (optionnel)</label>
                <textarea value={form.message} onChange={update('message')} rows={5} style={{ ...input, resize: 'none' }}
                  placeholder="Anniversaire, spa, gastronomie, calme absolu..."
                  onFocus={e => e.target.style.borderBottomColor = 'var(--moss)'}
                  onBlur={e => e.target.style.borderBottomColor = 'var(--line)'}
                />
              </div>

              <button type="submit" className="btn-solid" style={{ marginTop: 8 }}>
                Envoyer la demande
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ct-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
