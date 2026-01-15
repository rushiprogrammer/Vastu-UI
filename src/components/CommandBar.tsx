import React from 'react';

interface CommandBarCommand {
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface CommandBarProps {
  commands?: CommandBarCommand[];
}

export const CommandBar: React.FC<CommandBarProps> = ({ commands = [] }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        background: 'var(--surface)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        flexWrap: 'wrap',
      }}
    >
      {commands.map((cmd, idx) => (
        <button
          key={idx}
          onClick={cmd.onClick}
          disabled={cmd.disabled}
          title={cmd.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: cmd.disabled ? 'var(--border)' : 'var(--accent)',
            color: cmd.disabled ? 'var(--muted)' : '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: cmd.disabled ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            opacity: cmd.disabled ? 0.6 : 1,
            transition: 'all 0.2s',
          }}
        >
          <span>{cmd.icon}</span>
          <span>{cmd.label}</span>
        </button>
      ))}
    </div>
  );
};
