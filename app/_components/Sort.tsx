import { Select, SelectItem } from "@heroui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import TSort from "../_types/sort";

type TSortProps = {
  sortParam: TSort;
  setSortParam: Dispatch<SetStateAction<TSort>>;
};

export default function Sort({ sortParam, setSortParam }: TSortProps) {
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
