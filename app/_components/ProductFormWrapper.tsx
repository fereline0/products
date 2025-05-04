import { useState, useEffect, Dispatch, SetStateAction } from "react";
import TProduct from "../_types/product";
import ProductForm from "./shared/ProductForm";

type TProductFormWrapperProps = {
  setProducts: Dispatch<SetStateAction<TProduct[]>>;
  product?: TProduct | null;
  onSuccess?: () => void;
};

export default function ProductFormWrapper({
  setProducts,
  product,
  onSuccess,
}: TProductFormWrapperProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      product.description && setDescription(product.description);
      setPrice(product.price);
    }
  }, [product]);

  const createProduct = (): TProduct => ({
    id: Date.now(),
    name,
    description,
    price,
    createdAt: new Date(),
  });

  const updateProduct = (): TProduct => {
    if (!product) throw new Error("No product to update");

    return {
      ...product,
      name,
      description,
      price,
    };
  };

  const onSubmit = () => {
    const newProduct = product ? updateProduct() : createProduct();

    setProducts((prev) =>
      product
        ? prev.map((p) => (p.id === product.id ? newProduct : p))
        : [newProduct, ...prev],
    );

    onSuccess?.();
  };

  return (
    <ProductForm
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      price={price}
      setPrice={setPrice}
      onSubmit={onSubmit}
      submitButtonProps={
        product
          ? {
              children: "Save",
              color: "success",
            }
          : {
              children: "Add",
              color: "primary",
            }
      }
    />
  );
}
