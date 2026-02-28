'use client';

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{
      width: '250px',
      backgroundColor: '#fff',
      borderRight: '1px solid #E2E8F0',
      padding: '1.5rem 1rem',
      minHeight: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Logo area */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2rem',
        padding: '0 0.5rem',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          backgroundColor: '#0F172A',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div>
          <div style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#0F172A',
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.2,
          }}>
            MÍNIMO
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: '#94A3B8',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Admin Portal
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.625rem 0.875rem',
                backgroundColor: isActive ? '#0F172A' : 'transparent',
                color: isActive ? '#fff' : '#64748B',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: isActive ? 600 : 400,
                textAlign: 'left',
                transition: 'background-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F1F5F9';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '1rem 0' }} />

      {/* User profile at bottom */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0 0.5rem',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#F59E0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.875rem',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          AR
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#0F172A',
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            Alex Rivera
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: '#94A3B8',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Store Manager
          </div>
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#94A3B8',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
}
