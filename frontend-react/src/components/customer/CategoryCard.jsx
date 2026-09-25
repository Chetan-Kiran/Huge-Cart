import { motion } from "framer-motion";

export default function CategoryCard({ title, description, image }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-[28px] bg-white shadow-md hover:shadow-xl"
    >
      <img src={image} alt={title} className="h-48 w-full object-cover" />

      <div className="p-6">
        <h2 className="text-xl font-bold text-[#6F4E37]">{title}</h2>

        <p className="mt-2 text-sm text-[#7A6553]">{description}</p>
      </div>
    </motion.div>
  );
}
