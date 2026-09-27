import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShieldCheck, Truck, CreditCard, Smartphone } from "lucide-react";

import { useCart } from "../../context/Ordercontext";
import { placeOrder } from "../../services/orderApi";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart,addOrder,clearCart } = useCart();
  

  const buyNow = location.state;

  const items = buyNow
    ? [{ ...buyNow.product, quantity: buyNow.quantity }]
    : cart;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    paymentMethod: "UPI",
  });

  const updateField = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleOrder = async () => {
    if (!items.length) return;

    setLoading(true);

    try {
      const payload = {
        skuCode: items[0].skuCode,
        productId: items[0].id,
        quantity: items[0].quantity,
        price: items[0].price,

        userDetails: {
          email: customer.email,
          firstName: customer.name,
          lastName: "",
        },
      };

      console.log("Sending Order:", payload);

      const response = await placeOrder(payload);

      console.log("Backend Response:", response);

      const completedOrder = {
        customer,
        items,
        total: grandTotal,
        backend: response,
        createdAt: new Date().toISOString(),
      };

      addOrder(completedOrder); // Save to Orders page
      clearCart(); // Empty cart

      navigate("/success", {
        state: completedOrder,
      });
    } catch (err) {
      console.error("ORDER ERROR:", err.response?.data || err.message);
      alert("Order Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-8">
        <h1 className="mb-2 text-5xl font-black text-espresso">Checkout</h1>
        <p className="mb-10 text-caramel">
          Complete your purchase securely with HugeCart.
        </p>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-[32px] bg-surface p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-espresso">
              Delivery Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                ["Full Name", "name"],
                ["Email", "email"],
                ["Phone", "phone"],
                ["City", "city"],
                ["State", "state"],
                ["PIN Code", "pinCode"],
              ].map(([label, key]) => (
                <input
                  key={key}
                  placeholder={label}
                  value={customer[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-caramel"
                />
              ))}
            </div>

            <textarea
              rows="4"
              placeholder="Complete Delivery Address"
              value={customer.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="mt-5 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-caramel"
            />

            <h2 className="mt-10 mb-5 text-2xl font-bold text-espresso">
              Payment Method
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {["UPI", "Card", "Cash on Delivery"].map((method) => (
                <button
                  key={method}
                  onClick={() => updateField("paymentMethod", method)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    customer.paymentMethod === method
                      ? "border-caramel bg-[#FFF3E8]"
                      : "border-border bg-background"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {method === "UPI" ? (
                      <Smartphone className="text-caramel" />
                    ) : (
                      <CreditCard className="text-caramel" />
                    )}

                    <div>
                      <p className="font-semibold text-espresso">{method}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-surface p-8 shadow-lg lg:sticky lg:top-24">
            <h2 className="mb-6 text-2xl font-bold text-espresso">
              Order Summary
            </h2>

            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.skuCode}
                  className="flex gap-4 border-b border-border pb-5"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-espresso">{item.name}</h3>

                    <p className="text-sm text-caramel">
                      Qty : {item.quantity}
                    </p>

                    <p className="mt-2 font-black text-caramel">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3 border-t border-border pt-6">
              <Row title="Subtotal" value={`₹${subtotal.toLocaleString()}`} />
              <Row title="Delivery" value="FREE" green />
              <Row title="GST (18%)" value={`₹${gst.toLocaleString()}`} />

              <div className="my-3 border-t border-border" />

              <Row
                title="Grand Total"
                value={`₹${grandTotal.toLocaleString()}`}
                bold
              />
            </div>

            <div className="mt-8 rounded-2xl bg-[#FFF3E8] p-4 text-sm text-caramel">
              <div className="mb-3 flex items-center gap-3">
                <Truck size={18} />
                Free delivery within 24–48 hours.
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={18} />
                100% Secure HugeCart Checkout.
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handleOrder}
              className="mt-8 w-full rounded-2xl bg-espresso py-4 text-lg font-bold text-white transition hover:bg-[#5A3928] disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ title, value, bold = false, green = false }) {
  return (
    <div className="flex items-center justify-between">
      <p className={bold ? "font-bold text-espresso" : "text-text"}>{title}</p>
      <p
        className={`font-semibold ${
          green
            ? "text-green-600"
            : bold
              ? "text-2xl text-caramel"
              : "text-espresso"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
