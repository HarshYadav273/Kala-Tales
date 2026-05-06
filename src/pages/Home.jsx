import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { candles, macrame } from "../data/products";

function SectionHeader({ title, linkTo }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-[#e8ddd4]">
      <h2 className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#2a1f1a] font-medium">
        {title}
      </h2>
      <Link
        to={linkTo}
        className="text-xs tracking-widest uppercase text-[#C8441A] hover:text-[#a83615] border-b border-[#C8441A] pb-0.5 transition-colors duration-200"
      >
        Show All →
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#fffaf5]">
      <Hero />

      {/* Candles Section — show first 4 only */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader title="Candles" linkTo="/candles" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {candles.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[#e8ddd4]" />
      </div>

      {/* Macrame Section — show first 4 only */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader title="Macrame" linkTo="/macrame" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {macrame.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
