import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { candles } from "../data/products";

const candleCategories = [
  "All",
  "Classic",
  "Hammered",
  "Decorative",
  "Filigree",
  "Signature",
  "Premium",
];

const priceRanges = [
  { label: "All Prices", value: "all", min: 0, max: Infinity },
  { label: "Under Rs. 1,500", value: "under-1500", min: 0, max: 1499 },
  { label: "Rs. 1,500 - 1,999", value: "1500-1999", min: 1500, max: 1999 },
  { label: "Rs. 2,000 - 2,499", value: "2000-2499", min: 2000, max: 2499 },
  { label: "Rs. 2,500+", value: "2500-plus", min: 2500, max: Infinity },
];

export default function Candles() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePrice, setActivePrice] = useState("all");

  const filteredCandles = useMemo(() => {
    const selectedRange =
      priceRanges.find((range) => range.value === activePrice) ||
      priceRanges[0];

    return candles.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.filterCategory === activeCategory;
      const matchesPrice =
        product.price >= selectedRange.min && product.price <= selectedRange.max;

      return matchesCategory && matchesPrice;
    });
  }, [activeCategory, activePrice]);

  return (
    <div className="bg-[#fffaf5] min-h-screen">
      {/* Page Header */}
      <div className="border-b border-[#e8ddd4] bg-[#fff8f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-2">
            Kala Tales
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2a1f1a] tracking-wide mb-3">
            Candles
          </h1>
          <p className="text-sm text-[#7a6a60] max-w-xl leading-relaxed">
            Hand-poured soy wax candles crafted by women artisans. Each piece is
            thoughtfully designed using premium materials and curated fragrances
            to elevate your everyday space.
          </p>
          <p className="text-xs text-[#aaa] mt-3 tracking-widest uppercase">
            {filteredCandles.length} of {candles.length} Products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 border-y border-[#e8ddd4] py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {candleCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-[10px] tracking-widest uppercase px-3 py-2 rounded-sm border transition-colors duration-200 ${
                  activeCategory === category
                    ? "bg-[#C8441A] border-[#C8441A] text-white"
                    : "border-[#e8ddd4] text-[#3a3028] hover:border-[#C8441A] hover:text-[#C8441A]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor="candle-price-filter"
              className="text-[10px] tracking-widest uppercase text-[#7a6a60]"
            >
              Price
            </label>
            <select
              id="candle-price-filter"
              value={activePrice}
              onChange={(event) => setActivePrice(event.target.value)}
              className="w-full sm:w-auto bg-[#fffaf5] border border-[#e8ddd4] rounded-sm px-3 py-2 text-xs text-[#2a1f1a] outline-none focus:border-[#C8441A]"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredCandles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {filteredCandles.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-[#e8ddd4] rounded-lg bg-white">
            <p className="text-sm text-[#2a1f1a] mb-4">No candles found.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setActivePrice("all");
              }}
              className="text-xs tracking-widest uppercase text-[#C8441A] border-b border-[#C8441A] pb-1"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
