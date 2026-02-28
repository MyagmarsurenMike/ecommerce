'use client';

import { useState } from 'react';
import { Select } from 'antd';
import { orders, Order } from '@/data/orders';

type StatusTab = 'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

const statusConfig: Record<string, { bg: string; text: string }> = {
  Processing: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Shipped:    { bg: 'bg-amber-100', text: 'text-amber-700' },
  Delivered:  { bg: 'bg-green-100', text: 'text-green-700' },
  Cancelled:  { bg: 'bg-red-100', text: 'text-red-700' },
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const avatarColors = ['#6366F1', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6', '#14B8A6', '#F97316', '#EF4444'];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export default function AdminOrders() {
  const [activeStatusTab, setActiveStatusTab] = useState<StatusTab>('All');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const statusTabs: StatusTab[] = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = (activeStatusTab === 'All'
    ? orders
    : orders.filter((o) => o.status === activeStatusTab)
  ).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'amount_desc') return b.amount - a.amount;
    if (sortBy === 'amount_asc') return a.amount - b.amount;
    return 0;
  });

  const tabCounts: Record<StatusTab, number> = {
    All: orders.length,
    Processing: orders.filter((o) => o.status === 'Processing').length,
    Shipped: orders.filter((o) => o.status === 'Shipped').length,
    Delivered: orders.filter((o) => o.status === 'Delivered').length,
    Cancelled: orders.filter((o) => o.status === 'Cancelled').length,
  };

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-admin-900 m-0 font-display">
            Orders
          </h1>
          <p className="text-admin-600 m-0 mt-1 text-sm font-body">
            Manage and track all customer orders
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-transparent text-admin-900 border border-admin-200 rounded-lg px-4 py-2 text-sm font-body font-medium cursor-pointer">
            Export CSV
          </button>
          <button className="bg-admin-900 text-white border-none rounded-lg px-4 py-2 text-sm font-body font-medium cursor-pointer">
            Create Order
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white border border-admin-200 rounded-xl overflow-hidden">
        {/* Status tab row */}
        <div className="flex border-b border-admin-200 px-6 gap-0">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveStatusTab(tab)}
              className={`px-5 py-4 border-b-2 bg-transparent text-sm font-body font-medium cursor-pointer whitespace-nowrap -mb-1 ${
                activeStatusTab === tab
                  ? 'border-b-admin-900 text-admin-900'
                  : 'border-b-transparent text-admin-600'
              }`}
            >
              {tab} {tabCounts[tab] > 0 && (
                <span className={`text-xs rounded-full px-2 py-0.5 ml-2 font-semibold inline-block ${
                  activeStatusTab === tab
                    ? 'bg-admin-900 text-white'
                    : 'bg-admin-100 text-admin-600'
                }`}>
                  {tabCounts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-admin-200">
          <Select
            value={dateRange}
            onChange={setDateRange}
            style={{ width: 160 }}
            options={[
              { label: 'All Dates', value: 'all' },
              { label: 'Last 7 Days', value: '7d' },
              { label: 'Last 30 Days', value: '30d' },
            ]}
            placeholder="DATE RANGE"
          />
          <Select
            value={sortBy}
            onChange={setSortBy}
            style={{ width: 160 }}
            options={[
              { label: 'Newest First', value: 'newest' },
              { label: 'Oldest First', value: 'oldest' },
              { label: 'Amount: High-Low', value: 'amount_desc' },
              { label: 'Amount: Low-High', value: 'amount_asc' },
            ]}
            placeholder="SORT BY"
          />
          <button className="bg-admin-50 border border-admin-200 rounded-lg px-3.5 py-2 text-sm font-body text-admin-600 cursor-pointer flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            More Filters
          </button>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[120px_1fr_120px_110px_120px_60px] px-6 py-3 bg-admin-50 border-b border-admin-200">
          {['ORDER ID', 'CUSTOMER', 'DATE', 'TOTAL', 'STATUS', ''].map((h, i) => (
            <div key={i} className="text-xs font-semibold text-admin-600 font-body uppercase tracking-widest">
              {h}
            </div>
          ))}
        </div>

        {/* Table rows */}
        {filteredOrders.map((order) => {
          const sc = statusConfig[order.status] || { bg: 'bg-admin-100', text: 'text-admin-600' };
          const initials = getInitials(order.customer);
          const bg = avatarColor(order.customer);
          return (
            <div
              key={order.id}
              className="grid grid-cols-[120px_1fr_120px_110px_120px_60px] px-6 h-16 border-b border-admin-200 items-center bg-white"
            >
              {/* Order ID */}
              <div className="text-sm font-semibold text-admin-900 font-body">
                {order.orderId}
              </div>

              {/* Customer */}
              <div className="flex items-center gap-2.5">
                <div style={{ backgroundColor: bg }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-body flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-admin-900 font-body">
                    {order.customer}
                  </div>
                  <div className="text-xs text-admin-600 font-body">
                    {order.email}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="text-sm text-admin-600 font-body">
                {order.date}
              </div>

              {/* Total */}
              <div className="text-sm font-semibold text-admin-900 font-body">
                ${order.amount.toFixed(2)}
              </div>

              {/* Status badge */}
              <div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full font-body ${sc.bg} ${sc.text}`}>
                  {order.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-center">
                <button className="bg-none border-none cursor-pointer text-admin-600 text-lg p-1">
                  ⋮
                </button>
              </div>
            </div>
          );
        })}

        {/* Pagination footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-admin-200">
          <span className="text-sm text-admin-600 font-body">
            Showing 1 to {filteredOrders.length} of 128 orders
          </span>
          <div className="flex gap-1.5 items-center">
            {['Prev', '1', '2', '3', 'Next'].map((label) => (
              <button
                key={label}
                className={`px-3 py-1.5 border border-admin-200 rounded-md text-sm font-body cursor-pointer font-medium ${
                  label === '1'
                    ? 'bg-admin-900 border-admin-900 text-white'
                    : 'bg-white text-admin-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
