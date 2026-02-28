'use client';

import { orders } from '@/data/orders';
import { products } from '@/data/products';

function MetricCardSimple({
  title,
  value,
  change,
  changeLabel,
  isPositive,
  iconBg,
  icon,
}: {
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  isPositive?: boolean;
  iconBg: string;
  icon: React.ReactNode;
}) {
  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid #E2E8F0',
      borderRadius: '12px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {icon}
        </div>
        {change !== undefined && (
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: changeLabel ? '#94A3B8' : (isPositive ? '#16A34A' : '#DC2626'),
            backgroundColor: changeLabel ? '#F1F5F9' : (isPositive ? '#DCFCE7' : '#FEE2E2'),
            padding: '0.2rem 0.5rem',
            borderRadius: '9999px',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {changeLabel || change}
          </span>
        )}
      </div>
      <div>
        <div style={{
          fontSize: '0.8rem',
          color: '#64748B',
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: '0.25rem',
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '1.625rem',
          fontWeight: 700,
          color: '#0F172A',
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.2,
        }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardNew() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;

  // Top products by order count
  const topProducts = products
    .map((p) => ({
      ...p,
      sales: orders.filter((o) => o.productName === p.name).length,
      revenue: orders.filter((o) => o.productName === p.name).reduce((s, o) => s + o.amount, 0),
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // Low stock = lowest priced products (proxy)
  const lowStockProducts = [...products].sort((a, b) => a.price - b.price).slice(0, 3);

  // Trending = next 3 by sales
  const trendingProducts = products
    .map((p) => ({
      ...p,
      sales: orders.filter((o) => o.productName === p.name).length,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(5, 8);

  const categoryPillColors: Record<string, { bg: string; text: string }> = {
    Furniture: { bg: '#DBEAFE', text: '#1D4ED8' },
    Seating: { bg: '#FEF3C7', text: '#B45309' },
    Lighting: { bg: '#DCFCE7', text: '#16A34A' },
    Decor: { bg: '#F3E8FF', text: '#7C3AED' },
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      {/* Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        <MetricCardSimple
          title="Total Sales"
          value={`$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="+12.5%"
          isPositive={true}
          iconBg="#DBEAFE"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
        <MetricCardSimple
          title="Total Orders"
          value="1,240"
          change="-2.1%"
          isPositive={false}
          iconBg="#FCE7F3"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          }
        />
        <MetricCardSimple
          title="New Customers"
          value="328"
          change="+18.2%"
          isPositive={true}
          iconBg="#FEF3C7"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          }
        />
        <MetricCardSimple
          title="Stock Alerts"
          value="12"
          changeLabel="Action Needed"
          iconBg="#FEF3C7"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          }
        />
      </div>

      {/* Two-column layout: 65% / 35% */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '65fr 35fr',
        gap: '1rem',
      }}>
        {/* Left: Top Selling Products table */}
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
              Top Selling Products
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
              View All
            </button>
          </div>

          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 80px 100px',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
          }}>
            {['PRODUCT NAME', 'CATEGORY', 'SALES', 'REVENUE'].map((h) => (
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

          {/* Table rows */}
          {topProducts.map((product) => {
            const pillColor = categoryPillColors[product.category] || { bg: '#F1F5F9', text: '#64748B' };
            return (
              <div
                key={product.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 80px 100px',
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid #E2E8F0',
                  alignItems: 'center',
                }}
              >
                {/* Product name with thumbnail */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: '#F1F5F9',
                  }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#0F172A',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {product.name}
                  </span>
                </div>

                {/* Category pill */}
                <div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backgroundColor: pillColor.bg,
                    color: pillColor.text,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {product.category}
                  </span>
                </div>

                {/* Sales */}
                <div style={{
                  fontSize: '0.875rem',
                  color: '#0F172A',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                }}>
                  {product.sales}
                </div>

                {/* Revenue */}
                <div style={{
                  fontSize: '0.875rem',
                  color: '#0F172A',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}>
                  ${product.revenue.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Two stacked cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Stock Management */}
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
              padding: '1.25rem 1.25rem 0.75rem',
            }}>
              <h3 style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#0F172A',
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Stock Management
              </h3>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                padding: '0.2rem 0.5rem',
                borderRadius: '9999px',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Low Stock
              </span>
            </div>

            <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {lowStockProducts.map((p) => (
                <div key={p.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      fontFamily: "'DM Sans', sans-serif",
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {p.name}
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: '#DC2626',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      Stock: {Math.floor(p.price / 10)} units
                    </div>
                  </div>
                  <button style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    padding: '0.25rem 0.625rem',
                    fontSize: '0.72rem',
                    fontFamily: "'DM Sans', sans-serif",
                    color: '#0F172A',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    Update
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Products */}
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
              padding: '1.25rem 1.25rem 0.75rem',
            }}>
              <h3 style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#0F172A',
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Trending Products
              </h3>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
                padding: '0.2rem 0.5rem',
                borderRadius: '9999px',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Live Updates
              </span>
            </div>

            <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {trendingProducts.map((p, i) => (
                <div key={p.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: '#F1F5F9',
                  }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      fontFamily: "'DM Sans', sans-serif",
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {p.name}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#16A34A',
                    fontFamily: "'DM Sans', sans-serif",
                    whiteSpace: 'nowrap',
                  }}>
                    +{(i + 1) * 7 + 3}% growth
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
