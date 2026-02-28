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
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: SidebarProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AD';
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-admin-200 px-4 py-6 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo area */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-9 h-9 bg-admin-900 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold text-admin-900 font-body leading-tight">
            MÍNIMO
          </div>
          <div className="text-xs text-admin-600 font-body">
            Admin Portal
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg border-none cursor-pointer text-sm font-body text-left transition-colors duration-150 ${
                isActive
                  ? 'bg-admin-900 text-white font-semibold'
                  : 'bg-transparent text-admin-600 font-normal hover:bg-admin-100'
              }`}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="h-px bg-admin-200 my-4" />

      {/* User profile at bottom */}
      <div className="flex items-center gap-3 px-2">
        <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs font-body">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-admin-900 font-body whitespace-nowrap overflow-hidden text-overflow-ellipsis">
            {user?.user_metadata?.full_name || user?.email || 'Admin'}
          </div>
          <div className="text-xs text-admin-600 font-body">
            Store Manager
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-none border-none cursor-pointer text-admin-600 hover:text-red-500 transition-colors p-1 flex items-center"
          title="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
}
