import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const isWallHanging = product.subcategory === "Wall Hangings";
  const imageFrameClass = isWallHanging ? "aspect-[9/16]" : "aspect-square";
  const imageFitClass = isWallHanging
    ? "object-contain p-2 group-hover:scale-105"
    : "object-cover group-hover:scale-105";

  return (
    <div className="bg-white border border-[#e8ddd4] rounded-lg overflow-hidden group">
      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div
          className={`relative overflow-hidden bg-[#fbf4ee] ${imageFrameClass}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full transition-transform duration-500 ${imageFitClass} ${
              !product.inStock ? "grayscale" : ""
            }`}
          />
          {!product.inStock && (
            <span className="absolute top-2 left-2 bg-[#888] text-white text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm">
              Out of Stock
            </span>
          )}
          <span className="absolute top-2 right-2 bg-[#fffaf5] text-[#C8441A] text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm border border-[#e8ddd4]">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 sm:p-4">
        {product.sku && (
          <p className="text-[10px] text-[#aaa] tracking-widest uppercase mb-1">
            {product.sku}
          </p>
        )}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-[#2a1f1a] hover:text-[#C8441A] transition-colors duration-200 leading-snug mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-[#C8441A] mb-3">₹{product.price}</p>

        <button
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
          className={`w-full text-xs tracking-widest uppercase py-2 rounded-sm transition-colors duration-200 ${
            product.inStock
              ? "bg-[#C8441A] hover:bg-[#a83615] text-white cursor-pointer"
              : "bg-[#e8ddd4] text-[#aaa] cursor-not-allowed"
          }`}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
