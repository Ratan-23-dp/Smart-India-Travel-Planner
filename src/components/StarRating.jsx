export default function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: '#fbbf24', fontSize: '0.8rem' }}>
          {i <= Math.floor(rating) ? '★' : i - 0.5 <= rating ? '✦' : '☆'}
        </span>
      ))}
      <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '0.2rem' }}>{rating}</span>
    </div>
  )
}
