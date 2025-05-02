import { Dispatch, SetStateAction } from "react";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Button, PressEvent } from "@heroui/button";
import { VariantProps } from "@heroui/theme";

type TProductFormProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  onSubmit: (e: PressEvent) => void;
  submitButtonProps: Omit<VariantProps<typeof Button>, "onPress">;
};

export default function ProductForm({
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  onSubmit,
  submitButtonProps,
}: TProductFormProps) {
  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const parsedValue = parseFloat(numericValue);
    setPrice(isNaN(parsedValue) ? 0 : parsedValue);
  };

  return (
    <Form>
      <Input
        label="Product name"
        value={name}
        onValueChange={setName}
        required
      />
      <Textarea
        label="Description"
        value={description}
        onValueChange={setDescription}
      />
      <Input
        label="Price"
        value={price.toString()}
        onValueChange={handlePriceChange}
        type="number"
        min="0"
        step="0.01"
        required
      />

      <div className="w-full flex justify-end gap-1">
        <Button onPress={onSubmit} {...submitButtonProps} />
      </div>
    </Form>
  );
}
