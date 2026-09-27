import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Package,
  IndianRupee,
  Clock3,
  CheckCircle2,
  Truck,
  User,
  Mail,
} from "lucide-react";

import { getAllOrders } from "../../services/orderApi";
import OrderStatusBadge from "../../components/admin/OrderStatusBadge";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();

      const withStatus = data.map((order) => ({
        ...order,
        status: "Confirmed",
      }));

      setOrders(withStatus);
      setFiltered(withStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const value = search.toLowerCase();

    setFiltered(
      orders.filter(
        (order) =>
          order.skuCode.toLowerCase().includes(value) ||
          order.orderNumber.toLowerCase().includes(value),
      ),
    );
  }, [search, orders]);

  const stats = useMemo(() => {
    const revenue = orders.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0,
    );

    const pending = orders.filter(
      (o) => o.status === "Processing" || o.status === "Confirmed",
    ).length;

    const delivered = orders.filter((o) => o.status === "Delivered").length;

    return {
      revenue,
      totalOrders: orders.length,
      pending,
      delivered,
    };
  }, [orders]);

  const markDelivered = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Delivered" } : order,
      ),
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-caramel text-xl font-bold">
        Loading Orders...
      </div>
    );

  return (
    <div className="bg-background min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-8 space-y-8">
        <div>
          <h1 className="text-5xl font-black text-espresso">
            Orders Management
          </h1>

          <p className="mt-2 text-caramel">
            Monitor all HugeCart customer orders.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<Package size={28} />}
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.revenue.toLocaleString()}`}
            icon={<IndianRupee size={28} />}
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            icon={<Clock3 size={28} />}
          />

          <StatCard
            title="Delivered"
            value={stats.delivered}
            icon={<CheckCircle2 size={28} />}
          />
        </div>

        {/* Search */}
        <div className="rounded-[24px] bg-surface p-5 shadow flex items-center gap-4">
          <Search className="text-caramel" />

          <input
            placeholder="Search SKU or Order Number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-espresso"
          />
        </div>

        {/* Orders Table */}
        <div className="rounded-[30px] bg-surface shadow-lg overflow-hidden">
          <div className="grid grid-cols-6 bg-espresso text-white font-bold px-6 py-4 text-sm uppercase">
            <p>Order</p>
            <p>Customer</p>
            <p>SKU</p>
            <p>Price</p>
            <p>Status</p>
            <p>Action</p>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-caramel">
              No Orders Found.
            </div>
          ) : (
            filtered.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-6 items-center border-b border-border px-6 py-5 hover:bg-[#FFF9F4]"
              >
                <div>
                  <p className="font-bold text-espresso text-sm">
                    {order.orderNumber.slice(0, 8)}
                  </p>

                  <p className="text-xs text-caramel">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-espresso">
                    <User size={15} />
                    {order.firstName || "Guest"}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-caramel">
                    <Mail size={14} />
                    {order.email || "guest@hugecart.com"}
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-espresso">{order.skuCode}</p>

                  <p className="text-xs text-caramel">Qty : {order.quantity}</p>
                </div>

                <div>
                  <p className="font-black text-caramel">
                    ₹{(order.price * order.quantity).toLocaleString()}
                  </p>
                </div>

                <div>
                  <OrderStatusBadge status={order.status} />
                </div>

                <div>
                  {order.status !== "Delivered" ? (
                    <button
                      onClick={() => markDelivered(order.id)}
                      className="rounded-full bg-caramel px-4 py-2 text-white text-sm hover:bg-[#9A5A2A]"
                    >
                      Mark Delivered
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">
                      <Truck size={16} />
                      Delivered
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-[28px] bg-surface p-6 shadow-lg border border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-caramel uppercase">{title}</p>

          <h2 className="mt-3 text-3xl font-black text-espresso">{value}</h2>
        </div>

        <div className="rounded-full bg-[#FFF3E8] p-4 text-caramel">{icon}</div>
      </div>
    </div>
  );
}
