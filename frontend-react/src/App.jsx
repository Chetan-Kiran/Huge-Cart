import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Imports
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Customer Page Imports
import Home from "./pages/customer/Home";
import Shop from "./pages/customer/Shop";
import ProductDetails from "./pages/customer/ProductDetails";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import Cart from "./pages/customer/Cart";
import Success from "./pages/customer/Success";

// Admin Page Imports
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Inventory from "./pages/admin/Inventory";
import AdminOrders from "./pages/admin/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🛒 Customer Facing Routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:sku" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* 📊 Admin Panel Routes */}
        <Route path= "/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
