import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-[28px] bg-white p-8 shadow-md transition hover:shadow-xl"
    >
      <Icon size={34} className="mb-5 text-[#A67C52]" />

      <h3 className="text-xl font-bold text-[#6F4E37]">{title}</h3>

      <p className="mt-3 leading-7 text-[#7A6553]">{description}</p>
    </motion.div>
  );
}
