import { ShoppingBag, Heart, User, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useCart } from "../../context/Ordercontext.jsx";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const { cart } = useCart();

  const linkStyle = ({ isActive }) =>
    `font-medium transition ${
      isActive ? "text-caramel" : "text-text hover:text-caramel"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-espresso text-xl font-black text-white shadow-md">
            HC
          </div>

          <div>
            <h1 className="text-2xl font-black text-espresso">HugeCart</h1>
            <p className="text-xs text-caramel">Premium Electronics</p>
          </div>
        </NavLink>

        {/* Search */}
        <div className="hidden w-[420px] lg:block">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/shop" className={linkStyle}>
            Shop
          </NavLink>

          <NavLink to="/orders" className={linkStyle}>
            Orders
          </NavLink>

          <button className="text-text transition hover:text-caramel">
            <Heart size={22} />
          </button>

          <button className="relative text-text transition hover:text-caramel">
            <NavLink to="/cart" className={linkStyle}>
              <ShoppingBag size={22} />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-caramel text-xs text-white">
                {cart.length}
              </span>
            </NavLink>
          </button>

          <button className="rounded-full bg-espresso p-2 text-white transition hover:bg-[#5C3820]">
            <User size={20} />
          </button>
        </nav>

        {/* Mobile */}
        <button className="lg:hidden text-espresso">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Search */}
      <div className="px-5 pb-4 lg:hidden">
        <SearchBar value={search} onChange={setSearch} />
      </div>
    </header>
  );
}
