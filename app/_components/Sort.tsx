import { Select, SelectItem } from "@heroui/react";
import { useProductStore } from "../_stores/productStore";
import { ChangeEvent } from "react";
import TSort from "../_types/sort";

export default function Sort() {
  const sortParam = useProductStore((state) => state.sortParam);
  const setSortParam = useProductStore((state) => state.setSortParam);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortParam(e.target.value as TSort);
  };

  return (
    <Select
      label="Sort"
      defaultSelectedKeys={[sortParam]}
      onChange={handleSelectionChange}
    >
      <SelectItem key="name">By name</SelectItem>
      <SelectItem key="recentlyAdded">Recently added</SelectItem>
    </Select>
  );
}
