export default function SortDropdown({ sort, setSort }) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="rounded-2xl border border-border bg-white px-5 py-3 text-[#6F4E37] outline-none shadow-sm"
    >
      <option value="default">Featured</option>
      <option value="low">Price : Low to High</option>
      <option value="high">Price : High to Low</option>
    </select>
  );
}