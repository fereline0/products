import { Input } from "@heroui/input";
import { Dispatch, SetStateAction } from "react";

type TSearchProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export default function Search({ searchQuery, setSearchQuery }: TSearchProps) {
  return (
    <Input value={searchQuery} onValueChange={setSearchQuery} label="Search" />
  );
}
