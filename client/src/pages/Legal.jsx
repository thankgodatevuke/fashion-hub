// client/src/pages/Legal.jsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Legal = () => {
  const privacyRef = useRef(null);
  const returnsRef = useRef(null);
  const termsRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Update URL hash when scrolling manually (optional enhancement)
  useEffect(() => {
    const handleScroll = () => {
      // Simple passive listener for luxury feel - no heavy logic needed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- HERO HEADER --- */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-luxury-gold font-sans font-semibold bg-luxury-cream/80 px-4 py-1.5 inline-block rounded-full backdrop-blur-sm">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-light mt-4">
            Our <span className="font-bold">Policies</span>
          </h1>
          <p className="text-luxury-gray font-light mt-3 max-w-2xl mx-auto">
            Transparency is the foundation of trust. Below you'll find our
            commitments to your privacy, our return procedures, and the terms
            governing your use of ÉLYSÉE.
          </p>
        </div>

        {/* --- STICKY NAVIGATION (Desktop Sidebar) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Nav (Hidden on mobile, sticky on desktop) */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-32 bg-luxury-cream/40 p-6 border border-luxury-cream">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-luxury-gray mb-4">
                Jump to
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection(privacyRef)}
                    className="text-sm font-sans font-medium text-luxury-charcoal hover:text-luxury-gold transition border-l-2 border-transparent hover:border-luxury-gold pl-3 py-1 block"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(returnsRef)}
                    className="text-sm font-sans font-medium text-luxury-charcoal hover:text-luxury-gold transition border-l-2 border-transparent hover:border-luxury-gold pl-3 py-1 block"
                  >
                    Returns & Refunds
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(termsRef)}
                    className="text-sm font-sans font-medium text-luxury-charcoal hover:text-luxury-gold transition border-l-2 border-transparent hover:border-luxury-gold pl-3 py-1 block"
                  >
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* --- MAIN CONTENT (3/4 columns on desktop) --- */}
          <div className="lg:col-span-3 space-y-16">
            {/* ---- PRIVACY POLICY ---- */}
            <section ref={privacyRef} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-0.5 bg-luxury-gold" />
                <h2 className="text-2xl md:text-3xl font-serif font-light">
                  Privacy <span className="font-bold">Policy</span>
                </h2>
              </div>
              <div className="space-y-4 text-luxury-charcoal/80 font-light leading-relaxed text-sm md:text-base">
                <p>
                  <strong className="text-luxury-black font-medium">
                    Last updated:
                  </strong>{" "}
                  July 2026
                </p>
                <p>
                  At ÉLYSÉE, your privacy is paramount. This policy outlines how
                  we collect, use, and protect your personal data when you visit
                  our website or make a purchase.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Information we collect:
                  </strong>{" "}
                  We collect only what is necessary to fulfill your order and
                  enhance your shopping experience—name, email address, shipping
                  address, payment details, and browsing behavior (via cookies).
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    How we use it:
                  </strong>{" "}
                  To process transactions, communicate with you about your
                  order, and send you marketing communications (only with your
                  explicit consent). We never sell your data to third parties.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Your rights:
                  </strong>{" "}
                  Under GDPR and CCPA, you have the right to access, correct, or
                  delete your data at any time. Simply contact our concierge at{" "}
                  <span className="text-luxury-gold">concierge@elysee.com</span>
                  .
                </p>
                <p>
                  We use secure SSL encryption and adhere to PCI DSS standards
                  to protect your payment information. Cookies are used to
                  remember your preferences and optimize site performance.
                </p>
              </div>
            </section>

            {/* ---- RETURNS & REFUNDS ---- */}
            <section ref={returnsRef} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-0.5 bg-luxury-gold" />
                <h2 className="text-2xl md:text-3xl font-serif font-light">
                  Returns & <span className="font-bold">Refunds</span>
                </h2>
              </div>
              <div className="space-y-4 text-luxury-charcoal/80 font-light leading-relaxed text-sm md:text-base">
                <p>
                  <strong className="text-luxury-black font-medium">
                    Our commitment:
                  </strong>{" "}
                  We want you to love your ÉLYSÉE piece. If you are not entirely
                  satisfied, we offer a hassle-free return policy.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Return window:
                  </strong>{" "}
                  You have{" "}
                  <strong className="text-luxury-black">24 hours</strong> from
                  the date of delivery to initiate a return.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Conditions:
                  </strong>{" "}
                  Items must be returned in their original condition—unworn,
                  unwashed, with all original tags and packaging intact. We
                  reserve the right to refuse returns that show signs of wear or
                  damage.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Process:
                  </strong>{" "}
                  Contact our concierge team at{" "}
                  <span className="text-luxury-gold">concierge@elysee.com</span>{" "}
                  to request a return authorization. We will provide you with a
                  prepaid shipping label (deducted from your refund) or arrange
                  a courier pickup.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Refunds:
                  </strong>{" "}
                  Once we receive and inspect your return, we will process your
                  refund within 5–7 business days. Refunds are issued to the
                  original payment method. Original shipping costs are
                  non-refundable unless the item is defective.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Exceptions:
                  </strong>{" "}
                  For hygiene reasons, we cannot accept returns on underwear,
                  swimwear, or earrings. Bespoke or custom-made items are final
                  sale.
                </p>
              </div>
            </section>

            {/* ---- TERMS & CONDITIONS ---- */}
            <section ref={termsRef} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-0.5 bg-luxury-gold" />
                <h2 className="text-2xl md:text-3xl font-serif font-light">
                  Terms & <span className="font-bold">Conditions</span>
                </h2>
              </div>
              <div className="space-y-4 text-luxury-charcoal/80 font-light leading-relaxed text-sm md:text-base">
                <p>
                  <strong className="text-luxury-black font-medium">
                    Last updated:
                  </strong>{" "}
                  July 2026
                </p>
                <p>
                  By using the ÉLYSÉE website, you agree to be bound by these
                  terms. Please read them carefully before placing an order.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Account responsibility:
                  </strong>{" "}
                  You are responsible for maintaining the confidentiality of
                  your account and password. You agree to provide accurate and
                  complete information for all orders placed.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Intellectual property:
                  </strong>{" "}
                  All content on this site—including images, text, logos, and
                  designs—is the exclusive property of ÉLYSÉE. Unauthorized use
                  or reproduction is strictly prohibited.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Pricing & availability:
                  </strong>{" "}
                  All prices are listed in USD and are subject to change without
                  notice. While we strive for accuracy, we reserve the right to
                  correct errors in pricing or product descriptions. In the
                  event of a pricing error, we will contact you before
                  processing your order.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Governing law:
                  </strong>{" "}
                  These terms shall be governed by and construed in accordance
                  with the laws of France, without regard to conflict of law
                  principles. Any disputes shall be subject to the exclusive
                  jurisdiction of the courts of Paris.
                </p>
                <p>
                  <strong className="text-luxury-black font-medium">
                    Contact us:
                  </strong>{" "}
                  If you have any questions regarding these terms, please reach
                  out to our legal team at{" "}
                  <span className="text-luxury-gold">legal@elysee.com</span>.
                </p>
              </div>
            </section>

            {/* --- DIVIDER & BACK TO SHOP --- */}
            <div className="pt-8 border-t border-luxury-cream flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-luxury-gray font-light">
                © 2026 ÉLYSÉE. All rights reserved.
              </p>
              <Link to="/shop">
                <button className="px-8 py-3 border border-luxury-black text-xs tracking-[0.2em] uppercase hover:bg-luxury-black hover:text-luxury-white transition duration-300 font-sans font-medium">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
