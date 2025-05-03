import { generateMockProducts } from "@/app/_utils/mockProducts";
import TProduct from "../_types/product";

export async function fetchProducts(
  count = 100,
  delay = 1000,
): Promise<TProduct[]> {
  await new Promise((resolve) => setTimeout(resolve, delay));

  return generateMockProducts(count);
}
