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
    <div className="bg-white border border-admin-200 rounded-xl p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full font-body ${
            changeLabel ? 'bg-admin-100 text-admin-600' : (isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')
          }`}>
            {changeLabel || change}
          </span>
        )}
      </div>
      <div>
        <div className="text-xs text-admin-600 font-body mb-1">
          {title}
        </div>
        <div className="text-xl font-bold text-admin-900 font-body leading-tight">
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
    Furniture: { bg: 'bg-blue-100', text: 'text-blue-700' },
    Seating: { bg: 'bg-amber-100', text: 'text-amber-700' },
    Lighting: { bg: 'bg-green-100', text: 'text-green-700' },
    Decor: { bg: 'bg-purple-100', text: 'text-purple-700' },
  };

  return (
    <div className="p-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCardSimple
          title="Total Sales"
          value={`$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="+12.5%"
          isPositive={true}
          iconBg="bg-blue-100"
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
          iconBg="bg-pink-100"
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
          iconBg="bg-amber-100"
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
          iconBg="bg-amber-100"
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
      <div className="grid grid-cols-[1.857fr_1fr] gap-4">
        {/* Left: Top Selling Products table */}
        <div className="bg-white border border-admin-200 rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-6 py-5 border-b border-admin-200">
            <h3 className="text-base font-bold text-admin-900 m-0 font-body">
              Top Selling Products
            </h3>
            <button className="bg-none border-none cursor-pointer text-sm text-admin-600 font-body underline">
              View All
            </button>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_80px_100px] px-6 py-3 bg-admin-50 border-b border-admin-200">
            {['PRODUCT NAME', 'CATEGORY', 'SALES', 'REVENUE'].map((h) => (
              <div key={h} className="text-xs font-semibold text-admin-600 font-body uppercase tracking-widest">
                {h}
              </div>
            ))}
          </div>

          {/* Table rows */}
          {topProducts.map((product) => {
            const pillColor = categoryPillColors[product.category] || { bg: 'bg-admin-100', text: 'text-admin-600' };
            return (
              <div
                key={product.id}
                className="grid grid-cols-[2fr_1fr_80px_100px] px-6 py-4 border-b border-admin-200 items-center"
              >
                {/* Product name with thumbnail */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-admin-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-admin-900 font-body">
                    {product.name}
                  </span>
                </div>

                {/* Category pill */}
                <div>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full font-body ${pillColor.bg} ${pillColor.text}`}>
                    {product.category}
                  </span>
                </div>

                {/* Sales */}
                <div className="text-sm text-admin-900 font-body font-medium">
                  {product.sales}
                </div>

                {/* Revenue */}
                <div className="text-sm text-admin-900 font-body font-semibold">
                  ${product.revenue.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Two stacked cards */}
        <div className="flex flex-col gap-4">
          {/* Stock Management */}
          <div className="bg-white border border-admin-200 rounded-xl overflow-hidden">
            <div className="flex justify-between items-center px-5 pt-5 pb-3">
              <h3 className="text-sm font-bold text-admin-900 m-0 font-body">
                Stock Management
              </h3>
              <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-body">
                Low Stock
              </span>
            </div>

            <div className="px-5 pb-5 flex flex-col gap-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-admin-900 font-body whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                      {p.name}
                    </div>
                    <div className="text-xs text-red-600 font-body">
                      Stock: {Math.floor(p.price / 10)} units
                    </div>
                  </div>
                  <button className="bg-admin-50 border border-admin-200 rounded-md px-2.5 py-1 text-xs font-body text-admin-900 cursor-pointer whitespace-nowrap flex-shrink-0">
                    Update
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Products */}
          <div className="bg-white border border-admin-200 rounded-xl overflow-hidden">
            <div className="flex justify-between items-center px-5 pt-5 pb-3">
              <h3 className="text-sm font-bold text-admin-900 m-0 font-body">
                Trending Products
              </h3>
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-body">
                Live Updates
              </span>
            </div>

            <div className="px-5 pb-5 flex flex-col gap-3">
              {trendingProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-admin-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-admin-900 font-body whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                      {p.name}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-green-700 font-body whitespace-nowrap">
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
