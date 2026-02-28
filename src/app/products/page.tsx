import { Suspense } from 'react';
import ProductsFilter from '@/components/ProductsFilter';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { Product, Category } from '@/types';

export default async function ProductsPage() {
  const supabase = await createSupabaseServerClient();

  const [{ data: productsData }, { data: categoriesData }] = await Promise.all([
    supabase
      .from('products')
      .select('*, categories(*)')
      .eq('is_active', true)
      .order('sales_count', { ascending: false }),
    supabase
      .from('categories')
      .select('*')
      .order('name'),
  ]);

  const products: Product[] = productsData ?? [];
  const categories: Category[] = categoriesData ?? [];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Suspense>
          <ProductsFilter products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
