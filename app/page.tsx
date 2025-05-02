import Products from "./_components/Products";
import { fetchProducts } from "./_services/product";

export default async function ProductsPage() {
  const products = await fetchProducts();

  return <Products products={products} />;
}
