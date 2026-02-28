import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import HeroBanner from '@/components/HeroBanner';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { Product } from '@/types';

const shopCategories = [
  {
    name: 'Living Room',
    count: 4,
    image: '/sample_img/cosmetic-male.jpg',
    href: '/products?category=Living Room',
  },
  {
    name: 'Bedroom',
    count: 2,
    image: '/sample_img/still-life-1.jpg',
    href: '/products?category=Bedroom',
  },
  {
    name: 'Kitchen',
    count: 3,
    image: '/sample_img/toilet-bag.jpg',
    href: '/products?category=Kitchen',
  },
];

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_active', true)
    .order('sales_count', { ascending: false })
    .limit(4);

  const newArrivals: Product[] = data ?? [];

  return (
    <div>
      {/* Hero */}
      <HeroBanner />

      {/* New Arrivals */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm text-stone-dark/50 font-body mb-1">
                Discover the most stylish new arrivals
              </p>
              <h2 className="text-3xl font-display font-semibold text-stone-dark">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-body text-stone-accent hover:text-stone-dark transition-colors"
            >
              See all arrivals →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm text-stone-dark/50 font-body mb-1">
              Comfortable, modern and premium
            </p>
            <h2 className="text-3xl font-display font-semibold text-stone-dark">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {shopCategories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative overflow-hidden rounded-lg block"
                style={{ aspectRatio: '3 / 4' }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-display text-xl font-semibold mb-0.5">
                    {cat.name}
                  </h3>
                  <p className="text-white/65 text-sm font-body">
                    {cat.count} items →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
