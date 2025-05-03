import { Card, CardBody } from "@heroui/card";
import { useState } from "react";
import ProductFormWrapper from "./ProductFormWrapper";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import ProductWrapper from "./ProductWrapper";
import { useFormattedProducts } from "../_stores/productStore";
import Search from "./Search";
import TProduct from "../_types/product";
import Sort from "./Sort";

export default function Products() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formatedProducts = useFormattedProducts();
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  return (
    <div className="flex justify-between flex-col-reverse md:flex-row gap-4">
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <div className="flex w-full flex-wrap gap-2">
            <Search />
            <Sort />
          </div>
          <Button color="primary" onPress={onOpen}>
            Add
          </Button>
          <Drawer backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent>
              {(close) => (
                <>
                  <DrawerHeader className="flex flex-col gap-1">
                    Add product
                  </DrawerHeader>
                  <DrawerBody>
                    <ProductFormWrapper onSuccess={close} />
                  </DrawerBody>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </div>
        {formatedProducts.map((product) => (
          <ProductWrapper
            key={product.id}
            product={product}
            onPress={() => setSelectedProduct(selectedProduct ? null : product)}
          />
        ))}
      </div>
      <div className="max-w-full w-full md:max-w-96">
        <Card fullWidth>
          <CardBody>
            {selectedProduct ? (
              <ProductFormWrapper
                product={selectedProduct}
                onSuccess={() => setSelectedProduct(null)}
              />
            ) : (
              <p className="text-center">Select product</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
