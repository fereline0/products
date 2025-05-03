import { Input } from "@heroui/input";
import { useProductStore } from "../_stores/productStore";

export default function Search() {
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);

  return (
    <Input value={searchQuery} onValueChange={setSearchQuery} label="Search" />
  );
}
