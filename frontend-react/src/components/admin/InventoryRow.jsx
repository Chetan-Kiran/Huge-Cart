import { Plus, Minus } from "lucide-react";

export default function InventoryRow({ product, onIncrease, onDecrease }) {
  const lowStock = product.quantity < 30;

  return (
    <div className="rounded-[28px] border border-border bg-surface p-5 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-24 w-24 rounded-2xl object-cover"
        />

        <div className="flex-1">
          <h2 className="text-xl font-bold text-espresso">{product.name}</h2>

          <p className="text-caramel mt-1">SKU : {product.skuCode}</p>

          <p className="text-sm text-text mt-2">Premium Electronics</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-caramel">Current Stock</p>

          <h3
            className={`text-4xl font-black ${
              lowStock ? "text-red-600" : "text-green-700"
            }`}
          >
            {product.quantity}
          </h3>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              lowStock
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {lowStock ? "LOW STOCK" : "AVAILABLE"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onIncrease(product)}
            className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            <Plus size={18} />
            Add 10
          </button>

          <button
            onClick={() => onDecrease(product)}
            className="flex items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-white hover:bg-orange-700"
          >
            <Minus size={18} />
            Remove 10
          </button>
        </div>
      </div>
    </div>
  );
}
