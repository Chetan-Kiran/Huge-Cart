import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#E8DED3] bg-[#4A3326] text-[#FFFDFB]">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-10 px-10 py-14">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A67C52]">
              <span className="font-bold text-[#FFFDFB]">HC</span>
            </div>

            <h2 className="text-xl font-bold">HugeCart</h2>
          </div>

          <p className="text-sm leading-6 text-[#EADBC8]">
            Premium electronics shopping experience powered by Spring Boot
            Microservices.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[#D4A373]">Shop</h3>

          <ul className="space-y-3 text-sm text-[#EADBC8]">
            <li>Phones</li>
            <li>Laptops</li>
            <li>Accessories</li>
            <li>Wearables</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[#D4A373]">Company</h3>

          <ul className="space-y-3 text-sm text-[#EADBC8]">
            <li>About Us</li>
            <li>Contact</li>
            <li>Support</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[#D4A373]">Connect</h3>

          <div className="flex gap-4 text-[#EADBC8]">
            <Mail size={20} />
          </div>

          <p className="mt-6 text-sm text-[#CDB9A5]">hello@hugecart.com</p>
        </div>
      </div>

      <div className="border-t border-[#6F4E37] py-5 text-center text-sm text-[#CDB9A5]">
        © 2026 HugeCart. Built with Spring Boot Microservices & React.
      </div>
    </footer>
  );
}
