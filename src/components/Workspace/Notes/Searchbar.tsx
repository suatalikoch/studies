import { ChangeEvent } from "react";
import { SearchbarProps } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/components/UI";

export default function Searchbar({
  value,
  onChange,
  placeholder,
}: SearchbarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full max-w-sm hidden sm:block pl-10"
      />
    </div>
  );
}
