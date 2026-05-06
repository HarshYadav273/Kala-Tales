import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { allProducts } from "../data/products";
import logo from "../Assests/Images/Logo.png";

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .replaceAll("candel", "candle")
    .replaceAll("candels", "candles")
    .trim();
}

const searchSuggestions = [
  { label: "Candles", type: "Collection", to: "/candles", terms: "candle candles candel candels" },
  { label: "Macrame", type: "Collection", to: "/macrame", terms: "macrame macrame decor" },
  { label: "All Products", type: "Collection", to: "/products", terms: "all products shop catalog" },
  { label: "Classic", type: "Category", to: "/candles", terms: "classic candle" },
  { label: "Hammered", type: "Category", to: "/candles", terms: "hammered candle" },
  { label: "Decorative", type: "Category", to: "/candles", terms: "decorative candle" },
  { label: "Filigree", type: "Category", to: "/candles", terms: "filigree candle" },
  { label: "Signature", type: "Category", to: "/candles", terms: "signature candle" },
  { label: "Premium", type: "Category", to: "/candles", terms: "premium candle" },
  { label: "Natural", type: "Category", to: "/macrame", terms: "natural macrame wall hanging" },
  { label: "Minimal", type: "Category", to: "/macrame", terms: "minimal macrame keychain" },
  { label: "Boho", type: "Category", to: "/macrame", terms: "boho macrame" },
  { label: "Braided", type: "Category", to: "/macrame", terms: "braided macrame keychain" },
  { label: "Assorted", type: "Category", to: "/macrame", terms: "assorted macrame" },
  { label: "Multicolor", type: "Category", to: "/macrame", terms: "multicolor macrame coaster" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const { totalItems, setCartOpen } = useCart();

  const navLinksLeft = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/candles", label: "Candles" },
    { to: "/macrame", label: "Macrame" },
  ];
  const navLinksRight = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];
  const navLinks = [...navLinksLeft, ...navLinksRight];

  const linkClass = ({ isActive }) =>
    `text-xs 2xl:text-sm tracking-widest uppercase transition-colors duration-200 ${
      isActive ? "text-[#C8441A]" : "text-[#3a3028] hover:text-[#C8441A]"
    }`;

  const normalizedQuery = normalizeSearchText(searchQuery);
  const queryRegex = new RegExp(`\\b${normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
  
  const searchSuggestionResults =
    normalizedQuery.length > 0
      ? searchSuggestions
          .filter((suggestion) =>
            queryRegex.test(normalizeSearchText(`${suggestion.label} ${suggestion.terms}`))
          )
          .slice(0, 6)
      : [];
  const searchProductResults =
    normalizedQuery.length > 0
      ? allProducts
          .filter((product) => {
            const productText = normalizeSearchText(
              [
                product.name,
                product.sku,
                product.category,
                product.subcategory,
                product.filterCategory,
              ]
                .filter(Boolean)
                .join(" "),
            );

            return queryRegex.test(productText);
          })
          .slice(0, 8)
      : [];
  const hasSearchResults =
    searchSuggestionResults.length > 0 || searchProductResults.length > 0;

  function handleSearchOpen() {
    setSearchOpen(true);
    setMenuOpen(false);
    setTimeout(() => searchRef.current?.focus(), 50);
  }

  function handleSearchClose() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  return (
    <header className="w-full bg-[#fffaf5] border-b border-[#e8ddd4] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-[80px] xl:h-[96px] 2xl:h-[110px]">

          {/* Left nav */}
          <div className="flex items-center flex-1">
            <button
              aria-label="Toggle menu"
              className="xl:hidden p-2 rounded-full hover:bg-[#f0e8e0] transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#3a3028]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  />
                )}
              </svg>
            </button>
            <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
              {navLinksLeft.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Center — Logo (absolutely centered) */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex-shrink-0"
          >
            <img
              src={logo}
              alt="Kala Tales"
              className="h-16 sm:h-20 xl:h-24 2xl:h-28 w-auto object-contain"
            />
          </Link>

          {/* Right — right nav links + icons */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 mr-2">
              {navLinksRight.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
            {/* Search */}
            <div className="relative">
              <button
                aria-label="Search"
                onClick={searchOpen ? handleSearchClose : handleSearchOpen}
                className="p-2 rounded-full hover:bg-[#f0e8e0] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#3a3028]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </button>

              {/* Expanding search bar */}
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border border-[#e8ddd4] rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#e8ddd4]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[#aaa] flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                      />
                    </svg>
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search candles, macrame..."
                      className="flex-1 text-sm text-[#2a1f1a] placeholder-[#ccc] outline-none bg-transparent"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-[#ccc] hover:text-[#C8441A]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Results */}
                  {searchQuery.trim().length > 0 && (
                    <div className="max-h-80 overflow-y-auto overscroll-contain">
                      {hasSearchResults ? (
                        <>
                          {searchSuggestionResults.length > 0 && (
                            <div>
                              <p className="px-3 pt-3 pb-1 text-[10px] tracking-widest uppercase text-[#aaa]">
                                Suggestions
                              </p>
                              {searchSuggestionResults.map((suggestion) => (
                                <Link
                                  key={`${suggestion.type}-${suggestion.label}`}
                                  to={suggestion.to}
                                  onClick={handleSearchClose}
                                  className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-[#fffaf5] transition-colors duration-200 border-b border-[#f0ebe4]"
                                >
                                  <div className="min-w-0">
                                    <p className="text-xs font-medium text-[#2a1f1a] truncate">
                                      {suggestion.label}
                                    </p>
                                    <p className="text-[10px] text-[#C8441A]">
                                      {suggestion.type}
                                    </p>
                                  </div>
                                  <span className="text-[#aaa] text-sm">
                                    &rarr;
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}

                          {searchProductResults.length > 0 && (
                            <div>
                              <p className="px-3 pt-3 pb-1 text-[10px] tracking-widest uppercase text-[#aaa]">
                                Products
                              </p>
                              {searchProductResults.map((product) => (
                                <Link
                                  key={product.id}
                                  to={`/product/${product.id}`}
                                  onClick={handleSearchClose}
                                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#fffaf5] transition-colors duration-200 border-b border-[#f0ebe4] last:border-0"
                                >
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-9 h-9 object-cover rounded-md border border-[#e8ddd4] flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="text-xs font-medium text-[#2a1f1a] truncate">
                                      {product.name}
                                    </p>
                                    <p className="text-[10px] text-[#C8441A]">
                                      Rs. {product.price} | {product.category}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-[#aaa] text-center py-4">
                          No results found
                        </p>
                      )}
                    </div>
                  )}

                  {searchQuery.trim().length === 0 && (
                    <p className="text-[10px] text-[#aaa] text-center py-3 tracking-wide">
                      Search collections, categories, products, or SKU
                    </p>
                  )}
                </div>
              )}
            </div>
            {/* Cart — opens panel instead of navigating */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="relative p-2 rounded-full hover:bg-[#f0e8e0] transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#3a3028]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .955-.343 1.087-.835l1.384-5.195A1.125 1.125 0 0020.25 9H7.5m-4.5-4.5L7.5 14.25"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C8441A] text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden bg-[#fffaf5] border-t border-[#e8ddd4] px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
