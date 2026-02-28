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
  'In Stock':    { bg: '#DCFCE7', text: '#16A34A' },
  'Low Stock':   { bg: '#FEF3C7', text: '#B45309' },
  'Out of Stock':{ bg: '#FEE2E2', text: '#DC2626' },
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
    <div style={{ padding: '1.5rem' }}>
      {/* Page header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#0F172A',
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Products
        </h1>
      </div>

      {/* Card */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        {/* Filter row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #E2E8F0',
        }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#94A3B8',
            fontFamily: "'DM Sans', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}>
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
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
            <button style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '0.4rem 0.625rem',
              cursor: 'pointer',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
            <button style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '0.4rem 0.625rem',
              cursor: 'pointer',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '56px 2fr 120px 1fr 100px 130px 90px',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          gap: '0.5rem',
        }}>
          {['IMAGE', 'PRODUCT NAME', 'SKU', 'CATEGORY', 'PRICE', 'STOCK STATUS', 'ACTIONS'].map((h) => (
            <div key={h} style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#94A3B8',
              fontFamily: "'DM Sans', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
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
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 2fr 120px 1fr 100px 130px 90px',
                padding: '0.875rem 1.5rem',
                borderBottom: '1px solid #E2E8F0',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#fff',
              }}
            >
              {/* Image */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#F1F5F9',
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Product Name */}
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {product.name}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#94A3B8',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {product.category} variant
                </div>
              </div>

              {/* SKU */}
              <div style={{
                fontSize: '0.8rem',
                color: '#64748B',
                fontFamily: 'monospace',
              }}>
                {generateSKU(product.id)}
              </div>

              {/* Category */}
              <div style={{
                fontSize: '0.875rem',
                color: '#64748B',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {product.category}
              </div>

              {/* Price */}
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#0F172A',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                ${product.price.toFixed(2)}
              </div>

              {/* Stock Status */}
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: sc.bg,
                  color: sc.text,
                  padding: '0.25rem 0.625rem',
                  borderRadius: '9999px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {stock}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(product)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748B',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
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
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#DC2626',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          borderTop: '1px solid #E2E8F0',
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: '#64748B',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Showing 1 to {filteredProducts.length} of {filteredProducts.length} products
          </span>
          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            {['Prev', '1', '2', '3', 'Next'].map((label) => (
              <button
                key={label}
                style={{
                  padding: '0.375rem 0.75rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  backgroundColor: label === '1' ? '#0F172A' : '#fff',
                  color: label === '1' ? '#fff' : '#64748B',
                  fontSize: '0.875rem',
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                  fontWeight: label === '1' ? 600 : 400,
                }}
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
