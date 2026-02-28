'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { ShoppingOutlined } from '@ant-design/icons';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const imageSrc = product.images[0] || '/sample_img/cosmetic-male.jpg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-stone-dark/5">
          <Image
            src={imageSrc}
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
