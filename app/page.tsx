"use client";

import { useEffect, useState } from "react";
import Products from "./_components/Products";
import { useProductStore } from "./_stores/productStore";
import Loading from "./_components/shared/Loading";

export default function ProductsPage() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const isLoading = useProductStore((state) => state.isLoading);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      fetchProducts().finally(() => setInitialLoad(false));
    }
  }, [fetchProducts, initialLoad]);

  if (initialLoad || isLoading) return <Loading />;

  return <Products />;
}
