import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center w-full rounded-full bg-white/90 border border-border px-5 py-3 shadow-md transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-caramel">
      <Search className="text-caramel" size={18} />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search premium gadgets..."
        className="ml-3 w-full bg-transparent outline-none text-text placeholder:text-[#A67C52]"
      />
    </div>
  );
}
