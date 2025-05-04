"use client";

import { Card, CardBody } from "@heroui/card";
import TProduct from "../_types/product";
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
import Search from "./Search";
import Sort from "./Sort";
import TSort from "../_types/sort";
import ProductList from "./ProductsList";

type TProductsProps = {
  products: TProduct[];
};

export default function Products({ products }: TProductsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [productsCopy, setProductsCopy] = useState(products);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortParam, setSortParam] = useState<TSort>("name");
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const handleDelete = (id: number) => {
    setProductsCopy((prev) => prev.filter((product) => product.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  return (
    <div className="flex justify-between flex-col-reverse md:flex-row gap-4">
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Sort sortParam={sortParam} setSortParam={setSortParam} />
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
                    <ProductFormWrapper
                      setProducts={setProductsCopy}
                      onSuccess={close}
                    />
                  </DrawerBody>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </div>
        <ProductList
          products={productsCopy}
          sortParam={sortParam}
          searchQuery={searchQuery}
          onSelect={setSelectedProduct}
          onDelete={handleDelete}
        />
      </div>
      <div className="max-w-full w-full md:max-w-96">
        <Card fullWidth>
          <CardBody>
            {selectedProduct ? (
              <ProductFormWrapper
                setProducts={setProductsCopy}
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
