// client/src/pages/Checkout.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import SEO from "../components/SEO";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Form State ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    paymentMethod: "card",
  });

  const [errors, setErrors] = useState({});

  // --- If cart is empty, redirect to shop ---
  if (cartItems.length === 0) {
    return (
      <>
        <SEO
          title="Checkout"
          description="Complete your order at ÉLYSÉE."
          url="https://tgdev.com/checkout"
        />
        <div className="pt-40 px-6 max-w-4xl mx-auto text-center pb-32">
          <h2 className="text-3xl font-serif font-light">Your cart is empty</h2>
          <p className="text-luxury-gray mt-3 font-light">
            Add some pieces to your bag before checking out.
          </p>
          <Link to="/shop">
            <button className="mt-8 px-10 py-3 border border-luxury-black text-sm tracking-[0.2em] uppercase hover:bg-luxury-black hover:text-luxury-white transition duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </>
    );
  }

  // --- Calculate totals ---
  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // --- Handle form input changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // --- Validate form ---
  const validateForm = () => {
    const newErrors = {};
    const required = ["fullName", "email", "address", "city", "state", "zip"];
    required.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    // Zip validation (simple 5-digit)
    if (formData.zip && !/^\d{5}$/.test(formData.zip)) {
      newErrors.zip = "Please enter a valid 5-digit ZIP code";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handle form submission ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors before continuing.");
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing (2 second delay)
    setTimeout(async () => {
      // Generate a random order number
      const orderNumber = `ELY-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

      // Prepare order data
      const orderData = {
        orderNumber,
        customerName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        paymentMethod: formData.paymentMethod,
        items: cartItems,
        subtotal,
        shipping,
        tax,
        total,
      };

      try {
        // Save order to database
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          orderData,
        );

        // Clear the cart
        clearCart();

        // Navigate to confirmation page
        navigate("/order-confirmation", {
          state: {
            orderNumber,
            items: cartItems,
            subtotal,
            shipping,
            tax,
            total,
            customerName: formData.fullName,
          },
        });

        showToast("Order placed successfully!");
      } catch (error) {
        console.error("Order save failed:", error);
        showToast("Failed to save order. Please try again.");
      }

      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <>
      <SEO
        title="Checkout"
        description="Complete your order at ÉLYSÉE. Secure checkout for luxury fashion."
        url="https://tgdev.com/checkout"
      />
      <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto pb-20">
        <h1 className="text-3xl md:text-4xl font-serif font-light border-b border-luxury-cream pb-6 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* --- LEFT: Checkout Form (Takes 2/3) --- */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full bg-luxury-cream/40 border ${
                      errors.fullName ? "border-red-500" : "border-luxury-cream"
                    } rounded-sm py-3 px-4 text-luxury-black placeholder:text-luxury-gray/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300`}
                    placeholder="James Harper"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-luxury-cream/40 border ${
                      errors.email ? "border-red-500" : "border-luxury-cream"
                    } rounded-sm py-3 px-4 text-luxury-black placeholder:text-luxury-gray/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300`}
                    placeholder="james@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full bg-luxury-cream/40 border ${
                    errors.address ? "border-red-500" : "border-luxury-cream"
                  } rounded-sm py-3 px-4 text-luxury-black placeholder:text-luxury-gray/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300`}
                  placeholder="123 Avenue des Champs-Élysées"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* City */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full bg-luxury-cream/40 border ${
                      errors.city ? "border-red-500" : "border-luxury-cream"
                    } rounded-sm py-3 px-4 text-luxury-black placeholder:text-luxury-gray/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300`}
                    placeholder="Paris"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full bg-luxury-cream/40 border ${
                      errors.state ? "border-red-500" : "border-luxury-cream"
                    } rounded-sm py-3 px-4 text-luxury-black placeholder:text-luxury-gray/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300`}
                    placeholder="Île-de-France"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>

                {/* ZIP */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                    ZIP / Postal Code *
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className={`w-full bg-luxury-cream/40 border ${
                      errors.zip ? "border-red-500" : "border-luxury-cream"
                    } rounded-sm py-3 px-4 text-luxury-black placeholder:text-luxury-gray/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300`}
                    placeholder="75008"
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-luxury-cream/40 border border-luxury-cream rounded-sm py-3 px-4 text-luxury-black focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Italy">Italy</option>
                  <option value="Australia">Australia</option>
                  <option value="Japan">Japan</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                  Payment Method *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label
                    className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition ${
                      formData.paymentMethod === "card"
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-luxury-cream hover:border-luxury-gray"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="text-luxury-gold focus:ring-luxury-gold"
                    />
                    <span className="text-sm font-sans">Credit Card</span>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition ${
                      formData.paymentMethod === "paypal"
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-luxury-cream hover:border-luxury-gray"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleChange}
                      className="text-luxury-gold focus:ring-luxury-gold"
                    />
                    <span className="text-sm font-sans">PayPal</span>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition ${
                      formData.paymentMethod === "applepay"
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-luxury-cream hover:border-luxury-gray"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="applepay"
                      checked={formData.paymentMethod === "applepay"}
                      onChange={handleChange}
                      className="text-luxury-gold focus:ring-luxury-gold"
                    />
                    <span className="text-sm font-sans">Apple Pay</span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-luxury-black text-luxury-white text-sm tracking-[0.2em] uppercase font-sans font-medium hover:bg-luxury-charcoal transition duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order — $${total.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* --- RIGHT: Order Summary (Takes 1/3) --- */}
          <div className="lg:col-span-1">
            <div className="bg-luxury-cream p-6 md:p-8 sticky top-32">
              <h4 className="text-sm uppercase tracking-[0.2em] font-sans font-semibold border-b border-luxury-white pb-4">
                Order Summary
              </h4>

              <div className="space-y-4 mt-4 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-3 text-sm"
                  >
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-14 h-14 object-cover bg-luxury-white flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-luxury-black truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-luxury-gray">
                        {item.size} / {item.color} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-luxury-white mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-luxury-gray">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-gray">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
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

              <p className="text-[10px] text-center text-luxury-gray mt-4 uppercase tracking-wider font-sans">
                Free express shipping on orders over $200
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
