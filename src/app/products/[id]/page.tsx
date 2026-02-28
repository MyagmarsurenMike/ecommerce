import Link from 'next/link';
import { products } from '@/data/products';
import ProductDetail from '@/components/ProductDetail';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-semibold text-stone-dark mb-4">
            Product not found
          </h1>
          <Link href="/products" className="text-stone-accent hover:text-stone-dark transition-colors">
            Back to Products →
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
