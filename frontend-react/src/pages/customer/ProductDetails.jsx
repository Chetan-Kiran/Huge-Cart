import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";

import { getInventory } from "../../services/inventoryApi";
import { useCart } from "../../context/Ordercontext.jsx";

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sku } = useParams();
  const { addToCart } = useCart();

  console.log("URL SKU:", sku);
  console.log("Location State:", location.state);

  const product = location.state;

  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loadingStock, setLoadingStock] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      if (!product?.skuCode) {
        setLoadingStock(false);
        return;
      }

      try {
        const data = await getInventory(product.skuCode);
        setStock(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStock(false);
      }
    };

    fetchStock();
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold text-espresso">Product Not Found</h2>

        <p className="text-caramel">
          The page was refreshed or opened directly.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="rounded-full bg-espresso px-6 py-3 text-white"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const maxQty = stock?.quantity || product.quantity || 1;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-8 py-14">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* Left Image */}
          <div className="rounded-[36px] bg-latte/30 p-8 shadow-md">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="mx-auto h-[520px] w-full rounded-[28px] object-contain transition duration-500 hover:scale-105"
            />
          </div>

          {/* Right Info */}
          <div className="lg:sticky lg:top-24">
            <p className="mb-2 font-semibold uppercase tracking-[4px] text-caramel">
              HugeCart Exclusive
            </p>

            <h1 className="text-5xl font-black text-espresso">
              {product.name}
            </h1>

            <p className="mt-4 text-lg leading-8 text-text">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-5">
              <span className="rounded-full bg-caramel px-5 py-3 text-3xl font-black text-white">
                ₹{product.price.toLocaleString()}
              </span>
            </div>

            {/* Stock */}
            <div className="mt-8 rounded-2xl bg-surface p-5 shadow">
              <p className="mb-3 font-semibold text-text">Availability</p>

              {loadingStock ? (
                <p className="text-caramel">Checking stock...</p>
              ) : stock?.quantity > 20 ? (
                <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                  In Stock ({stock.quantity})
                </span>
              ) : stock?.quantity > 0 ? (
                <span className="rounded-full bg-orange-100 px-4 py-2 font-semibold text-orange-700">
                  Only {stock.quantity} Left
                </span>
              ) : (
                <span className="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-3 font-semibold text-text">Quantity</p>

              <div className="flex w-fit items-center rounded-full border border-border bg-surface px-2 py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="rounded-full p-2 hover:bg-latte/30"
                >
                  <Minus size={18} />
                </button>

                <span className="w-14 text-center text-lg font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  className="rounded-full p-2 hover:bg-latte/30"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 space-y-4">
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  navigate("/cart");
                }}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-espresso py-4 text-lg font-bold text-white hover:bg-[#4B2E2E]"
              >
                <ShoppingBag size={22} />
                Add To Cart
              </button>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      product,
                      quantity,
                    },
                  })
                }
                className="w-full rounded-2xl border-2 border-caramel py-4 text-lg font-bold text-caramel transition hover:bg-caramel hover:text-white"
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="mt-10 space-y-4 rounded-[28px] bg-surface p-6 shadow">
              <div className="flex items-center gap-4">
                <Truck className="text-caramel" />
                <div>
                  <h4 className="font-semibold text-text">Free Delivery</h4>
                  <p className="text-sm text-caramel">
                    Delivered in 24–48 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ShieldCheck className="text-caramel" />
                <div>
                  <h4 className="font-semibold text-text">Secure Payments</h4>
                  <p className="text-sm text-caramel">
                    Protected by HugeCart checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <RotateCcw className="text-caramel" />
                <div>
                  <h4 className="font-semibold text-text">Easy Returns</h4>
                  <p className="text-sm text-caramel">
                    7-day replacement available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <section className="mt-20 rounded-[32px] bg-surface p-8 shadow">
          <h2 className="mb-8 text-3xl font-black text-espresso">
            Specifications
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Spec title="Brand" value="HugeCart Electronics" />
            <Spec title="Product" value={product.name} />
            <Spec title="Warranty" value="1 Year Official Warranty" />
            <Spec title="Shipping" value="Free Across India" />
            <Spec title="Payment" value="UPI • Card • Net Banking" />
            <Spec title="Support" value="24×7 Customer Care" />
          </div>
        </section>
      </div>
    </div>
  );
}

function Spec({ title, value }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <p className="text-sm uppercase tracking-wide text-caramel">{title}</p>
      <h4 className="mt-2 text-lg font-bold text-espresso">{value}</h4>
    </div>
  );
}
