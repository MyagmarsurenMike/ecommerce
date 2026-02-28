'use client';

import { useState } from 'react';
import { SearchOutlined, BellOutlined, PlusOutlined } from '@ant-design/icons';
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
          <div className="p-6">
            <h2 className="text-2xl font-bold text-admin-900 font-body">Settings</h2>
            <p className="text-admin-600">Coming soon...</p>
          </div>
        );
      default:
        return <AdminDashboardNew />;
    }
  };

  return (
    <div className="flex h-screen bg-admin-50">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main area */}
      <div className="ml-64 w-[calc(100%-16rem)] flex flex-col h-screen">
        {/* Top Header */}
        <div className="bg-white border-b border-admin-200 px-6 h-16 flex items-center gap-4 sticky top-0 z-10">
          {/* Left: page title */}
          <div>
            <div className="text-base font-bold text-admin-900 font-body leading-tight">
              {config.title}
            </div>
            {config.subtitle && (
              <div className="text-xs text-admin-600 font-body">
                {config.subtitle}
              </div>
            )}
          </div>

          {/* Center: search */}
          <div className="flex-1 max-w-sm mx-auto">
            <div className="flex items-center gap-2 bg-admin-100 rounded-full px-4 py-2">
              <SearchOutlined className="text-admin-600 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="border-none bg-transparent outline-none text-sm text-admin-900 font-body w-full placeholder-admin-600"
              />
            </div>
          </div>

          {/* Right: bell + action button */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="bg-none border-none cursor-pointer text-admin-600 p-1.5 flex items-center rounded-lg hover:bg-admin-100">
              <BellOutlined className="text-lg" />
            </button>
            {config.actionLabel && (
              <button className="bg-admin-900 text-white border-none rounded-lg px-4 py-2 text-sm font-body font-medium cursor-pointer flex items-center gap-1.5 whitespace-nowrap">
                <PlusOutlined className="text-xs" />
                {config.actionLabel}
              </button>
            )}
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 bg-admin-50 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
