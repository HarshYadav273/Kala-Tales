import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import PriceDropdown from "../components/PriceDropdown";
import {
  macrame,
  macrameWallHangings,
  macrameKeychains,
  macrameCoasters,
} from "../data/products";

const macrameCategories = [
  "All",
  "Natural",
  "Minimal",
  "Boho",
  "Classic",
  "Decorative",
  "Braided",
  "Assorted",
  "Multicolor",
];

const priceRanges = [
  { label: "All Prices", value: "all", min: 0, max: Infinity },
  { label: "Under Rs. 250", value: "under-250", min: 0, max: 249 },
  { label: "Rs. 250 - 499", value: "250-499", min: 250, max: 499 },
  { label: "Rs. 500 - 799", value: "500-799", min: 500, max: 799 },
  { label: "Rs. 800+", value: "800-plus", min: 800, max: Infinity },
];

const subcategoryDetails = {
  "Wall Hangings": {
    subtitle:
      "Handwoven pieces that bring warmth, texture, and quiet elegance to your space.",
    badge: "25+ Unique Designs Available",
  },
  Keychains: {
    subtitle:
      "Small handcrafted details that add style to your everyday essentials.",
    badge: "15+ Unique Designs Available",
  },
  Coasters: {
    subtitle:
      "Designed to protect your surfaces while adding warmth and texture to your table.",
    badge: "10+ Unique Designs Available",
  },
};

const subcategoryOrder = ["Wall Hangings", "Keychains", "Coasters"];

export default function Macrame() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePrice, setActivePrice] = useState("all");

  const filteredProducts = useMemo(() => {
    const selectedRange =
      priceRanges.find((range) => range.value === activePrice) ||
      priceRanges[0];

    return macrame.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.filterCategory === activeCategory;
      const matchesPrice =
        product.price >= selectedRange.min && product.price <= selectedRange.max;

      return matchesCategory && matchesPrice;
    });
  }, [activeCategory, activePrice]);

  const visibleSections = subcategoryOrder
    .map((title) => ({
      title,
      ...subcategoryDetails[title],
      products: filteredProducts.filter(
        (product) => product.subcategory === title,
      ),
    }))
    .filter((section) => section.products.length > 0);

  const totalProducts =
    macrameWallHangings.length +
    macrameKeychains.length +
    macrameCoasters.length;

  return (
    <div className="bg-[#fffaf5] min-h-screen">
      {/* Page Header */}
      <div className="border-b border-[#e8ddd4] bg-[#fff8f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-2">
            Kala Tales
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2a1f1a] tracking-wide mb-3">
            Macrame
          </h1>
          <p className="text-sm text-[#7a6a60] max-w-xl leading-relaxed">
            Handcrafted macrame decor and lifestyle accessories. Each piece is
            thoughtfully made using premium cotton cords, natural elements, and
            artisan detailing to elevate everyday spaces.
          </p>
          <p className="text-xs text-[#aaa] mt-3 tracking-widest uppercase">
            {filteredProducts.length} of {totalProducts} Products | 3 Categories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-10 border-y border-[#e8ddd4] py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {macrameCategories.map((category) => (
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

          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest uppercase text-[#7a6a60]">
              Price
            </span>
            <PriceDropdown
              ranges={priceRanges}
              value={activePrice}
              onChange={setActivePrice}
            />
          </div>
        </div>

        {visibleSections.length > 0 ? (
          <div className="flex flex-col gap-14 md:gap-20">
            {visibleSections.map((sub) => (
              <section key={sub.title}>
                {/* Section Header */}
                <div className="mb-6 pb-4 border-b border-[#e8ddd4]">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                    <div>
                      <h2 className="text-lg sm:text-xl font-light text-[#2a1f1a] tracking-wide">
                        {sub.title}
                      </h2>
                      <p className="text-xs text-[#7a6a60] mt-1 max-w-md">
                        {sub.subtitle}
                      </p>
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-[#C8441A] border border-[#C8441A] px-3 py-1 rounded-full self-start sm:self-auto whitespace-nowrap">
                      {sub.badge}
                    </span>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                  {sub.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-[#e8ddd4] rounded-lg bg-white">
            <p className="text-sm text-[#2a1f1a] mb-4">
              No macrame products found.
            </p>
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

      {/* Custom Order Banner */}
      <div className="bg-[#2a1f1a] mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-2">
            Customisation Available
          </p>
          <h3 className="text-xl sm:text-2xl font-light text-[#fffaf5] mb-2">
            Bulk Orders | Corporate Gifting | Boutique Collections
          </h3>
          <p className="text-sm text-[#7a6a60] mb-5">
            Have something specific in mind? We'd love to create it for you.
          </p>
          <a
            href="https://wa.me/919999944552?text=Hi%20Kala%20Tales!%20I%20am%20interested%20in%20a%20custom%20macrame%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
