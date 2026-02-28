'use client';

import { useState } from 'react';

const mockCustomers = [
  { id: 'SJ', name: 'Sarah Jenkins', email: 'sarah.j@email.com', orders: 12, spent: 1450, lastActive: 'TODAY' },
  { id: 'MC', name: 'Marcus Chen', email: 'm.chen@provider.net', orders: 5, spent: 620.40, lastActive: '2 DAYS AGO' },
  { id: 'ER', name: 'Elena Rodriguez', email: 'elena.rod@web.com', orders: 28, spent: 4120, lastActive: 'YESTERDAY' },
  { id: 'DS', name: 'David Smith', email: 'd.smith@mail.org', orders: 2, spent: 115, lastActive: '1 WEEK AGO' },
  { id: 'AK', name: 'Aisha Khan', email: 'aisha.k@service.io', orders: 15, spent: 2100.50, lastActive: '3 HOURS AGO' },
];

const avatarColors = ['#6366F1', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function isRecentActivity(label: string) {
  return label === 'TODAY' || label === 'YESTERDAY' || label.includes('HOURS');
}

export default function AdminCustomers() {
  const [search, setSearch] = useState('');

  const filteredCustomers = mockCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-admin-900 m-0 font-display">
            Customers Directory
          </h1>
          <p className="text-admin-600 m-0 mt-1 text-sm font-body">
            View and manage your customer base
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-transparent text-admin-900 border border-admin-200 rounded-lg px-4 py-2 text-sm font-body font-medium cursor-pointer">
            Export CSV
          </button>
          <button className="bg-transparent text-admin-900 border border-admin-200 rounded-lg px-4 py-2 text-sm font-body font-medium cursor-pointer flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { title: 'TOTAL CUSTOMERS', value: '12,482', change: '+12%', isPositive: true, iconBg: 'bg-blue-100', color: '#1D4ED8' },
          { title: 'ACTIVE THIS MONTH', value: '3,120', change: '+5.4%', isPositive: true, iconBg: 'bg-green-100', color: '#16A34A' },
          { title: 'AVG. CUSTOMER VALUE', value: '$412.50', change: 'Stable', isPositive: true, iconBg: 'bg-amber-100', color: '#B45309' },
        ].map((card) => (
          <div key={card.title} className="bg-white border border-admin-200 rounded-xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-admin-600 font-body uppercase tracking-widest mb-1">
                {card.title}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-admin-900 font-body leading-tight">
                  {card.value}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full font-body ${
                  card.change === 'Stable'
                    ? 'bg-admin-100 text-admin-600'
                    : (card.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')
                }`}>
                  {card.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + count */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 bg-white border border-admin-200 rounded-lg px-3.5 py-2 w-80">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none bg-transparent outline-none text-sm text-admin-900 font-body w-full"
          />
        </div>
        <span className="text-sm text-admin-600 font-body">
          Showing 1-{filteredCustomers.length} of 12,482
        </span>
      </div>

      {/* Customers table card */}
      <div className="bg-white border border-admin-200 rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_2fr_100px_120px_140px_48px] px-6 py-3 bg-admin-50 border-b border-admin-200">
          {['CUSTOMER NAME', 'EMAIL ADDRESS', 'ORDERS', 'TOTAL SPENT', 'LAST ACTIVE', ''].map((h) => (
            <div key={h} className="text-xs font-semibold text-admin-600 font-body uppercase tracking-widest">
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {filteredCustomers.map((customer) => {
          const bg = avatarColor(customer.name);
          const recent = isRecentActivity(customer.lastActive);
          return (
            <div
              key={customer.id}
              className="grid grid-cols-[2fr_2fr_100px_120px_140px_48px] px-6 py-4 border-b border-admin-200 items-center bg-white"
            >
              {/* Customer name + avatar */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-admin-100 flex items-center justify-center text-admin-600 text-xs font-bold font-body flex-shrink-0">
                  {customer.id}
                </div>
                <span className="text-sm font-semibold text-admin-900 font-body">
                  {customer.name}
                </span>
              </div>

              {/* Email */}
              <div className="text-sm text-admin-600 font-body">
                {customer.email}
              </div>

              {/* Orders */}
              <div className="text-sm text-admin-900 font-body font-medium">
                {customer.orders}
              </div>

              {/* Spent */}
              <div className="text-sm font-semibold text-admin-900 font-body">
                ${customer.spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              {/* Last Active badge */}
              <div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full font-body whitespace-nowrap ${
                  recent ? 'bg-green-100 text-green-700' : 'bg-admin-100 text-admin-600'
                }`}>
                  {customer.lastActive}
                </span>
              </div>

              {/* Action icon */}
              <div className="flex justify-center">
                <button className="bg-none border-none cursor-pointer text-admin-600 text-lg p-1">
                  ⋮
                </button>
              </div>
            </div>
          );
        })}

        {/* Pagination */}
        <div className="flex justify-between items-center p-4">
          <button className="px-3.5 py-1.5 border border-admin-200 rounded-md bg-white text-admin-600 text-sm font-body cursor-pointer">
            Previous
          </button>
          <div className="flex gap-1.5 items-center">
            {['1', '2', '3', '...', '120'].map((label) => (
              <button
                key={label}
                className={`px-2.5 py-1.5 border border-admin-200 rounded-md text-sm font-body cursor-pointer font-medium min-w-9 ${
                  label === '1'
                    ? 'bg-admin-900 text-white border-admin-900'
                    : 'bg-white text-admin-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="px-3.5 py-1.5 border border-admin-200 rounded-md bg-white text-admin-600 text-sm font-body cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
