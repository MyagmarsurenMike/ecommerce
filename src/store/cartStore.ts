'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

type CartStore = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, size?: string) => void
  removeItem: (productId: string, size?: string) => void
  updateQty: (productId: string, quantity: number, size?: string) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, size) => {
        const existing = get().items.find(
          (i) => i.product.id === product.id && i.size === size
        )
        if (existing) {
          get().updateQty(product.id, existing.quantity + quantity, size)
        } else {
          set((s) => ({ items: [...s.items, { product, quantity, size }] }))
        }
      },

      removeItem: (productId, size) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.product.id === productId && i.size === size)
          ),
        })),

      updateQty: (productId, quantity, size) => {
        if (quantity <= 0) {
          get().removeItem(productId, size)
          return
        }
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        ),

      count: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'lumina-cart' }
  )
)
