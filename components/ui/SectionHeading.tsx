interface SectionHeadingProps {
  tag: string
  heading: string
  subtext?: string
  centered?: boolean
  className?: string
}

export default function SectionHeading({
  tag,
  heading,
  subtext,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <span
        style={{
          display: 'inline-block',
          fontSize: '11px',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--accent)',
          background: 'var(--color-cyan-bg)',
          border: '1px solid var(--color-cyan-border)',
          borderRadius: '4px',
          padding: '4px 12px',
          marginBottom: '20px',
        }}
      >
        {tag}
      </span>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(28px, 4vw, 46px)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: subtext ? '16px' : 0,
        }}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: centered ? '640px' : undefined,
            margin: centered ? '0 auto' : undefined,
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}
