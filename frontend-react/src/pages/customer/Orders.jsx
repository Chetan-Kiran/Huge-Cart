import { useCart } from "../../context/Ordercontext";
import { PackageCheck, Truck, Clock } from "lucide-react";

export default function Orders() {
  const { orders } = useCart();

  const totalPrice = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-8">
        <h1 className="text-5xl font-black text-espresso">My Orders</h1>

        <p className="mt-2 mb-10 text-caramel">
          Your HugeCart purchases and delivery status.
        </p>

        {orders.length === 0 ? (
          <div className="rounded-[32px] bg-surface py-20 text-center shadow-lg">
            <PackageCheck className="mx-auto mb-5 text-caramel" size={70} />

            <h2 className="text-3xl font-bold text-espresso">No Orders Yet</h2>

            <p className="mt-3 text-caramel">
              Your future purchases will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {orders.map((order, index) => (
                <div
                  key={order.createdAt || index}
                  className="rounded-[30px] bg-surface p-6 shadow-lg"
                >
                  {/* Order Header */}
                  <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <p className="text-sm text-caramel">Order #{index + 1}</p>

                      <h3 className="font-bold text-espresso">
                        {new Date(order.createdAt).toLocaleString()}
                      </h3>
                    </div>

                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                      Confirmed
                    </span>
                  </div>

                  {/* Products */}
                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div
                        key={item.skuCode}
                        className="flex flex-col gap-5 md:flex-row md:items-center"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-28 w-28 rounded-2xl object-cover"
                        />

                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-espresso">
                            {item.name}
                          </h2>

                          <p className="mt-1 text-caramel">
                            SKU : {item.skuCode}
                          </p>

                          <p className="mt-1 text-text">
                            Quantity : {item.quantity}
                          </p>

                          <p className="mt-2 text-xl font-black text-caramel">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-6 grid gap-4 border-t border-border pt-5 md:grid-cols-2">
                    <div className="flex items-center gap-3 text-caramel">
                      <Truck size={18} />
                      Delivered in 24–48 Hours
                    </div>

                    <div className="flex items-center gap-3 text-caramel">
                      <Clock size={18} />
                      Order Processing
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#FFF8F0] p-4">
                    <span className="font-semibold text-espresso">
                      Order Total
                    </span>

                    <span className="text-2xl font-black text-caramel">
                      ₹{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Total */}
            <div className="mt-10 rounded-[30px] bg-surface p-6 shadow-lg">
              <div className="flex items-center justify-between text-xl font-bold text-espresso">
                <span>Total Orders Value</span>

                <span className="text-caramel">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
