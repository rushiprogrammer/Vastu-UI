import React, { useState } from 'react';

interface TabViewTab {
  label: string;
  content: React.ReactNode;
}

interface TabViewProps {
  tabs: TabViewTab[];
  defaultTab?: number;
}

export const TabView: React.FC<TabViewProps> = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid var(--border)',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
        }}
      >
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              padding: '1rem 1.5rem',
              background: activeTab === idx ? 'var(--accent)' : 'transparent',
              color: activeTab === idx ? '#fff' : 'var(--text)',
              border: 'none',
              borderBottom: activeTab === idx ? 'none' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === idx ? 700 : 600,
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--surface)',
          borderRadius: '0 0 var(--radius-md) var(--radius-md)',
          border: '1px solid var(--border)',
          borderTop: 'none',
        }}
      >
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};
