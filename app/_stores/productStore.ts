import { create } from "zustand";
import { TProduct } from "../_types/product";
import { fetchProducts } from "../_services/productService";

interface ProductStore {
  products: TProduct[];
  isLoading: boolean;
  error: string | null;
  addProduct: (product: TProduct) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (id: number, newData: Partial<TProduct>) => void;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateProduct: (id, newData) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...newData } : p,
      ),
    })),

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await fetchProducts();
      set({ products, isLoading: false });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Critical error";
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
