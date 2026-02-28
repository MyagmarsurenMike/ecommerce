'use client';

import { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select as AntSelect, message, Popconfirm } from 'antd';
import { Select } from 'antd';
import { Product, products as initialProducts, categories } from '@/data/products';

interface EditingProduct extends Product {
  key: string;
}

type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

const stockStatusConfig: Record<StockStatus, { bg: string; text: string }> = {
  'In Stock':    { bg: 'bg-green-100', text: 'text-green-700' },
  'Low Stock':   { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Out of Stock':{ bg: 'bg-red-100', text: 'text-red-700' },
};

function getStockStatus(id: string): StockStatus {
  const mod = parseInt(id) % 3;
  if (mod === 0) return 'Out of Stock';
  if (mod === 1) return 'In Stock';
  return 'Low Stock';
}

function generateSKU(id: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let suffix = '';
  const seed = parseInt(id) * 7;
  for (let i = 0; i < 3; i++) {
    suffix += chars[(seed + i * 13) % 26];
  }
  return `MN-${id.padStart(3, '0')}-${suffix}`;
}

export default function AdminProductManagement() {
  const [products, setProducts] = useState<EditingProduct[]>(
    initialProducts.map((p) => ({ ...p, key: p.id }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');

  const handleEdit = (product: EditingProduct) => {
    setEditingId(product.id);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    message.success('Product deleted');
  };

  const handleSubmit = async (values: any) => {
    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...p, ...values, id: editingId, key: editingId } : p
        )
      );
      message.success('Product updated');
    } else {
      const newId = String(Math.max(...products.map((p) => parseInt(p.id)), 0) + 1);
      setProducts([...products, { ...values, id: newId, key: newId }]);
      message.success('Product added');
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const catOk = categoryFilter === 'All' || p.category === categoryFilter;
    const stockOk = stockFilter === 'All' || getStockStatus(p.id) === stockFilter;
    return catOk && stockOk;
  });

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-admin-900 m-0 font-display">
          Products
        </h1>
      </div>

      {/* Card */}
      <div className="bg-white border border-admin-200 rounded-xl overflow-hidden">
        {/* Filter row */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-admin-200">
          <span className="text-xs font-semibold text-admin-600 font-body uppercase tracking-widest whitespace-nowrap">
            FILTERS:
          </span>
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 160 }}
            options={categories.map((c) => ({ label: c === 'All' ? 'All Categories' : c, value: c }))}
          />
          <Select
            value={stockFilter}
            onChange={setStockFilter}
            style={{ width: 160 }}
            options={[
              { label: 'All Stock Status', value: 'All' },
              { label: 'In Stock', value: 'In Stock' },
              { label: 'Low Stock', value: 'Low Stock' },
              { label: 'Out of Stock', value: 'Out of Stock' },
            ]}
          />
          <div className="ml-auto flex gap-2">
            <button className="bg-admin-50 border border-admin-200 rounded-lg px-2.5 py-2 cursor-pointer text-admin-600 flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
            <button className="bg-admin-50 border border-admin-200 rounded-lg px-2.5 py-2 cursor-pointer text-admin-600 flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[56px_2fr_120px_1fr_100px_130px_90px] px-6 py-3 bg-admin-50 border-b border-admin-200 gap-2">
          {['IMAGE', 'PRODUCT NAME', 'SKU', 'CATEGORY', 'PRICE', 'STOCK STATUS', 'ACTIONS'].map((h) => (
            <div key={h} className="text-xs font-semibold text-admin-600 font-body uppercase tracking-widest">
              {h}
            </div>
          ))}
        </div>

        {/* Table rows */}
        {filteredProducts.map((product) => {
          const stock = getStockStatus(product.id);
          const sc = stockStatusConfig[stock];
          return (
            <div
              key={product.id}
              className="grid grid-cols-[56px_2fr_120px_1fr_100px_130px_90px] px-6 py-3.5 border-b border-admin-200 items-center gap-2 bg-white"
            >
              {/* Image */}
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-admin-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Name */}
              <div>
                <div className="text-sm font-semibold text-admin-900 font-body">
                  {product.name}
                </div>
                <div className="text-xs text-admin-600 font-body">
                  {product.category} variant
                </div>
              </div>

              {/* SKU */}
              <div className="text-sm text-admin-600 font-mono">
                {generateSKU(product.id)}
              </div>

              {/* Category */}
              <div className="text-sm text-admin-600 font-body">
                {product.category}
              </div>

              {/* Price */}
              <div className="text-sm font-semibold text-admin-900 font-body">
                ${product.price.toFixed(2)}
              </div>

              {/* Stock Status */}
              <div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full font-body ${sc.bg} ${sc.text}`}>
                  {stock}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-none border-none cursor-pointer text-admin-600 p-1 flex items-center"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <Popconfirm
                  title="Delete Product"
                  description="Are you sure you want to delete this product?"
                  onConfirm={() => handleDelete(product.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="bg-none border-none cursor-pointer text-red-600 p-1 flex items-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </Popconfirm>
              </div>
            </div>
          );
        })}

        {/* Pagination footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-admin-200">
          <span className="text-sm text-admin-600 font-body">
            Showing 1 to {filteredProducts.length} of {filteredProducts.length} products
          </span>
          <div className="flex gap-1.5 items-center">
            {['Prev', '1', '2', '3', 'Next'].map((label) => (
              <button
                key={label}
                className={`px-3 py-1.5 border border-admin-200 rounded-md text-sm font-body cursor-pointer font-medium ${
                  label === '1'
                    ? 'bg-admin-900 border-admin-900 text-white'
                    : 'bg-white text-admin-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title={editingId ? 'Edit Product' : 'Add New Product'}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsModalOpen(false)}
        okText={editingId ? 'Update' : 'Add'}
        okButtonProps={{ style: { backgroundColor: '#0F172A', borderColor: '#0F172A' } }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <AntSelect options={categories.filter((c) => c !== 'All').map((c) => ({ label: c, value: c }))} />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber min={0} precision={2} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Image URL" name="image" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Featured" name="featured" valuePropName="checked">
            <input type="checkbox" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
