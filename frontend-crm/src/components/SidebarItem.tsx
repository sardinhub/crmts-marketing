import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

export function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        background: active ? 'var(--glass)' : 'transparent',
        color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
        transition: 'all 0.3s ease'
      }}
    >
      {icon}
      <span style={{ fontWeight: active ? '600' : '400' }}>{label}</span>
    </div>
  );
}
