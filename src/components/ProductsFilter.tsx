'use client';

import { useState, useMemo } from 'react';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { Slider, Select } from 'antd';
import { SlidersOutlined } from '@ant-design/icons';

interface ProductsFilterProps {
  products: Product[];
  categories: Category[];
}

const COLORS = ['#2A2A2A', '#8B7355', '#5B7A5B', '#7A8B9B', '#D4C5B0'];
const MAX_PRICE = 3500;
type SortOption = 'featured' | 'price-asc' | 'price-desc';

export default function ProductsFilter({ products, categories }: ProductsFilterProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.categories?.name || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.categories?.name || '')
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.sales_count - a.sales_count);

    return result;
  }, [searchQuery, selectedCategories, priceRange, sortBy, products]);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < MAX_PRICE ||
    selectedColor !== null;

  const clearAll = () => {
    setSelectedCategories([]);
    setPriceRange([0, MAX_PRICE]);
    setSelectedColor(null);
  };

  return (
    <div className="flex gap-10">
      {/* ── Sidebar ── */}
      <aside className="w-52 shrink-0">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2">
            <SlidersOutlined className="text-stone-dark" />
            <span className="text-sm font-semibold text-stone-dark">Filters</span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs font-body text-stone-accent hover:text-stone-dark transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Category */}
        <div className="mb-8">
          <h3 className="text-[11px] font-semibold text-stone-dark/50 uppercase tracking-widest mb-3">
            Category
          </h3>
          <ul className="space-y-2.5">
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat.name);
              return (
                <li key={cat.id}>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(cat.name)}
                      className="w-3.5 h-3.5 rounded accent-stone-accent cursor-pointer"
                    />
                    <span
                      className={`text-sm font-body transition-colors ${
                        checked
                          ? 'text-stone-dark font-semibold'
                          : 'text-stone-dark/55 group-hover:text-stone-dark'
                      }`}
                    >
                      {cat.name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="text-[11px] font-semibold text-stone-dark/50 uppercase tracking-widest mb-4">
            Price Range
          </h3>
          <Slider
            range
            min={0}
            max={MAX_PRICE}
            value={priceRange}
            onChange={(val) => setPriceRange(val as [number, number])}
            styles={{
              track: { backgroundColor: '#8B7355' },
              rail: { backgroundColor: 'rgba(26,26,26,0.1)' },
            }}
            tooltip={{ formatter: (v) => `$${v}` }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs font-body text-stone-dark/55">
              ${priceRange[0].toLocaleString()}
            </span>
            <span className="text-xs font-body text-stone-dark/55">
              {priceRange[1] >= MAX_PRICE
                ? `$${MAX_PRICE.toLocaleString()}+`
                : `$${priceRange[1].toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* Color */}
        <div className="mb-8">
          <h3 className="text-[11px] font-semibold text-stone-dark/50 uppercase tracking-widest mb-3">
            Color
          </h3>
          <div className="flex gap-2.5">
            {COLORS.map((color) => {
              const active = selectedColor === color;
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(active ? null : color)}
                  title={color}
                  style={{ backgroundColor: color }}
                  className={`w-6 h-6 rounded-full transition-all hover:scale-110 ${
                    active
                      ? 'ring-2 ring-offset-2 ring-stone-dark'
                      : 'ring-1 ring-transparent'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-8">
          <h3 className="text-[11px] font-semibold text-stone-dark/50 uppercase tracking-widest mb-3">
            Rating
          </h3>
          <ul className="space-y-2">
            {[4, 3, 2, 1].map((stars) => (
              <li key={stars}>
                <button className="flex items-center gap-1 text-stone-dark/55 hover:text-stone-accent transition-colors">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill={i < stars ? '#8B7355' : 'none'}
                      stroke={i < stars ? '#8B7355' : 'currentColor'}
                      strokeWidth="1"
                    >
                      <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" />
                    </svg>
                  ))}
                  <span className="text-xs font-body ml-0.5">& up</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-semibold text-stone-dark">
              All Products
            </h1>
            <p className="text-sm font-body text-stone-dark/45 mt-0.5">
              {searchQuery ? (
                <>
                  {filteredProducts.length} result
                  {filteredProducts.length !== 1 ? 's' : ''} for &quot;
                  {searchQuery}&quot;
                </>
              ) : (
                <>
                  Showing {filteredProducts.length} of {products.length} Products
                </>
              )}
            </p>
          </div>
          <Select
            value={sortBy}
            onChange={setSortBy}
            options={[
              { label: 'Featured', value: 'featured' },
              { label: 'Price: Low to High', value: 'price-asc' },
              { label: 'Price: High to Low', value: 'price-desc' },
            ]}
            style={{ width: 170 }}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-base text-stone-dark/40 font-body">
              No products match your filters.
            </p>
            <button
              onClick={clearAll}
              className="mt-4 text-sm font-body text-stone-accent hover:text-stone-dark transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
