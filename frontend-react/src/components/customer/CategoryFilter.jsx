const categories = ["All", "Phone", "Laptop", "Samsung", "Apple", "Wearable"];

export default function CategoryFilter({ category, setCategory }) {
  return (
    <div className="flex flex-col gap-3">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`rounded-full px-4 py-3 text-left font-medium transition ${
            category === item
              ? "bg-[#6F4E37] text-white"
              : "bg-[#F7F3EE] hover:bg-[#E8DED3] text-[#6F4E37]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
