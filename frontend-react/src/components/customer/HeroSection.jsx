import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-16">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="rounded-full bg-[#EFE2D3] px-5 py-2 text-sm font-semibold text-[#A67C52]">
            Premium Electronics Collection
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-[#2D241E] lg:text-7xl">
            Discover
            <span className="block text-[#6F4E37]">Smart Luxury.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#7A6553]">
            HugeCart offers premium smartphones, laptops, accessories, and
            wearables with a modern shopping experience powered by Spring Boot
            Microservices.
          </p>

          <div className="mt-10 flex gap-5">
            <Link
              to="/shop"
              className="rounded-full bg-[#6F4E37] px-8 py-4 font-semibold text-white transition hover:bg-[#533828]"
            >
              Shop Now
            </Link>

            <button className="rounded-full border border-[#C79B69] px-8 py-4 font-semibold text-[#6F4E37] transition hover:bg-[#FFF6EC]">
              Explore
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-[#F1E4D5] p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
              alt="Premium Electronics"
              className="h-[520px] w-full rounded-[24px] object-cover"
            />

            <div className="absolute bottom-8 left-8 rounded-2xl bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#A67C52]" />

                <div>
                  <p className="text-xs text-gray-500">Trusted Collection</p>

                  <h3 className="font-bold text-[#6F4E37]">
                    20+ Premium Products
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
