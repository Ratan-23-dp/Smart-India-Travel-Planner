import { useWeather } from '../hooks/useWeather'

export default function WeatherCard({ city }) {
  const { weather, forecast, loading } = useWeather(city)

  if (loading) return (
    <div style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ color: 'var(--text3)', fontSize: '0.875rem' }}>Loading weather...</div>
    </div>
  )

  if (!weather) return null

  return (
    <div style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginBottom: '0.5rem' }}>Current Weather in {city}</div>
      <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{weather.icon}</div>
      <div style={{ fontSize: '2.5rem', fontWeight: 300, fontFamily: "'Playfair Display',serif" }}>{weather.temp}°C</div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text2)', marginTop: '0.25rem' }}>{weather.desc} · Feels like {weather.feels}°C</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginTop: '1rem' }}>
        {[
          { val: `${weather.humidity}%`, lbl: 'Humidity' },
          { val: `${weather.wind} km/h`, lbl: 'Wind' },
          { val: `UV ${weather.uv}`, lbl: 'UV Index' },
        ].map((s) => (
          <div key={s.lbl} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{s.val}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {forecast.length > 0 && (
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem', marginTop: '1.5rem' }}>
          {forecast.map((f, i) => (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 10, padding: '0.75rem', minWidth: 72, textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginBottom: '0.3rem' }}>{f.d}</div>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{f.i}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{f.t}°</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
