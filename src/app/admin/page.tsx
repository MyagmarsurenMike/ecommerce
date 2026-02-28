'use client';

import { useState } from 'react';
import { SearchOutlined, BellOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import AdminSidebar from '@/components/AdminSidebar';
import AdminDashboardNew from '@/components/AdminDashboardNew';
import AdminProductManagement from '@/components/AdminProductManagement';
import AdminOrders from '@/components/AdminOrders';
import AdminAnalytics from '@/components/AdminAnalytics';
import AdminCustomers from '@/components/AdminCustomers';

const tabConfig: Record<string, { title: string; subtitle: string; actionLabel: string }> = {
  dashboard: { title: 'Dashboard Overview', subtitle: 'Welcome back, Alex', actionLabel: 'Generate Report' },
  products: { title: 'Products', subtitle: '', actionLabel: 'Add Product' },
  orders: { title: 'Orders', subtitle: '', actionLabel: 'Create Order' },
  customers: { title: 'Customers', subtitle: '', actionLabel: 'Add Customer' },
  analytics: { title: 'Analytics', subtitle: '', actionLabel: 'Export Report' },
  settings: { title: 'Settings', subtitle: '', actionLabel: '' },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchValue, setSearchValue] = useState('');

  const config = tabConfig[activeTab] || tabConfig.dashboard;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardNew />;
      case 'products':
        return <AdminProductManagement />;
      case 'orders':
        return <AdminOrders />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'customers':
        return <AdminCustomers />;
      case 'settings':
        return (
          <div style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', fontFamily: "'DM Sans', sans-serif" }}>Settings</h2>
            <p style={{ color: '#64748B' }}>Coming soon...</p>
          </div>
        );
      default:
        return <AdminDashboardNew />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main area */}
      <div style={{
        marginLeft: '250px',
        width: 'calc(100% - 250px)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        {/* Top Header */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          {/* Left: page title */}
          <div style={{ flex: '0 0 auto' }}>
            <div style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0F172A',
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.2,
            }}>
              {config.title}
            </div>
            {config.subtitle && (
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: "'DM Sans', sans-serif" }}>
                {config.subtitle}
              </div>
            )}
          </div>

          {/* Center: search */}
          <div style={{ flex: 1, maxWidth: '360px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#F1F5F9',
              borderRadius: '9999px',
              padding: '0.5rem 1rem',
            }}>
              <SearchOutlined style={{ color: '#94A3B8', fontSize: '0.875rem' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.875rem',
                  color: '#0F172A',
                  fontFamily: "'DM Sans', sans-serif",
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Right: bell + action button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '6px',
            }}>
              <BellOutlined style={{ fontSize: '18px' }} />
            </button>
            {config.actionLabel && (
              <button style={{
                backgroundColor: '#0F172A',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                whiteSpace: 'nowrap',
              }}>
                <PlusOutlined style={{ fontSize: '13px' }} />
                {config.actionLabel}
              </button>
            )}
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
