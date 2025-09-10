import { Input } from "@/components/UI";
import { SearchbarProps } from "@/types";
import { ChangeEvent } from "react";

export default function Searchbar({
  value,
  onChange,
  placeholder,
}: SearchbarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full max-w-sm hidden sm:block"
    />
  );
}
