import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <section className="bg-[#fffaf5] min-h-screen">
      <div className="border-b border-[#e8ddd4] bg-[#fff8f2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-light text-[#2a1f1a] tracking-wide">
            Your Cart
          </h1>
          <p className="text-xs text-[#aaa] mt-2 tracking-widest uppercase">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-[#2a1f1a] font-medium mb-4">
              Your cart is empty
            </p>
            <Link
              to="/products"
              className="text-xs tracking-widest uppercase text-[#C8441A] border-b border-[#C8441A] pb-1"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="bg-white border border-[#e8ddd4] rounded-lg">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 sm:gap-4 p-4 border-b border-[#e8ddd4] last:border-b-0"
                >
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md border border-[#e8ddd4]"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      <div className="min-w-0">
                        {item.sku && (
                          <p className="text-[10px] text-[#aaa] tracking-widest uppercase">
                            {item.sku}
                          </p>
                        )}
                        <Link
                          to={`/product/${item.id}`}
                          className="text-sm font-medium text-[#2a1f1a] hover:text-[#C8441A]"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-[#C8441A] mt-1">
                          Rs. {item.price * item.quantity}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="self-start text-xs tracking-widest uppercase text-[#aaa] hover:text-[#C8441A]"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-7 h-7 rounded-sm border border-[#e8ddd4] text-[#3a3028] hover:border-[#C8441A] hover:text-[#C8441A]"
                      >
                        -
                      </button>
                      <span className="text-sm w-6 text-center text-[#2a1f1a]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-7 h-7 rounded-sm border border-[#e8ddd4] text-[#3a3028] hover:border-[#C8441A] hover:text-[#C8441A]"
                      >
                        +
                      </button>
                      <span className="text-[11px] text-[#aaa] ml-1">
                        Rs. {item.price} each
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-white border border-[#e8ddd4] rounded-lg p-5 h-fit">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-widest uppercase text-[#7a6a60]">
                  Subtotal
                </span>
                <span className="text-lg font-medium text-[#2a1f1a]">
                  Rs. {totalPrice}
                </span>
              </div>
              <button
                onClick={clearCart}
                className="w-full text-[10px] tracking-widest uppercase text-[#aaa] hover:text-[#C8441A] py-2"
              >
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
