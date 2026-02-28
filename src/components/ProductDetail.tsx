'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Button, Select, InputNumber, message } from 'antd';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const imageSrc = product.images[0] || '/sample_img/beauty-1.jpg';

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize);
    message.success(`Added ${quantity} item(s) to cart`);
    setQuantity(1);
  };

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="text-sm text-stone-dark/60 hover:text-stone-dark transition-colors">
            Products
          </Link>
          <span className="text-stone-dark/40 mx-2">/</span>
          <span className="text-sm text-stone-dark">{product.name}</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-[3/4] relative overflow-hidden bg-stone-dark/5 rounded-lg">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-start">
            <div className="mb-6">
              <span className="text-xs font-body text-stone-dark/50 uppercase tracking-widest">
                {product.categories?.name || ''}
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-semibold text-stone-dark mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-semibold text-stone-dark mb-6">
                ${product.price}
              </p>
            </div>

            <p className="text-base text-stone-dark/70 font-body mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="text-sm font-body font-semibold text-stone-dark mb-2 block">
                Size
              </label>
              <Select
                value={selectedSize}
                onChange={setSelectedSize}
                options={[
                  { label: 'XS', value: 'XS' },
                  { label: 'S', value: 'S' },
                  { label: 'M', value: 'M' },
                  { label: 'L', value: 'L' },
                  { label: 'XL', value: 'XL' },
                ]}
                className="w-full"
              />
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm font-body font-semibold text-stone-dark mb-2 block">
                Quantity
              </label>
              <InputNumber
                min={1}
                max={product.stock_qty}
                value={quantity}
                onChange={(val) => setQuantity(val || 1)}
                className="w-24"
              />
            </div>

            {/* Add to Cart Button */}
            <Button
              type="primary"
              size="large"
              onClick={handleAddToCart}
              disabled={product.stock_qty === 0}
              className="mb-6 h-12 text-base font-body font-semibold"
            >
              {product.stock_qty === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            {/* Additional Info */}
            <div className="border-t border-stone-dark/10 pt-6 mt-6">
              <div className="grid grid-cols-2 gap-6 text-sm font-body">
                <div>
                  <p className="text-stone-dark/50 mb-1">Shipping</p>
                  <p className="text-stone-dark">Free on orders over $100</p>
                </div>
                <div>
                  <p className="text-stone-dark/50 mb-1">Returns</p>
                  <p className="text-stone-dark">30 days no questions</p>
                </div>
                <div>
                  <p className="text-stone-dark/50 mb-1">In Stock</p>
                  <p className="text-stone-dark">{product.stock_qty} units</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
