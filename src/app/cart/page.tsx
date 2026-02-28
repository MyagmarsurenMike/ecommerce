'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Button, InputNumber, Table, Empty, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.total)();

  const columns: ColumnsType = [
    {
      title: 'Product',
      key: 'product',
      render: (_, record: any) => (
        <div className="flex gap-4">
          <div className="w-20 h-20 relative flex-shrink-0 bg-stone-dark/5 rounded">
            <Image
              src={record.product.images[0] || '/sample_img/cosmetic-male.jpg'}
              alt={record.product.name}
              fill
              className="object-cover rounded"
            />
          </div>
          <div>
            <p className="font-semibold text-stone-dark">{record.product.name}</p>
            {record.size && (
              <p className="text-sm text-stone-dark/60">Size: {record.size}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      key: 'price',
      width: 100,
      render: (_, record: any) => `$${record.product.price}`,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      width: 120,
      render: (_, record: any) => (
        <InputNumber
          min={1}
          max={99}
          value={record.quantity}
          onChange={(val) => updateQty(record.product.id, val || 1, record.size)}
          className="w-20"
        />
      ),
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      width: 100,
      render: (_, record: any) => `$${(record.product.price * record.quantity).toFixed(2)}`,
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (_, record: any) => (
        <button
          onClick={() => {
            removeItem(record.product.id, record.size);
            message.info('Item removed');
          }}
          className="text-stone-accent hover:text-stone-dark transition-colors"
          aria-label="Remove item"
        >
          <DeleteOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-display font-semibold text-stone-dark mb-12">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="py-20">
            <Empty
              description={
                <div className="text-center">
                  <p className="text-lg text-stone-dark/70 font-body mb-6">
                    Your cart is empty
                  </p>
                  <Link href="/products">
                    <Button type="primary" size="large">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Table
                columns={columns}
                dataSource={items.map((item) => ({
                  ...item,
                  key: `${item.product.id}-${item.size}`,
                }))}
                pagination={false}
                bordered={false}
                size="large"
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-stone-dark/10 rounded-lg p-8 sticky top-24">
                <h2 className="text-lg font-display font-semibold text-stone-dark mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 border-b border-stone-dark/10 pb-6">
                  <div className="flex justify-between text-stone-dark/70 font-body">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-dark/70 font-body">
                    <span>Shipping</span>
                    <span className="text-stone-accent">Free</span>
                  </div>
                  <div className="flex justify-between text-stone-dark/70 font-body">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-semibold text-stone-dark mb-8">
                  <span>Total</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  className="mb-4 h-12 font-semibold"
                >
                  Checkout
                </Button>

                <Link href="/products" className="block text-center">
                  <Button
                    type="default"
                    size="large"
                    block
                    className="h-12 font-semibold"
                  >
                    Continue Shopping
                  </Button>
                </Link>

                <button
                  onClick={() => {
                    clearCart();
                    message.info('Cart cleared');
                  }}
                  className="block w-full mt-4 text-sm text-stone-accent hover:text-stone-dark transition-colors font-body"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
