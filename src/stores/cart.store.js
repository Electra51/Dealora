import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === product.id);
        
        if (existingItem) {
          // Product already in cart - show toast
          toast.error(`"${product.name}" already in cart!`, {
            duration: 2500,
            position: 'top-right',
            icon: '🛒',
          });
          return;
        }
        
        // Add new item with quantity 1
        set({ 
          items: [...currentItems, { ...product, quantity: 1 }] 
        });
        
        toast.success(`"${product.name}" added to cart!`, {
          duration: 2000,
          position: 'top-right',
          icon: '✅',
        });
      },
      
      removeItem: (productId) => {
        const item = get().items.find(i => i.id === productId);
        set({ 
          items: get().items.filter(item => item.id !== productId) 
        });
        if (item) {
          toast.success(`"${item.name}" removed from cart`, {
            duration: 2000,
            position: 'top-right',
          });
        }
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared', {
          duration: 2000,
          position: 'top-right',
        });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);