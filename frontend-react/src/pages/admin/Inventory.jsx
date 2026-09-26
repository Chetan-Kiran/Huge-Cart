import { useEffect, useState } from "react";
import { Warehouse, Search } from "lucide-react";

import { getProducts } from "../../services/productApi";
import { updateInventoryQuantity } from "../../services/inventoryApi";
import InventoryRow from "../../components/admin/InventoryRow";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const loadInventory = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const changeStock = async (product, amount) => {
    const nextQuantity = Math.max(product.quantity + amount, 0);

    try {
      await updateInventoryQuantity(product.skuCode, nextQuantity);

      setProducts((prev) =>
        prev.map((item) =>
          item.skuCode === product.skuCode
            ? { ...item, quantity: nextQuantity }
            : item,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update inventory.");
    }
  };

  const filtered = products.filter((product) => {
    const query = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(query) ||
      product.skuCode.toLowerCase().includes(query)
    );
  });

  const totalUnits = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  const lowStock = products.filter((product) => product.quantity < 30);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-black text-espresso">Inventory</h1>

          <p className="mt-2 text-caramel">
            Monitor and update live inventory across HugeCart.
          </p>
        </div>

        <div className="rounded-[24px] bg-surface border border-border p-5 shadow">
          <p className="text-sm text-caramel">Total Units</p>

          <h2 className="text-4xl font-black text-espresso">{totalUnits}</h2>
        </div>
      </div>

      {/* Low Stock Banner */}
      <div className="rounded-[28px] bg-[#FFF3E8] p-6 border border-[#F4D4A8]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-espresso">
              Low Stock Alert
            </h2>

            <p className="text-caramel mt-2">
              {lowStock.length} product(s) need restocking.
            </p>
          </div>

          <Warehouse size={42} className="text-caramel" />
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center rounded-full border border-border bg-surface px-5 py-3">
        <Search size={18} className="text-caramel" />

        <input
          placeholder="Search SKU or Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-4 w-full bg-transparent outline-none"
        />
      </div>

      {/* Inventory List */}
      <div className="space-y-6">
        {filtered.map((product) => (
          <InventoryRow
            key={product.skuCode}
            product={product}
            onIncrease={(p) => changeStock(p, 10)}
            onDecrease={(p) => changeStock(p, -10)}
          />
        ))}
      </div>
    </div>
  );
}
