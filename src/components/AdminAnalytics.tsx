'use client';

import { Select } from 'antd';
import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { orders } from '@/data/orders';
import { products, categories } from '@/data/products';

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

const avatarColors = ['#6366F1', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

const statusConfig: Record<string, { bg: string; text: string }> = {
  Processing: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Shipped:    { bg: 'bg-amber-100', text: 'text-amber-700' },
  Delivered:  { bg: 'bg-green-100', text: 'text-green-700' },
  Cancelled:  { bg: 'bg-red-100', text: 'text-red-700' },
};

const weeklyRevenue = [
  { day: 'MON', revenue: 3200 },
  { day: 'TUE', revenue: 5100 },
  { day: 'WED', revenue: 4300 },
  { day: 'THU', revenue: 6800 },
  { day: 'FRI', revenue: 5900 },
  { day: 'SAT', revenue: 8200 },
  { day: 'SUN', revenue: 7100 },
];

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('30d');

  const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
  const avgOrderValue = totalRevenue / orders.length;
  const totalOrders = orders.length;

  const ordersByCategory = categories
    .filter((c) => c !== 'All')
    .map((cat) => ({
      name: cat,
      orders: orders.filter((o) => products.find((p) => p.name === o.productName)?.category === cat).length,
    }));

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-admin-900 m-0 font-display">
            Analytics Overview
          </h1>
          <p className="text-admin-600 m-0 mt-1 text-sm font-body">
            Track your store performance and insights
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Select
            value={period}
            onChange={setPeriod}
            style={{ width: 140 }}
            options={[
              { label: 'Last 7 Days', value: '7d' },
              { label: 'Last 30 Days', value: '30d' },
              { label: 'Last 90 Days', value: '90d' },
            ]}
          />
          <button className="bg-admin-900 text-white border-none rounded-lg px-4 py-2 text-sm font-body font-medium cursor-pointer">
            Export Report
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            title: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            change: '+12.5%',
            sub: 'vs. $39,842 last month',
            isPositive: true,
            iconBg: 'bg-blue-100',
            color: '#1D4ED8',
          },
          {
            title: 'Avg. Order Value',
            value: `$${avgOrderValue.toFixed(2)}`,
            change: '+4.2%',
            sub: 'vs. $193.20 last month',
            isPositive: true,
            iconBg: 'bg-green-100',
            color: '#16A34A',
          },
          {
            title: 'Conversion Rate',
            value: '3.24%',
            change: '-0.8%',
            sub: 'vs. 4.04% last month',
            isPositive: false,
            iconBg: 'bg-amber-100',
            color: '#B45309',
          },
          {
            title: 'Total Orders',
            value: String(totalOrders),
            change: '+8.1%',
            sub: `vs. ${totalOrders - 2} last month`,
            isPositive: true,
            iconBg: 'bg-purple-100',
            color: '#7C3AED',
          },
        ].map((card) => (
          <div key={card.title} className="bg-white border border-admin-200 rounded-xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full font-body ${
                card.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {card.change}
              </span>
            </div>
            <div className="text-xs text-admin-600 font-body mb-1">
              {card.title}
            </div>
            <div className="text-xl font-bold text-admin-900 font-body leading-tight mb-1">
              {card.value}
            </div>
            <div className="text-xs text-admin-600 font-body">
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Revenue over time */}
        <div className="bg-white border border-admin-200 rounded-xl p-5">
          <h3 className="text-base font-bold text-admin-900 m-0 mb-5 font-body">
            Revenue Over Time
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyRevenue}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" style={{ fontSize: '0.72rem' }} tick={{ fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis style={{ fontSize: '0.72rem' }} tick={{ fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.8rem' }} />
              <Area type="monotone" dataKey="revenue" stroke="#0F172A" strokeWidth={2} fill="url(#revenueGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by category */}
        <div className="bg-white border border-admin-200 rounded-xl p-5">
          <h3 className="text-base font-bold text-admin-900 m-0 mb-5 font-body">
            Sales by Category
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ordersByCategory} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" style={{ fontSize: '0.72rem' }} tick={{ fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis style={{ fontSize: '0.72rem' }} tick={{ fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.8rem' }} />
              <Bar dataKey="orders" fill="#0F172A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders table */}
      <div className="bg-white border border-admin-200 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-5 border-b border-admin-200">
          <h3 className="text-base font-bold text-admin-900 m-0 font-body">
            Recent Orders
          </h3>
          <button className="bg-none border-none cursor-pointer text-sm text-admin-600 font-body underline">
            View All Orders
          </button>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[120px_1fr_120px_120px] px-6 py-3 bg-admin-50 border-b border-admin-200">
          {['ORDER ID', 'CUSTOMER', 'STATUS', 'AMOUNT'].map((h) => (
            <div key={h} className="text-xs font-semibold text-admin-600 font-body uppercase tracking-widest">
              {h}
            </div>
          ))}
        </div>

        {recentOrders.map((order) => {
          const sc = statusConfig[order.status] || { bg: 'bg-admin-100', text: 'text-admin-600' };
          const initials = getInitials(order.customer);
          const bg = avatarColor(order.customer);
          return (
            <div
              key={order.id}
              className="grid grid-cols-[120px_1fr_120px_120px] px-6 py-4 border-b border-admin-200 items-center"
            >
              <div className="text-sm font-semibold text-admin-900 font-body">
                {order.orderId}
              </div>
              <div className="flex items-center gap-2.5">
                <div style={{ backgroundColor: bg }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-body flex-shrink-0">
                  {initials}
                </div>
                <span className="text-sm text-admin-900 font-body font-medium">
                  {order.customer}
                </span>
              </div>
              <div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full font-body ${sc.bg} ${sc.text}`}>
                  {order.status}
                </span>
              </div>
              <div className="text-sm font-semibold text-admin-900 font-body">
                ${order.amount.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
