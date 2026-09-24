export default function ProductTable({ products }) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-surface shadow-md border border-border">
      <table className="w-full">
        <thead className="bg-[#FFF3E8] text-espresso">
          <tr>
            <th className="px-6 py-5 text-left">Product</th>
            <th className="px-6 py-5 text-left">SKU</th>
            <th className="px-6 py-5 text-left">Price</th>
            <th className="px-6 py-5 text-left">Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.skuCode}
              className="border-t border-border hover:bg-[#FFF8F0] transition"
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-bold text-espresso">{product.name}</h3>

                    <p className="text-sm text-caramel line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-5 font-medium text-caramel">
                {product.skuCode}
              </td>

              <td className="px-6 py-5 font-bold text-espresso">
                ₹{product.price.toLocaleString()}
              </td>

              <td className="px-6 py-5">
                <span
                  className={`rounded-full px-3 py-2 text-sm font-bold ${
                    product.quantity > 30
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.quantity} Units
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
