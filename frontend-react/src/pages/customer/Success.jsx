import { useLocation, useNavigate } from "react-router-dom";
import {
  CircleCheckBig,
  Truck,
  PackageCheck,
  ArrowRight,
  Clock3,
  ShieldCheck,
  Receipt,
} from "lucide-react";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderData = location.state;

  if (!orderData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="rounded-[30px] bg-surface p-10 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-espresso">No Order Found</h2>

          <p className="mt-3 text-caramel">
            This page is available only after placing an order.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-full bg-espresso px-8 py-3 text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const { customer, items, total } = orderData;

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-8">
        <div className="rounded-[40px] bg-surface p-10 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-100">
              <CircleCheckBig className="text-green-600" size={64} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[5px] text-caramel">
              HugeCart Order Confirmed
            </p>

            <h1 className="mt-3 text-5xl font-black text-espresso">
              Thank You For Your Purchase!
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-text">
              Your order has been placed successfully and is now being
              processed. We'll notify you once it's shipped.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] bg-background p-8 shadow">
              <div className="mb-6 flex items-center gap-3">
                <Receipt className="text-caramel" />
                <h2 className="text-2xl font-bold text-espresso">
                  Order Receipt
                </h2>
              </div>

              <ReceiptRow label="Customer" value={customer.name || "Guest"} />
              <ReceiptRow
                label="Email"
                value={customer.email || "Not Provided"}
              />
              <ReceiptRow
                label="Phone"
                value={customer.phone || "Not Provided"}
              />
              <ReceiptRow label="Payment" value={customer.paymentMethod} />
              <ReceiptRow label="Delivery" value="24–48 Hours" />

              <div className="mt-6 border-t border-border pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-text">
                    Total Paid
                  </span>
                  <span className="text-3xl font-black text-caramel">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-background p-8 shadow">
              <h2 className="mb-6 text-2xl font-bold text-espresso">
                Delivery Address
              </h2>

              <div className="space-y-3 text-text leading-7">
                <p className="font-bold text-xl text-espresso">
                  {customer.name}
                </p>
                <p>{customer.address}</p>
                <p>
                  {customer.city}, {customer.state}
                </p>
                <p>PIN : {customer.pinCode}</p>
                <p>{customer.phone}</p>
              </div>

              <div className="mt-8 rounded-2xl bg-[#FFF3E8] p-5">
                <div className="flex items-center gap-3 text-caramel font-semibold">
                  <ShieldCheck size={20} />
                  Payment Verified Successfully
                </div>
              </div>
            </div>
          </div>

          <section className="mt-14">
            <h2 className="mb-8 text-3xl font-black text-espresso">
              Purchased Items
            </h2>

            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.skuCode}
                  className="flex flex-col gap-5 rounded-[28px] border border-border bg-background p-6 md:flex-row md:items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-28 w-28 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-espresso">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-caramel">SKU : {item.skuCode}</p>

                    <p className="mt-2 text-text">Quantity : {item.quantity}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-caramel">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-[30px] bg-background p-8 shadow">
            <div className="mb-8 flex items-center gap-3">
              <Truck className="text-caramel" />
              <h2 className="text-3xl font-black text-espresso">
                Delivery Timeline
              </h2>
            </div>

            <div className="space-y-8">
              <TimelineStep
                icon={<PackageCheck className="text-green-600" size={22} />}
                title="Order Confirmed"
                subtitle="We've received your order successfully."
                status="Completed"
                color="bg-green-100"
              />

              <TimelineStep
                icon={<Clock3 className="text-caramel" size={22} />}
                title="Preparing Shipment"
                subtitle="Your product is being packed in our warehouse."
                status="Processing"
                color="bg-[#FFF3E8]"
              />

              <TimelineStep
                icon={<Truck className="text-caramel" size={22} />}
                title="Out For Delivery"
                subtitle="Estimated arrival within 24–48 hours."
                status="Upcoming"
                color="bg-[#FFF8F0]"
              />
            </div>
          </section>

          <section className="mt-16 rounded-[30px] bg-[#FFF3E8] p-8 text-center">
            <h2 className="text-3xl font-black text-espresso">
              Thank you for shopping with HugeCart ❤️
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-text leading-8">
              We appreciate your trust in HugeCart. Your premium electronics are
              being carefully prepared and will reach you very soon.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-5 md:flex-row">
              <button
                onClick={() => navigate("/")}
                className="rounded-full bg-espresso px-8 py-4 font-bold text-white transition hover:bg-[#5A3928]"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => navigate("/orders", { state: orderData })}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-caramel px-8 py-4 font-bold text-caramel transition hover:bg-caramel hover:text-white"
              >
                My Orders
                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value }) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
      <span className="text-text">{label}</span>
      <span className="font-semibold text-espresso">{value}</span>
    </div>
  );
}

function TimelineStep({ icon, title, subtitle, status, color }) {
  return (
    <div className="flex gap-5">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-espresso">{title}</h3>
          <span className="rounded-full bg-[#E8DED3] px-4 py-1 text-sm font-semibold text-caramel">
            {status}
          </span>
        </div>

        <p className="mt-2 text-text">{subtitle}</p>
      </div>
    </div>
  );
}
