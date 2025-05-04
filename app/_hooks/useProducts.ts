// hooks/useProducts.ts
"use client";

import { useEffect, useState } from "react";
import TProduct from "../_types/product";
import { fetchProducts } from "../_services/product";

export default function useProducts() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const isClient = typeof window !== "undefined";
        if (!isClient) return;

        const savedProducts = localStorage.getItem("products");

        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          if (isValidProducts(parsedProducts)) {
            setProducts(parsedProducts);
            return;
          }
          console.warn("Invalid products format in localStorage");
        }

        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        localStorage.setItem("products", JSON.stringify(fetchedProducts));
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const updateProducts = (newProducts: TProduct[]) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const isValidProducts = (data: unknown): data is TProduct[] => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          item &&
          typeof item === "object" &&
          "id" in item &&
          "name" in item &&
          "price" in item,
      )
    );
  };

  return {
    products,
    isLoading,
    error,
    updateProducts,
  };
}
