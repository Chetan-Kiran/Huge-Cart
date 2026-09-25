import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, listView = false }) {
  const navigate = useNavigate();

  const openProduct = () => {
    console.log("Clicked Product:", product);

    navigate(`/product/${product.skuCode}`, {
      state: product,
    });
  };

  if (listView) {
    return (
      <div className="flex gap-6 rounded-[30px] bg-white border border-border p-5 shadow-sm hover:shadow-lg transition">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-44 w-44 rounded-2xl object-cover"
        />

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-espresso">{product.name}</h3>

            <p className="mt-3 text-[#7A6553] line-clamp-3">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-3xl font-black text-caramel">
              ₹{product.price.toLocaleString()}
            </p>

            <button
              onClick={openProduct}
              className="rounded-full bg-espresso px-6 py-3 text-white font-semibold hover:bg-[#5C3820]"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={openProduct}
      className="group cursor-pointer overflow-hidden rounded-[30px] border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative overflow-hidden bg-[#F7F3EE]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-4 top-4 flex flex-col gap-3 opacity-0 transition group-hover:opacity-100">
          <button className="rounded-full bg-white p-3 shadow">
            <Heart size={18} />
          </button>

          <button className="rounded-full bg-white p-3 shadow">
            <Eye size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <h3 className="text-xl font-bold text-espresso line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-[#7A6553] line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-black text-caramel">
            ₹{product.price.toLocaleString()}
          </p>

          <span className="rounded-full bg-[#E8DED3] px-3 py-1 text-xs font-semibold text-[#6F4E37]">
            In Stock
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openProduct();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6F4E37] py-3 text-white font-semibold hover:bg-[#5A3C2C]"
        >
          <ShoppingCart size={18} />
          View Product
        </button>
      </div>
    </div>
  );
}
