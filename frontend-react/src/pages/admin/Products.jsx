import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import ProductTable from "../../components/admin/ProductTable";
import AddProductModal from "../../components/admin/AddProductModal";

import { getProducts, createProduct } from "../../services/productApi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const saveProduct = async (product) => {
    try {
      await createProduct(product);

      alert("Product Added Successfully!");

      loadProducts();

      setOpenModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to Add Product.");
    }
  };

  const filtered = products.filter((product) => {
    const q = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(q) ||
      product.skuCode.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-black text-espresso">Products</h1>

          <p className="text-caramel mt-2">Manage products in HugeCart.</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-full bg-espresso px-6 py-4 text-white font-bold hover:bg-[#3F2727]"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center rounded-full border border-border bg-surface px-5 py-3">
        <Search size={18} className="text-caramel" />

        <input
          placeholder="Search by product or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-4 w-full bg-transparent outline-none"
        />
      </div>

      {/* Table */}
      <ProductTable products={filtered} />

      {/* Modal */}
      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={saveProduct}
      />
    </div>
  );
}
