import { Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Ordercontext";

export default function Cart() {
  const navigate = useNavigate();

  const { cart, removeFromCart, totalPrice } = useCart();

  if (!cart.length) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={70} className="mx-auto text-caramel" />

          <h2 className="mt-5 text-3xl font-bold text-espresso">
            Your Cart is Empty
          </h2>

          <button
            onClick={() => navigate("/shop")}
            className="mt-8 rounded-full bg-espresso px-8 py-3 text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const gst = Math.round(totalPrice * 0.18);

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-8">
        <h1 className="text-5xl font-black text-espresso">Shopping Cart</h1>

        <p className="mt-2 mb-10 text-caramel">
          Review your selected products.
        </p>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.skuCode}
                className="flex gap-5 rounded-[28px] bg-surface p-5 shadow"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-32 w-32 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-espresso">
                    {item.name}
                  </h2>

                  <p className="text-caramel mt-2">SKU : {item.skuCode}</p>

                  <p className="mt-2 text-text">Qty : {item.quantity}</p>

                  <p className="mt-3 text-2xl font-black text-caramel">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.skuCode)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-[30px] bg-surface p-8 shadow h-fit sticky top-24">
            <h2 className="text-2xl font-bold text-espresso mb-6">
              Price Summary
            </h2>

            <PriceRow title="Subtotal" value={totalPrice} />

            <PriceRow title="GST (18%)" value={gst} />

            <PriceRow title="Delivery" text="FREE" green />

            <hr className="my-5 border-border" />

            <PriceRow title="Grand Total" value={totalPrice + gst} bold />

            <button
              onClick={() => navigate("/checkout")}
              className="mt-8 w-full rounded-full bg-espresso py-4 font-bold text-white hover:bg-[#5A3928]"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceRow({ title, value, text, green, bold }) {
  return (
    <div className="flex justify-between py-3">
      <span className={bold ? "font-bold text-lg text-espresso" : "text-text"}>
        {title}
      </span>

      <span
        className={
          green
            ? "font-bold text-green-600"
            : bold
              ? "font-black text-2xl text-caramel"
              : "font-semibold text-espresso"
        }
      >
        {text || `₹${value.toLocaleString()}`}
      </span>
    </div>
  );
}
