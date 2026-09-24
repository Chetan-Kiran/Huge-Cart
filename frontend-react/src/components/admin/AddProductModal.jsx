import { useState } from "react";
import { X } from "lucide-react";

export default function AddProductModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    skuCode: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  if (!open) return null;

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = () => {
    onSave({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });

    setForm({
      skuCode: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
      imageUrl: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[36px] bg-surface p-8 shadow-xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black text-espresso">Add New Product</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="grid gap-5">
          <input
            placeholder="SKU Code"
            value={form.skuCode}
            onChange={(e) => update("skuCode", e.target.value)}
            className="rounded-2xl border border-border px-4 py-3"
          />

          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="rounded-2xl border border-border px-4 py-3"
          />

          <textarea
            rows="3"
            placeholder="Description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="rounded-2xl border border-border px-4 py-3"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className="rounded-2xl border border-border px-4 py-3"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              className="rounded-2xl border border-border px-4 py-3"
            />
          </div>

          <input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => update("imageUrl", e.target.value)}
            className="rounded-2xl border border-border px-4 py-3"
          />

          {/* Image Preview */}
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="preview"
              className="mt-2 h-60 w-full rounded-2xl object-cover"
            />
          )}

          <button
            onClick={submit}
            className="mt-4 rounded-2xl bg-espresso py-4 text-white font-bold hover:bg-[#3F2727]"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
