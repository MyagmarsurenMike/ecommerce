import { Suspense } from 'react';
import ProductsFilter from '@/components/ProductsFilter';

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Suspense>
          <ProductsFilter />
        </Suspense>
      </div>
    </div>
  );
}
