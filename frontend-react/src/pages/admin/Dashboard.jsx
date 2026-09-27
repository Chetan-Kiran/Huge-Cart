import { useEffect, useState } from "react";
import { Package, Warehouse, ShoppingCart, TriangleAlert } from "lucide-react";

import StatsCard from "../../components/admin/StatsCard";
import { getProducts } from "../../services/productApi";
import { useCart } from "../../context/Ordercontext";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const { orders } = useCart();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const totalProducts = products.length;

  const totalInventory = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  const lowStock = products.filter((product) => product.quantity < 30);

  return (
    <div className="space-y-10">
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Products"
          value={totalProducts}
          icon={Package}
          color="#8B5A2B"
        />

        <StatsCard
          title="Inventory Units"
          value={totalInventory}
          icon={Warehouse}
          color="#5E8B7E"
        />

        <StatsCard
          title="Orders"
          value={orders.length}
          icon={ShoppingCart}
          color="#4B2E2E"
        />

        <StatsCard
          title="Low Stock"
          value={lowStock.length}
          icon={TriangleAlert}
          color="#D97706"
        />
      </div>

      {/* Recent Products */}
      <section className="rounded-[30px] bg-surface p-8 shadow-md">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-espresso">Recent Products</h2>
        </div>

        <div className="space-y-5">
          {products.map((product) => (
            <div
              key={product.skuCode}
              className="flex items-center gap-5 border-b border-border pb-4"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-20 w-20 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-bold text-espresso">{product.name}</h3>

                <p className="text-caramel">{product.skuCode}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-caramel">
                  ₹{product.price.toLocaleString()}
                </p>

                <p className="text-sm text-text">Stock : {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Low Stock Alert */}
      <section className="rounded-[30px] bg-surface p-8 shadow-md">
        <h2 className="mb-8 text-3xl font-black text-espresso">
          Low Stock Alert
        </h2>

        {lowStock.length === 0 ? (
          <div className="rounded-2xl bg-green-50 p-6 text-green-700 font-semibold">
            Everything looks healthy. 🎉
          </div>
        ) : (
          <div className="space-y-4">
            {lowStock.map((product) => (
              <div
                key={product.skuCode}
                className="flex items-center justify-between rounded-2xl bg-[#FFF3E8] p-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-bold text-espresso">{product.name}</h3>

                    <p className="text-caramel">SKU : {product.skuCode}</p>
                  </div>
                </div>

                <span className="rounded-full bg-red-100 px-4 py-2 text-red-700 font-bold">
                  {product.quantity} Left
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
