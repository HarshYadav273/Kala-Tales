import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { allProducts } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = allProducts.find((item) => String(item.id) === String(id));
  const isWallHanging = product?.subcategory === "Wall Hangings";

  // Image zoom/pan state
  const [zoomed, setZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const imageBoxRef = useRef(null);

  // Copy link state
  const [copied, setCopied] = useState(false);

  function handleMouseMove(e) {
    const box = imageBoxRef.current;
    if (!box) return;
    const { left, top, width, height } = box.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleBuyNow() {
    addToCart(product);
    navigate("/cart");
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Check out ${product?.name} on Kala Tales!`);

  if (!product) {
    return (
      <section className="bg-[#fffaf5] min-h-[60vh] px-4 py-16 text-center">
        <h1 className="text-2xl font-light text-[#2a1f1a] mb-4">
          Product not found
        </h1>
        <Link
          to="/products"
          className="text-xs tracking-widest uppercase text-[#C8441A] border-b border-[#C8441A] pb-1"
        >
          Back to products
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-[#fffaf5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* ── Image with Zoom/Pan ── */}
          <div
            ref={imageBoxRef}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
            onMouseMove={handleMouseMove}
            className={`relative overflow-hidden rounded-lg border border-[#e8ddd4] cursor-crosshair select-none ${
              isWallHanging ? "bg-[#fbf4ee]" : "bg-white"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              draggable={false}
              style={{
                transformOrigin: transformOrigin,
                transform: zoomed ? "scale(2)" : "scale(1)",
                transition: zoomed ? "transform 0.1s ease" : "transform 0.3s ease",
              }}
              className={`w-full pointer-events-none ${
                isWallHanging
                  ? "max-h-[75vh] object-contain p-4"
                  : "aspect-square object-cover"
              }`}
            />
          </div>

          {/* ── Product Info ── */}
          <div className="md:pt-4">
            {product.sku && (
              <p className="text-[10px] text-[#aaa] tracking-widest uppercase mb-2">
                {product.sku}
              </p>
            )}
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-3">
              {product.category}
            </p>
            <h1 className="text-2xl sm:text-4xl font-light text-[#2a1f1a] tracking-wide mb-4">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-[#C8441A] mb-5">
              Rs. {product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-[#7a6a60] leading-relaxed mb-6">
              {product.description}
            </p>
            <p className="text-xs tracking-widest uppercase text-[#7a6a60] mb-6">
              {product.inStock ? "✓  In stock" : "Out of stock"}
            </p>

            {/* ── Action Buttons ── */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {/* Add to Cart */}
              <button
                disabled={!product.inStock}
                onClick={() => addToCart(product)}
                className={`flex-1 text-xs tracking-widest uppercase px-8 py-3.5 rounded-sm border transition-colors duration-200 ${
                  product.inStock
                    ? "border-[#C8441A] text-[#C8441A] hover:bg-[#C8441A] hover:text-white cursor-pointer"
                    : "border-[#e8ddd4] text-[#aaa] cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* Buy it Now */}
              <button
                disabled={!product.inStock}
                onClick={handleBuyNow}
                className={`flex-1 text-xs tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-200 ${
                  product.inStock
                    ? "bg-[#C8441A] hover:bg-[#a83615] text-white cursor-pointer"
                    : "bg-[#e8ddd4] text-[#aaa] cursor-not-allowed"
                }`}
              >
                Buy it Now
              </button>
            </div>

            {/* ── Share ── */}
            <div className="border-t border-[#e8ddd4] pt-6">
              <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-3">
                Share this product
              </p>
              <div className="flex items-center gap-2">

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on WhatsApp"
                  className="group flex items-center justify-center w-9 h-9 rounded-full border border-[#e8ddd4] hover:border-[#25D366] hover:bg-[#25D366] transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-[#7a6a60] group-hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on Facebook"
                  className="group flex items-center justify-center w-9 h-9 rounded-full border border-[#e8ddd4] hover:border-[#1877F2] hover:bg-[#1877F2] transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-[#7a6a60] group-hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on X"
                  className="group flex items-center justify-center w-9 h-9 rounded-full border border-[#e8ddd4] hover:border-[#000] hover:bg-[#000] transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-[#7a6a60] group-hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on Instagram"
                  className="group flex items-center justify-center w-9 h-9 rounded-full border border-[#e8ddd4] hover:border-[#E1306C] hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-[#7a6a60] group-hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  title="Copy link"
                  className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-[#e8ddd4] hover:border-[#C8441A] hover:bg-[#C8441A] transition-colors duration-200"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-[#C8441A] group-hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-[#7a6a60] group-hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  )}
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-[#2a1f1a] text-white px-2 py-1 rounded whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
