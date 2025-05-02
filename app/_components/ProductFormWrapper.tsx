import { useState, useEffect } from "react";
import { TProduct } from "../_types/product";
import ProductForm from "./shared/ProductForm";
import { useProductStore } from "../_stores/productStore";

type TProductFormWrapperProps = {
  product?: TProduct | null;
  onSuccess?: () => void;
};

export default function ProductFormWrapper({
  product,
  onSuccess,
}: TProductFormWrapperProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);

  const { addProduct, updateProduct } = useProductStore();

  useEffect(() => {
    setName(product?.name || "");
    setDescription(product?.description || "");
    setPrice(product?.price || 0);
  }, [product]);

  const handleSubmit = () => {
    if (product) {
      updateProduct(product.id, {
        name,
        description,
        price,
      });
    } else {
      addProduct({
        id: Date.now(),
        name,
        description,
        price,
        createdAt: new Date(),
      });
    }

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
      onSubmit={handleSubmit}
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
