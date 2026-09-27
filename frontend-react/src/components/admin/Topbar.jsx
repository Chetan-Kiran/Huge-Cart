import { Search, Bell, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="bg-surface border-b border-border px-8 py-5 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-3xl font-black text-espresso">
          HugeCart Dashboard
        </h1>

        <p className="text-caramel">
          Manage products, inventory and customer orders.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center bg-background border border-border rounded-full px-4 py-2 w-72">
          <Search size={18} className="text-caramel" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 w-full"
          />
        </div>

        <Bell className="text-caramel" />

        <UserCircle size={34} className="text-espresso" />
      </div>
    </header>
  );
}
