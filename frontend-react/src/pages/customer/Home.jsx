import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";

import HeroSection from "../../components/customer/HeroSection";
import CategoryCard from "../../components/customer/CategoryCard";
import ProductCard from "../../components/customer/ProductCard";
import FeatureCard from "../../components/customer/FeatureCard";

import { getProducts } from "../../services/productApi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        console.log("✅ Products received:", data);

        setProducts(data);
      } catch (error) {
        console.error("❌ Backend Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-[#6F4E37]">
            Shop by Category
          </h2>

          <p className="mt-3 text-[#7A6553]">
            Curated collections for modern lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            title="Phones"
            description="Flagship smartphones."
            image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
          />

          <CategoryCard
            title="Laptops"
            description="Powerful laptops for creators."
            image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"
          />

          <CategoryCard
            title="Accessories"
            description="Headphones, keyboards and more."
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
          />

          <CategoryCard
            title="Wearables"
            description="Smart watches and fitness devices."
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
          />
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-black text-[#6F4E37]">Best Sellers</h2>

            <p className="mt-2 text-[#7A6553]">
              Live products from your Spring Boot backend.
            </p>
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-8 pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            title="Fast Delivery"
            description="Delivery across India within 24–48 hours."
            icon={Truck}
          />

          <FeatureCard
            title="Secure Payments"
            description="Protected checkout powered by microservices."
            icon={ShieldCheck}
          />

          <FeatureCard
            title="Premium Quality"
            description="Only verified premium electronic products."
            icon={Sparkles}
          />
        </div>
      </section>
    </div>
  );
}
