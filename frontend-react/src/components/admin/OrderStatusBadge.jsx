export default function OrderStatusBadge({ status }) {
  const styles = {
    Confirmed: "bg-green-100 text-green-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Delivered: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
