import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPanel() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartFullscreen,
    setCartFullscreen,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  // Build WhatsApp message
  function handleWhatsAppCheckout() {
    const phone = "919999944552";
    const items = cart
      .map(
        (item) =>
          `• ${item.name} (x${item.quantity}) — ₹${item.price * item.quantity}`,
      )
      .join("\n");
    const message = `Hello Kala Tales! 🙏\n\nI'd like to place an order:\n\n${items}\n\n*Total: ₹${totalPrice}*\n\nPlease confirm availability.`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  }

  if (!cartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#fffaf5] z-50 flex flex-col shadow-2xl transition-all duration-300 ${
          cartFullscreen ? "w-full" : "w-full sm:w-[420px]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8ddd4]">
          {/* Close button — left */}
          <button
            onClick={() => {
              setCartOpen(false);
              setCartFullscreen(false);
            }}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-[#f0e8e0] transition-colors duration-200 text-[#3a3028]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

          {/* Title */}
          <div className="text-center">
            <h2 className="text-xs tracking-[0.25em] uppercase text-[#2a1f1a] font-medium">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <p className="text-[10px] text-[#aaa] tracking-widest mt-0.5">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            )}
          </div>

          {/* Fullscreen toggle — right */}
          <button
            onClick={() => setCartFullscreen(!cartFullscreen)}
            aria-label="Toggle fullscreen"
            className="p-2 rounded-full hover:bg-[#f0e8e0] transition-colors duration-200 text-[#3a3028]"
          >
            {cartFullscreen ? (
              // Compress icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M15 9h4.5M15 9V4.5M15 9l5.25-5.25M9 15H4.5M9 15v4.5M9 15l-5.25 5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                />
              </svg>
            ) : (
              // Expand icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#e8ddd4]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .955-.343 1.087-.835l1.384-5.195A1.125 1.125 0 0020.25 9H7.5m-4.5-4.5L7.5 14.25"
                />
              </svg>
              <div>
                <p className="text-sm text-[#2a1f1a] font-medium mb-1">
                  Your cart is empty
                </p>
                <p className="text-xs text-[#aaa]">
                  Add some handcrafted pieces to get started
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-2 text-xs tracking-widest uppercase text-[#C8441A] border-b border-[#C8441A] pb-0.5"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 pb-4 border-b border-[#e8ddd4] last:border-0"
                >
                  {/* Product image */}
                  <Link
                    to={`/product/${item.id}`}
                    onClick={() => setCartOpen(false)}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-[#e8ddd4]"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {item.sku && (
                          <p className="text-[10px] text-[#aaa] tracking-widest uppercase">
                            {item.sku}
                          </p>
                        )}
                        <p className="text-sm font-medium text-[#2a1f1a] leading-snug">
                          {item.name}
                        </p>
                        <p className="text-sm text-[#C8441A] mt-0.5">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-[#ccc] hover:text-[#C8441A] transition-colors duration-200 flex-shrink-0 mt-0.5"
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
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-6 h-6 rounded-sm border border-[#e8ddd4] flex items-center justify-center text-[#3a3028] hover:border-[#C8441A] hover:text-[#C8441A] transition-colors duration-200 text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm w-5 text-center text-[#2a1f1a]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-6 h-6 rounded-sm border border-[#e8ddd4] flex items-center justify-center text-[#3a3028] hover:border-[#C8441A] hover:text-[#C8441A] transition-colors duration-200 text-sm"
                      >
                        +
                      </button>
                      <span className="text-[11px] text-[#aaa] ml-1">
                        ₹{item.price} each
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — total + checkout */}
        {cart.length > 0 && (
          <div className="border-t border-[#e8ddd4] px-5 py-5 bg-[#fff8f2]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs tracking-widest uppercase text-[#7a6a60]">
                Subtotal
              </span>
              <span className="text-base font-medium text-[#2a1f1a]">
                ₹{totalPrice}
              </span>
            </div>
            <p className="text-[10px] text-[#aaa] mb-4">
              Shipping & taxes calculated at checkout via WhatsApp
            </p>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs tracking-widest uppercase py-3 rounded-sm transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-2 text-[10px] tracking-widest uppercase text-[#aaa] hover:text-[#C8441A] transition-colors duration-200 py-1"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
