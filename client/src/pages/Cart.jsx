// client/src/pages/Cart.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center pb-32">
        <ShoppingBag
          size={48}
          className="mx-auto text-luxury-gray mb-6"
          strokeWidth={1}
        />
        <h2 className="text-3xl font-serif font-light">Your bag is empty</h2>
        <p className="text-luxury-gray mt-3 font-light">
          Discover pieces that speak to your style.
        </p>
        <Link to="/shop">
          <button className="mt-8 px-10 py-3 border border-luxury-black text-sm tracking-[0.2em] uppercase hover:bg-luxury-black hover:text-luxury-white transition duration-300">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto pb-32">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-luxury-cream pb-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-light">
          Shopping Bag
        </h1>
        <p className="text-sm text-luxury-gray uppercase tracking-wider font-sans font-light">
          {getCartCount()} items
        </p>
      </div>

      {/* Cart Grid: Items + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex gap-6 pb-6 border-b border-luxury-cream"
            >
              {/* Image */}
              <div className="w-24 h-32 md:w-32 md:h-40 bg-luxury-cream flex-shrink-0 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-serif text-lg font-medium">
                      {item.name}
                    </h3>
                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.size, item.color)
                      }
                      className="text-luxury-gray hover:text-luxury-black transition"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-luxury-gray uppercase tracking-wider font-sans font-light mt-0.5">
                    {item.category}
                  </p>
                  <p className="text-xs text-luxury-gray font-sans mt-1">
                    Color: {item.color} / Size: {item.size}
                  </p>
                  <p className="text-sm font-sans font-semibold mt-2">
                    ${item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-3 border border-luxury-cream w-fit">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.size,
                        item.color,
                        item.quantity - 1,
                      )
                    }
                    className="px-3 py-1.5 hover:bg-luxury-cream transition"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-sans w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.size,
                        item.color,
                        item.quantity + 1,
                      )
                    }
                    className="px-3 py-1.5 hover:bg-luxury-cream transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Clear Cart Button */}
          <button
            onClick={clearCart}
            className="text-xs text-luxury-gray uppercase tracking-[0.2em] font-sans hover:text-luxury-black transition underline underline-offset-4"
          >
            Clear Bag
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1 bg-luxury-cream p-8 h-fit">
          <h4 className="text-sm uppercase tracking-[0.2em] font-sans font-semibold border-b border-luxury-white pb-4">
            Order Summary
          </h4>

          <div className="space-y-3 mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-luxury-gray font-light">Subtotal</span>
              <span className="font-medium">${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-luxury-gray font-light">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-sm border-t border-luxury-white pt-4 mt-4">
              <span className="font-serif text-lg">Total</span>
              <span className="font-serif text-xl font-bold">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>
          </div>

          <button className="w-full mt-6 bg-luxury-black text-luxury-white py-3.5 text-sm tracking-[0.2em] uppercase font-sans hover:bg-luxury-charcoal transition duration-300">
            Proceed to Checkout
          </button>

          <p className="text-[10px] text-center text-luxury-gray mt-4 uppercase tracking-wider font-sans">
            Free express shipping on all orders
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
