'use client';

import Link from 'next/link';
import { ShoppingOutlined, SearchOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Badge, Input, Dropdown } from 'antd';
import { useCartStore } from '@/store/cartStore';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const itemCount = useCartStore((s) => s.count)();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/products?q=${encodeURIComponent(value)}`);
      setSearchInput('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const userMenuItems = [
    {
      key: 'orders',
      label: <Link href="/account/orders">My Orders</Link>,
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-stone-dark/10">
      <div className="max-w-7xl mx-auto px-6 py-3.5">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-display font-semibold text-stone-dark shrink-0"
          >
            MÍNIMO
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7 shrink-0">
            <Link
              href="/"
              className="text-sm font-body text-stone-dark hover:text-stone-accent"
            >
              Overview
            </Link>
            <Link
              href="/products"
              className="text-sm font-body text-stone-dark hover:text-stone-accent"
            >
              Shop
            </Link>
            <Link
              href="/admin"
              className="text-sm font-body text-stone-dark/50 hover:text-stone-accent"
            >
              Catalog
            </Link>
          </div>

          {/* Centered search */}
          <div className="flex-1 max-w-sm mx-auto hidden sm:block">
            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined className="text-stone-dark/40" />}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onPressEnter={(e) =>
                handleSearch((e.target as HTMLInputElement).value)
              }
              className="rounded-full"
              style={{
                backgroundColor: 'rgba(26,26,26,0.04)',
                border: '1px solid rgba(26,26,26,0.12)',
                borderRadius: '9999px',
              }}
            />
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            {/* Mobile search */}
            <button
              onClick={() => handleSearch(searchInput)}
              className="sm:hidden p-2 text-stone-dark hover:text-stone-accent transition-colors"
            >
              <SearchOutlined style={{ fontSize: 18 }} />
            </button>

            {/* User icon / dropdown */}
            {user ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <button className="p-2 text-stone-accent hover:text-stone-dark transition-colors hidden sm:block">
                  <UserOutlined style={{ fontSize: 18 }} />
                </button>
              </Dropdown>
            ) : (
              <Link
                href="/login"
                className="hidden sm:block text-sm font-body text-stone-dark/60 hover:text-stone-accent transition-colors"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => router.push('/cart')}
              className="relative p-2 text-stone-dark hover:text-stone-accent transition-colors"
            >
              <Badge count={itemCount} showZero={false}>
                <ShoppingOutlined style={{ fontSize: 18 }} />
              </Badge>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
