import { PressEvent } from "@heroui/button";
import { TProduct } from "../_types/product";
import Product from "./shared/Product";
import ProductActions from "./ProductActions";
import { useProductStore } from "../_stores/productStore";

type TProductWrapperProps = {
  product: TProduct;
  onPress: (e: PressEvent) => void;
};

export default function ProductWrapper({
  product,
  onPress,
}: TProductWrapperProps) {
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  return (
    <Product
      fullWidth
      name={product.name}
      description={product.description}
      price={product.price}
      createdAt={product.createdAt.toDateString()}
      isPressable
      onPress={onPress}
      endContent={<ProductActions onDelete={() => deleteProduct(product.id)} />}
    />
  );
}
