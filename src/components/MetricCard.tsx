'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  data: { value: number }[];
  color?: string;
  prefix?: string;
}

export default function MetricCard({
  title,
  value,
  change,
  data,
  color = '#4563FF',
  prefix = '',
}: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      border: '1px solid #eee',
    }}>
      {/* Title */}
      <div style={{
        fontSize: '0.875rem',
        color: '#666',
        marginBottom: '0.75rem',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {title}
      </div>

      {/* Value and Change */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}>
        <div style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#1A1A1A',
          fontFamily: "'Playfair Display', serif",
        }}>
          {prefix}{value}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: isPositive ? '#10b981' : '#ef4444',
        }}>
          <TrendingUp size={16} />
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: '60px', marginTop: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#gradient-${title})`}
              isAnimationActive={false}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
