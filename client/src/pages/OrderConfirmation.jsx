// client/src/pages/OrderConfirmation.jsx
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import SEO from "../components/SEO";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state;

  // If someone lands here without order data, redirect to shop
  if (!order) {
    return (
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center pb-32">
        <h2 className="text-3xl font-serif font-light">No order found</h2>
        <p className="text-luxury-gray mt-3 font-light">
          Please place an order first.
        </p>
        <Link to="/shop">
          <button className="mt-8 px-10 py-3 border border-luxury-black text-sm tracking-[0.2em] uppercase hover:bg-luxury-black hover:text-luxury-white transition duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  const { orderNumber, items, subtotal, shipping, tax, total, customerName } =
    order;

  return (
    <>
      <SEO
        title="Order Confirmed — Thank You"
        description="Your order at ÉLYSÉE has been confirmed. Thank you for shopping with us."
        url="https://tgdev.com/order-confirmation"
      />
      <div className="pt-32 px-6 max-w-4xl mx-auto pb-20">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <CheckCircle
            size={64}
            className="mx-auto text-luxury-gold"
            strokeWidth={1.5}
          />
          <h1 className="text-3xl md:text-4xl font-serif font-light mt-4">
            Order <span className="font-bold">Confirmed</span>
          </h1>
          <p className="text-luxury-gray font-light mt-2">
            Thank you, {customerName || "Valued Customer"}! Your order has been
            placed successfully.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-luxury-cream p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-luxury-white pb-4 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                Order Number
              </p>
              <p className="font-serif text-lg font-bold">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                Date
              </p>
              <p className="font-sans font-light text-sm">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4 mb-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-4 text-sm items-center"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover bg-luxury-white flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1">
                  <p className="font-medium text-luxury-black">{item.name}</p>
                  <p className="text-xs text-luxury-gray">
                    {item.size} / {item.color} · Qty {item.quantity}
                  </p>
                </div>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Order Totals */}
          <div className="border-t border-luxury-white pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-luxury-gray">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-luxury-gray">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-luxury-gray">Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold border-t border-luxury-white pt-3 mt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop">
            <button className="w-full sm:w-auto px-10 py-3 border border-luxury-black text-sm tracking-[0.2em] uppercase hover:bg-luxury-black hover:text-luxury-white transition duration-300 font-sans font-medium">
              Continue Shopping
            </button>
          </Link>
          <Link to="/">
            <button className="w-full sm:w-auto px-10 py-3 border border-luxury-cream text-sm tracking-[0.2em] uppercase hover:border-luxury-black transition duration-300 font-sans font-medium">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
