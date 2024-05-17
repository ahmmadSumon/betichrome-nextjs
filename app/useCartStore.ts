import create from 'zustand';

interface Item {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  // Add other properties as needed
}

interface CartStore {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, newQuantity: number) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  updateItemQuantity: (itemId, newQuantity) => {
    const parsedQuantity = Math.max(parseInt(newQuantity.toString(), 10), 1);
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity: parsedQuantity } : item
      ),
    }));
  },
  incrementQuantity: (itemId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decrementQuantity: (itemId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      ),
    })),
}));

export default useCartStore;
