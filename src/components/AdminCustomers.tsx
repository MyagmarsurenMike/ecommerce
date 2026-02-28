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
            Customers Directory
          </h1>
          <p style={{ color: '#64748B', margin: '0.25rem 0 0', fontSize: '0.875rem', fontFamily: "'DM Sans', sans-serif" }}>
            View and manage your customer base
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
            backgroundColor: 'transparent',
            color: '#0F172A',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        {[
          { title: 'TOTAL CUSTOMERS', value: '12,482', change: '+12%', isPositive: true, iconBg: '#DBEAFE', color: '#1D4ED8' },
          { title: 'ACTIVE THIS MONTH', value: '3,120', change: '+5.4%', isPositive: true, iconBg: '#DCFCE7', color: '#16A34A' },
          { title: 'AVG. CUSTOMER VALUE', value: '$412.50', change: 'Stable', isPositive: true, iconBg: '#FEF3C7', color: '#B45309' },
        ].map((card) => (
          <div key={card.title} style={{
            backgroundColor: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              backgroundColor: card.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: '#94A3B8',
                fontFamily: "'DM Sans', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.25rem',
              }}>
                {card.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0F172A',
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.2,
                }}>
                  {card.value}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: card.change === 'Stable' ? '#64748B' : (card.isPositive ? '#16A34A' : '#DC2626'),
                  backgroundColor: card.change === 'Stable' ? '#F1F5F9' : (card.isPositive ? '#DCFCE7' : '#FEE2E2'),
                  padding: '0.15rem 0.4rem',
                  borderRadius: '9999px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {card.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + count */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: '#fff',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '0.5rem 0.875rem',
          width: '320px',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <span style={{
          fontSize: '0.875rem',
          color: '#64748B',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Showing 1-{filteredCustomers.length} of 12,482
        </span>
      </div>

      {/* Customers table card */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 2fr 100px 120px 140px 48px',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
        }}>
          {['CUSTOMER NAME', 'EMAIL ADDRESS', 'ORDERS', 'TOTAL SPENT', 'LAST ACTIVE', ''].map((h) => (
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

        {/* Rows */}
        {filteredCustomers.map((customer) => {
          const bg = avatarColor(customer.name);
          const recent = isRecentActivity(customer.lastActive);
          return (
            <div
              key={customer.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 100px 120px 140px 48px',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #E2E8F0',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              {/* Customer name + avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  flexShrink: 0,
                }}>
                  {customer.id}
                </div>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {customer.name}
                </span>
              </div>

              {/* Email */}
              <div style={{
                fontSize: '0.875rem',
                color: '#64748B',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {customer.email}
              </div>

              {/* Orders */}
              <div style={{
                fontSize: '0.875rem',
                color: '#0F172A',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}>
                {customer.orders}
              </div>

              {/* Spent */}
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#0F172A',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                ${customer.spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              {/* Last Active badge */}
              <div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  backgroundColor: recent ? '#DCFCE7' : '#F1F5F9',
                  color: recent ? '#16A34A' : '#64748B',
                  padding: '0.2rem 0.625rem',
                  borderRadius: '9999px',
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: 'nowrap',
                }}>
                  {customer.lastActive}
                </span>
              </div>

              {/* Action icon */}
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

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
        }}>
          <button style={{
            padding: '0.375rem 0.875rem',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            backgroundColor: '#fff',
            color: '#64748B',
            fontSize: '0.875rem',
            fontFamily: "'DM Sans', sans-serif",
            cursor: 'pointer',
          }}>
            Previous
          </button>
          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            {['1', '2', '3', '...', '120'].map((label) => (
              <button
                key={label}
                style={{
                  padding: '0.375rem 0.625rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  backgroundColor: label === '1' ? '#0F172A' : '#fff',
                  color: label === '1' ? '#fff' : '#64748B',
                  fontSize: '0.875rem',
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                  fontWeight: label === '1' ? 600 : 400,
                  minWidth: '36px',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <button style={{
            padding: '0.375rem 0.875rem',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            backgroundColor: '#fff',
            color: '#64748B',
            fontSize: '0.875rem',
            fontFamily: "'DM Sans', sans-serif",
            cursor: 'pointer',
          }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
