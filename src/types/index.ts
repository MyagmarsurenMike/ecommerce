export type Category = {
  id: string
  name: string
  slug: string
  created_at: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  stock_qty: number
  images: string[]
  category_id: string | null
  is_active: boolean
  sales_count: number
  created_at: string
  categories?: Category
}

export type Profile = {
  id: string
  full_name: string | null
  phone: string | null
  role: 'customer' | 'admin'
  created_at: string
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type ShippingAddress = {
  name: string
  phone: string
  address: string
  city: string
}

export type OrderStatusLog = {
  id: string
  order_id: string
  status: string
  note: string | null
  created_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  products?: Product
}

export type Order = {
  id: string
  user_id: string
  status: OrderStatus
  total_amount: number
  shipping_address: ShippingAddress
  created_at: string
  profiles?: Profile
  order_items?: OrderItem[]
  order_status_logs?: OrderStatusLog[]
}

export type CartItem = {
  product: Product
  quantity: number
  size?: string
}

export type QPayInvoice = {
  id: string
  order_id: string
  qpay_invoice_id: string
  qr_image: string
  qr_text: string
  deeplinks: QPayLink[]
  amount: number
  status: 'pending' | 'paid' | 'expired' | 'failed'
  expires_at: string
}

export type QPayLink = {
  name: string
  description: string
  logo: string
  link: string
}
