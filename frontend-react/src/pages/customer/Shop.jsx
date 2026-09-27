import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, LayoutGrid, Rows3 } from "lucide-react";

import SearchBar from "../../components/customer/SearchBar";
import ProductCard from "../../components/customer/ProductCard";
import CategoryFilter from "../../components/customer/CategoryFilter";
import SortDropdown from "../../components/customer/SortDropdown";

import { getProducts } from "../../services/productApi";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [grid, setGrid] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(category.toLowerCase()),
      );
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-[#6F4E37] text-white py-14">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="text-5xl font-black">Shop Premium Electronics</h1>
          <p className="mt-3 text-[#E8DED3]">
            Explore flagship smartphones, laptops, wearables and accessories.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-border">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal size={20} className="text-caramel" />
                <h2 className="font-bold text-xl text-espresso">Filters</h2>
              </div>

              <CategoryFilter category={category} setCategory={setCategory} />
            </div>
          </aside>

          {/* Right */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
              <SearchBar value={search} onChange={setSearch} />

              <SortDropdown sort={sort} setSort={setSort} />
            </div>

            <div className="flex items-center justify-between mb-10">
              <p className="text-[#7A6553] font-medium">
                {filteredProducts.length} Products Found
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setGrid(true)}
                  className={`p-3 rounded-xl ${
                    grid
                      ? "bg-espresso text-white"
                      : "bg-white border border-border"
                  }`}
                >
                  <LayoutGrid size={18} />
                </button>

                <button
                  onClick={() => setGrid(false)}
                  className={`p-3 rounded-xl ${
                    !grid
                      ? "bg-espresso text-white"
                      : "bg-white border border-border"
                  }`}
                >
                  <Rows3 size={18} />
                </button>
              </div>
            </div>

            {loading ? (
              <p className="text-center text-[#7A6553]">Loading products...</p>
            ) : (
              <div
                className={
                  grid
                    ? "grid md:grid-cols-2 xl:grid-cols-3 gap-8"
                    : "space-y-6"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    listView={!grid}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
