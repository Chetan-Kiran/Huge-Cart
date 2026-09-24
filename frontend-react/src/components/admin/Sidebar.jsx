import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Store,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "Products", icon: Package, path: "/admin/products" },
  { title: "Inventory", icon: Warehouse, path: "/admin/inventory" },
  { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-espresso text-white min-h-screen p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-12 w-12 rounded-2xl bg-caramel flex items-center justify-center font-black text-xl">
          HC
        </div>

        <div>
          <h2 className="font-black text-2xl">HugeCart</h2>
          <p className="text-sm text-[#EAD9C8]">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 transition
                ${
                  isActive
                    ? "bg-caramel text-white shadow"
                    : "hover:bg-[#5A3928] text-[#F3E8DC]"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="rounded-2xl bg-[#5A3928] p-4">
        <div className="flex items-center gap-3">
          <Store size={20} />
          <div>
            <p className="font-semibold">Store Status</p>
            <p className="text-sm text-green-300">Live</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
