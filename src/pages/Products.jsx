import ProductCard from "../components/ProductCard.jsx";
import { candles, macrameWallHangings, macrameKeychains, macrameCoasters } from "../data/products.js";

// Each section is its own isolated grid — new category always starts on a fresh row.
// Add more sections here in the future and the rule holds automatically.
const sections = [
  {
    key: "candles",
    superLabel: "Candles",
    title: "Candles",
    subtitle: "Hand-poured soy wax candles in artisanal metal and glass jars, crafted by women artisans.",
    products: candles,
  },
  {
    key: "wall-hangings",
    superLabel: "Macrame",
    title: "Wall Hangings",
    subtitle: "Handwoven pieces that bring warmth, texture, and quiet elegance to your space.",
    products: macrameWallHangings,
  },
  {
    key: "keychains",
    superLabel: "Macrame",
    title: "Keychains",
    subtitle: "Small handcrafted details that add style to your everyday essentials.",
    products: macrameKeychains,
  },
  {
    key: "coasters",
    superLabel: "Macrame",
    title: "Coasters",
    subtitle: "Protect your surfaces with handcrafted warmth and texture.",
    products: macrameCoasters,
  },
];

const totalProducts = sections.reduce((sum, s) => sum + s.products.length, 0);

function Products() {
  return (
    <div className="bg-[#fffaf5] min-h-screen">
      {/* Page Header */}
      <div className="border-b border-[#e8ddd4] bg-[#fff8f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-2">
            Kala Tales
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2a1f1a] tracking-wide mb-3">
            All Products
          </h1>
          <p className="text-sm text-[#7a6a60] max-w-xl leading-relaxed">
            Browse handcrafted candles and macrame pieces from Kala Tales.
          </p>
          <p className="text-xs text-[#aaa] mt-3 tracking-widest uppercase">
            {totalProducts} Products · {sections.length} Categories
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col gap-14 md:gap-20">
          {sections.map((section) => (
            <section key={section.key}>
              {/* Section Header */}
              <div className="mb-6 pb-4 border-b border-[#e8ddd4]">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-1">
                  {section.superLabel}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <h2 className="text-lg sm:text-xl font-light text-[#2a1f1a] tracking-wide">
                      {section.title}
                    </h2>
                    <p className="text-xs text-[#7a6a60] mt-1 max-w-md">
                      {section.subtitle}
                    </p>
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-[#aaa] self-start sm:self-auto">
                    {section.products.length} {section.products.length === 1 ? "product" : "products"}
                  </span>
                </div>
              </div>

              {/* Each section has its own grid — tall and square cards never mix rows */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {section.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
