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
  Processing: { bg: '#DBEAFE', text: '#1D4ED8' },
  Shipped:    { bg: '#FEF3C7', text: '#B45309' },
  Delivered:  { bg: '#DCFCE7', text: '#16A34A' },
  Cancelled:  { bg: '#FEE2E2', text: '#DC2626' },
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
    <div style={{ padding: '1.5rem' }}>
      {/* Page header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0F172A',
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Analytics Overview
          </h1>
          <p style={{ color: '#64748B', margin: '0.25rem 0 0', fontSize: '0.875rem', fontFamily: "'DM Sans', sans-serif" }}>
            Track your store performance and insights
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
          }}>
            Export Report
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        {[
          {
            title: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            change: '+12.5%',
            sub: 'vs. $39,842 last month',
            isPositive: true,
            iconBg: '#DBEAFE',
            color: '#1D4ED8',
          },
          {
            title: 'Avg. Order Value',
            value: `$${avgOrderValue.toFixed(2)}`,
            change: '+4.2%',
            sub: 'vs. $193.20 last month',
            isPositive: true,
            iconBg: '#DCFCE7',
            color: '#16A34A',
          },
          {
            title: 'Conversion Rate',
            value: '3.24%',
            change: '-0.8%',
            sub: 'vs. 4.04% last month',
            isPositive: false,
            iconBg: '#FEF3C7',
            color: '#B45309',
          },
          {
            title: 'Total Orders',
            value: String(totalOrders),
            change: '+8.1%',
            sub: `vs. ${totalOrders - 2} last month`,
            isPositive: true,
            iconBg: '#F3E8FF',
            color: '#7C3AED',
          },
        ].map((card) => (
          <div key={card.title} style={{
            backgroundColor: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: card.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: card.isPositive ? '#16A34A' : '#DC2626',
                backgroundColor: card.isPositive ? '#DCFCE7' : '#FEE2E2',
                padding: '0.2rem 0.5rem',
                borderRadius: '9999px',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {card.change}
              </span>
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: '#64748B',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: '0.25rem',
            }}>
              {card.title}
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#0F172A',
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.2,
              marginBottom: '0.25rem',
            }}>
              {card.value}
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: '#94A3B8',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        {/* Revenue over time */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '1.25rem',
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#0F172A',
            margin: '0 0 1.25rem',
            fontFamily: "'DM Sans', sans-serif",
          }}>
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
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '1.25rem',
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#0F172A',
            margin: '0 0 1.25rem',
            fontFamily: "'DM Sans', sans-serif",
          }}>
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
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #E2E8F0',
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#0F172A',
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Recent Orders
          </h3>
          <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8rem',
            color: '#64748B',
            fontFamily: "'DM Sans', sans-serif",
            textDecoration: 'underline',
          }}>
            View All Orders
          </button>
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr 120px 120px',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
        }}>
          {['ORDER ID', 'CUSTOMER', 'STATUS', 'AMOUNT'].map((h) => (
            <div key={h} style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#94A3B8',
              fontFamily: "'DM Sans', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {h}
            </div>
          ))}
        </div>

        {recentOrders.map((order) => {
          const sc = statusConfig[order.status] || { bg: '#F1F5F9', text: '#64748B' };
          const initials = getInitials(order.customer);
          const bg = avatarColor(order.customer);
          return (
            <div
              key={order.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 120px 120px',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #E2E8F0',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', fontFamily: "'DM Sans', sans-serif" }}>
                {order.orderId}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  flexShrink: 0,
                }}>
                  {initials}
                </div>
                <span style={{ fontSize: '0.875rem', color: '#0F172A', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                  {order.customer}
                </span>
              </div>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: sc.bg,
                  color: sc.text,
                  padding: '0.25rem 0.625rem',
                  borderRadius: '9999px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {order.status}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', fontFamily: "'DM Sans', sans-serif" }}>
                ${order.amount.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
