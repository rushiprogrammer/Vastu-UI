import React from 'react';

export interface FooterSection {
  title?: string;
  items: FooterItem[];
}

export interface FooterItem {
  label: string;
  href?: string;
  icon?: string;
  onClick?: () => void;
}

interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
  logo?: string;
  logoText?: string;
  socialLinks?: FooterItem[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  layout?: 'vertical' | 'horizontal';
}

export const Footer: React.FC<FooterProps> = ({
  sections = [],
  copyright,
  logo,
  logoText,
  socialLinks = [],
  backgroundColor = 'var(--surface)',
  textColor = 'var(--text)',
  accentColor = 'var(--accent)',
  layout = 'vertical',
}) => {
  const handleItemClick = (item: FooterItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.open(item.href, '_blank');
    }
  };

  return (
    <footer
      style={{
        background: backgroundColor,
        color: textColor,
        borderTop: `1px solid var(--border)`,
        marginTop: 'auto',
      }}
    >
      {/* Main Content */}
      <div
        style={{
          padding: '2rem 1.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Header with Logo */}
        {(logo || logoText) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              paddingBottom: '1.5rem',
              borderBottom: `1px solid var(--border)`,
            }}
          >
            {logo && (
              <img
                src={logo}
                alt="Logo"
                style={{ height: '40px', width: 'auto' }}
              />
            )}
            {logoText && (
              <span style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
                {logoText}
              </span>
            )}
          </div>
        )}

        {/* Sections */}
        {sections.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: layout === 'horizontal' ? `repeat(${Math.min(sections.length, 4)}, 1fr)` : '1fr',
              gap: '2rem',
              marginBottom: '2rem',
            }}
          >
            {sections.map((section, idx) => (
              <div key={idx}>
                {section.title && (
                  <h3
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      letterSpacing: '-0.3px',
                      textTransform: 'uppercase',
                      opacity: 0.8,
                    }}
                  >
                    {section.title}
                  </h3>
                )}
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: textColor,
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s var(--ease-smooth)',
                            opacity: 0.8,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = accentColor;
                            (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = textColor;
                            (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8';
                          }}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => handleItemClick(item)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: textColor,
                            cursor: item.onClick ? 'pointer' : 'default',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s var(--ease-smooth)',
                            opacity: 0.8,
                            padding: 0,
                            textAlign: 'left',
                            fontFamily: 'inherit',
                          }}
                          onMouseEnter={(e) => {
                            if (item.onClick) {
                              (e.currentTarget as HTMLButtonElement).style.color = accentColor;
                              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                            }
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = textColor;
                            (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
                          }}
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
              paddingBottom: '1.5rem',
              borderBottom: `1px solid var(--border)`,
              flexWrap: 'wrap',
            }}
          >
            {socialLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleItemClick(link)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(249, 115, 22, 0.1)',
                  border: '1px solid var(--border)',
                  color: accentColor,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s var(--ease-smooth)',
                  padding: 0,
                }}
                title={link.label}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = accentColor;
                  (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(249, 115, 22, 0.1)';
                  (e.currentTarget as HTMLButtonElement).style.color = accentColor;
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                }}
              >
                {link.icon && (
                  <span className="material-icons" style={{ fontSize: '1.2em' }}>
                    {link.icon}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Copyright */}
        {copyright && (
          <div
            style={{
              textAlign: 'center',
              fontSize: '0.8125rem',
              opacity: 0.6,
              letterSpacing: '-0.2px',
            }}
          >
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
};
