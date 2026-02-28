'use client';

import Link from 'next/link';
import { ShoppingOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Input } from 'antd';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { itemCount } = useCart();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/products?q=${encodeURIComponent(value)}`);
      setSearchInput('');
    }
  };

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

            <button className="p-2 text-stone-dark hover:text-stone-accent transition-colors hidden sm:block">
              <UserOutlined style={{ fontSize: 18 }} />
            </button>

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
