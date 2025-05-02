import { Card, CardBody } from "@heroui/card";
import { VariantProps } from "@heroui/theme";
import { ReactNode } from "react";

type TProductProps = {
  name: string;
  description?: string;
  price: number;
  createdAt: string;
  currency?: string;
  endContent?: ReactNode;
} & Omit<VariantProps<typeof Card>, "children">;

export default function Product({
  name,
  description,
  price,
  createdAt,
  endContent,
  currency = "$",
  ...cardProps
}: TProductProps) {
  return (
    <div className="space-y-4">
      <Card {...cardProps}>
        <CardBody>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{name}</h3>

            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}

            <div className="flex items-center justify-between">
              <span className="font-medium text-primary">
                {currency}
                {price.toLocaleString()}
              </span>
              <time
                className="text-xs text-gray-500"
                dateTime={new Date(createdAt).toISOString()}
              >
                {createdAt}
              </time>
            </div>
          </div>
        </CardBody>
      </Card>
      {endContent}
    </div>
  );
}
