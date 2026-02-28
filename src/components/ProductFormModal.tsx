'use client';

import { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber, Select, Switch, message } from 'antd';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  categories: Category[];
  onSaved: () => void;
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function ProductFormModal({ open, onClose, product, categories, onSaved }: Props) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    if (product) {
      form.setFieldsValue({
        name: product.name,
        slug: product.slug,
        category_id: product.category_id,
        price: product.price,
        stock_qty: product.stock_qty,
        description: product.description,
        is_active: product.is_active,
      });
      setImagePreview(product.images?.[0] || '');
    } else {
      form.resetFields();
      form.setFieldValue('is_active', true);
      form.setFieldValue('stock_qty', 0);
      setImagePreview('');
    }
    setImageFile(null);
  }, [open, product, form]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) {
      form.setFieldValue('slug', generateSlug(e.target.value));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from('products')
      .upload(path, file, { upsert: false });

    setUploading(false);

    if (error) {
      message.error('Image upload failed: ' + error.message);
      return null;
    }

    const { data: urlData } = supabase.storage.from('products').getPublicUrl(data.path);
    return urlData.publicUrl;
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    setSaving(true);

    let imageUrl = imagePreview;
    if (imageFile) {
      const url = await uploadImage(imageFile);
      if (!url) {
        setSaving(false);
        return;
      }
      imageUrl = url;
    }

    const payload = {
      name: values.name,
      slug: values.slug,
      category_id: (values.category_id as string) || null,
      price: values.price,
      stock_qty: values.stock_qty,
      description: (values.description as string) || null,
      is_active: (values.is_active as boolean) ?? true,
      images: imageUrl ? [imageUrl] : (product?.images ?? []),
    };

    let error;
    if (product) {
      ({ error } = await supabase.from('products').update(payload).eq('id', product.id));
    } else {
      ({ error } = await supabase.from('products').insert(payload));
    }

    setSaving(false);

    if (error) {
      message.error(error.message);
    } else {
      message.success(product ? 'Product updated' : 'Product created');
      onSaved();
    }
  };

  return (
    <Modal
      title={product ? 'Edit Product' : 'Add New Product'}
      open={open}
      onOk={() => form.submit()}
      onCancel={onClose}
      okText={product ? 'Update' : 'Create'}
      confirmLoading={saving || uploading}
      okButtonProps={{ style: { backgroundColor: '#0F172A', borderColor: '#0F172A' } }}
      width={600}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
        {/* Image upload */}
        <Form.Item label="Product Image">
          <div className="flex items-center gap-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border border-admin-200"
              />
            ) : (
              <div className="w-20 h-20 bg-admin-100 rounded-lg border border-dashed border-admin-200 flex items-center justify-center text-admin-600 text-xs text-center px-1">
                No image
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 border border-admin-200 rounded-lg text-sm text-admin-900 bg-white cursor-pointer font-body hover:bg-admin-50 transition-colors"
            >
              {imagePreview ? 'Change Image' : 'Upload Image'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input onChange={handleNameChange} placeholder="e.g. Velvet Lounge Chair" />
        </Form.Item>

        <Form.Item
          label="Slug (URL)"
          name="slug"
          rules={[{ required: true, message: 'Slug is required' }]}
          extra="Auto-generated from name. Must be unique."
        >
          <Input placeholder="velvet-lounge-chair" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item label="Category" name="category_id">
            <Select
              placeholder="Select category"
              allowClear
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
            />
          </Form.Item>

          <Form.Item
            label="Price (₮)"
            name="price"
            rules={[{ required: true, message: 'Price is required' }]}
          >
            <InputNumber min={0} precision={2} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="stock_qty"
            rules={[{ required: true, message: 'Stock is required' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Active" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Product description..." />
        </Form.Item>
      </Form>
    </Modal>
  );
}
