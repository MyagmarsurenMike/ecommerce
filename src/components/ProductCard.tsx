'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-stone-dark/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        <h3 className="text-sm font-body font-semibold text-stone-dark mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-stone-dark">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="p-2 text-stone-dark hover:text-stone-accent transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingOutlined style={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </Link>
  );
}
