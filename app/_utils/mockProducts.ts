import { faker } from "@faker-js/faker";
import { TProduct } from "../_types/product";

export const generateMockProducts = (count: number): TProduct[] => {
  return Array.from({ length: count }, (_, index) => {
    return {
      id: index + 1,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 100, max: 1000 })),
      createdAt: faker.date.between({
        from: new Date(2023, 0, 1),
        to: new Date(),
      }),
    };
  });
};
