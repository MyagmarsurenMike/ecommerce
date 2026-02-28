import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import ProductDetail from '@/components/ProductDetail';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: product } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .single();

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
