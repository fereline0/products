import { create } from "zustand";
import { fetchProducts } from "../_services/productService";
import TProduct from "../_types/product";
import TSort from "../_types/sort";

type TProductStore = {
  products: TProduct[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortParam: TSort;
  addProduct: (product: TProduct) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (id: number, newData: Partial<TProduct>) => void;
  fetchProducts: () => Promise<void>;
  setSearchQuery: (searchQuery: string) => void;
  setSortParam: (sortParam: TSort) => void;
};

export const useProductStore = create<TProductStore>((set) => ({
  products: [],
  sortParam: "name",
  isLoading: false,
  error: null,
  searchQuery: "",

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

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setSortParam: (sortParam) => set({ sortParam }),

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await fetchProducts();
      set({ products, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Critical error",
        isLoading: false,
      });
    }
  },
}));

export const useFormattedProducts = () => {
  const products = useProductStore((state) => state.products);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const sort = useProductStore((state) => state.sortParam);

  return products
    .filter((product) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "recentlyAdded" && a.createdAt && b.createdAt) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });
};
