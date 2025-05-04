import TProduct from "../_types/product";
import ProductWrapper from "./ProductWrapper";
import TSort from "../_types/sort";

type ProductListProps = {
  products: TProduct[];
  searchQuery: string;
  sortParam: TSort;
  onSelect: (product: TProduct) => void;
  onDelete: (id: number) => void;
};

export default function ProductList({
  products,
  searchQuery,
  sortParam,
  onSelect,
  onDelete,
}: ProductListProps) {
  const filteredProducts = products
    .filter((product) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortParam === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortParam === "recentlyAdded" && a.createdAt && b.createdAt) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });

  return (
    <>
      {filteredProducts.map((product) => (
        <ProductWrapper
          key={product.id}
          product={product}
          onPress={() => onSelect(product)}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </>
  );
}
