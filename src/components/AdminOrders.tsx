'use client';

import { useState } from 'react';
import { Select } from 'antd';
import { orders, Order } from '@/data/orders';

type StatusTab = 'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

const statusConfig: Record<string, { bg: string; text: string }> = {
  Processing: { bg: '#DBEAFE', text: '#1D4ED8' },
  Shipped:    { bg: '#FEF3C7', text: '#B45309' },
  Delivered:  { bg: '#DCFCE7', text: '#16A34A' },
  Cancelled:  { bg: '#FEE2E2', text: '#DC2626' },
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
            Orders
          </h1>
          <p style={{ color: '#64748B', margin: '0.25rem 0 0', fontSize: '0.875rem', fontFamily: "'DM Sans', sans-serif" }}>
            Manage and track all customer orders
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{
            backgroundColor: 'transparent',
            color: '#0F172A',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            Export CSV
          </button>
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
            Create Order
          </button>
        </div>
      </div>

      {/* Card */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        {/* Status tab row */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 1.5rem',
          gap: '0',
        }}>
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveStatusTab(tab)}
              style={{
                padding: '1rem 1.25rem',
                border: 'none',
                borderBottom: activeStatusTab === tab ? '2px solid #0F172A' : '2px solid transparent',
                backgroundColor: 'transparent',
                color: activeStatusTab === tab ? '#0F172A' : '#64748B',
                fontSize: '0.875rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: activeStatusTab === tab ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                marginBottom: '-1px',
              }}
            >
              {tab} {tabCounts[tab] > 0 && (
                <span style={{
                  fontSize: '0.7rem',
                  backgroundColor: activeStatusTab === tab ? '#0F172A' : '#F1F5F9',
                  color: activeStatusTab === tab ? '#fff' : '#64748B',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '9999px',
                  marginLeft: '0.25rem',
                  fontWeight: 600,
                }}>
                  {tabCounts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filter row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #E2E8F0',
        }}>
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
          <button style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '0.4rem 0.875rem',
            fontSize: '0.875rem',
            fontFamily: "'DM Sans', sans-serif",
            color: '#64748B',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            More Filters
          </button>
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr 120px 110px 120px 60px',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
        }}>
          {['ORDER ID', 'CUSTOMER', 'DATE', 'TOTAL', 'STATUS', ''].map((h, i) => (
            <div key={i} style={{
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

        {/* Table rows */}
        {filteredOrders.map((order) => {
          const sc = statusConfig[order.status] || { bg: '#F1F5F9', text: '#64748B' };
          const initials = getInitials(order.customer);
          const bg = avatarColor(order.customer);
          return (
            <div
              key={order.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 120px 110px 120px 60px',
                padding: '0 1.5rem',
                height: '64px',
                borderBottom: '1px solid #E2E8F0',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              {/* Order ID */}
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#0F172A',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {order.orderId}
              </div>

              {/* Customer */}
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
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#0F172A',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {order.customer}
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: '#94A3B8',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {order.email}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div style={{
                fontSize: '0.875rem',
                color: '#64748B',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {order.date}
              </div>

              {/* Total */}
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#0F172A',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                ${order.amount.toFixed(2)}
              </div>

              {/* Status badge */}
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

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94A3B8',
                  fontSize: '1.1rem',
                  padding: '4px',
                }}>
                  ⋮
                </button>
              </div>
            </div>
          );
        })}

        {/* Pagination footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          borderTop: '1px solid #E2E8F0',
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: '#64748B',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Showing 1 to {filteredOrders.length} of 128 orders
          </span>
          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            {['Prev', '1', '2', '3', 'Next'].map((label) => (
              <button
                key={label}
                style={{
                  padding: '0.375rem 0.75rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  backgroundColor: label === '1' ? '#0F172A' : '#fff',
                  color: label === '1' ? '#fff' : '#64748B',
                  fontSize: '0.875rem',
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                  fontWeight: label === '1' ? 600 : 400,
                }}
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
