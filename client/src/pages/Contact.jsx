// client/src/pages/Contact.jsx
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      showToast("Message sent successfully! We'll respond within 24 hours.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-luxury-white">
      {/* --- Hero Header --- */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-sm tracking-[0.3em] uppercase text-luxury-gold font-sans font-light">
          Get in Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-light mt-2">
          We're here to <span className="font-bold">help.</span>
        </h1>
        {/* CHANGED: Darker text for readability */}
        <p className="text-luxury-charcoal font-light mt-4 max-w-xl mx-auto">
          For styling advice, order inquiries, or just to say hello — reach out
          to our concierge team.
        </p>
      </div>

      {/* --- CONTACT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
        {/* --- LEFT: Store Details --- */}
        <div className="lg:col-span-2 order-1 lg:order-1 bg-white shadow-xl p-8 md:p-10 h-fit">
          <h4 className="text-xs tracking-[0.3em] uppercase font-sans font-semibold text-luxury-black border-b border-luxury-white/50 pb-4">
            Concierge
          </h4>

          <div className="space-y-6 mt-6">
            <div className="flex items-start gap-4">
              <MapPin
                size={18}
                className="text-luxury-gold flex-shrink-0 mt-1"
              />
              <div>
                {/* CHANGED: Labels are darker charcoal */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-charcoal font-sans font-medium">
                  Visit Us
                </p>
                {/* CHANGED: Values are bold black */}
                <p className="text-sm font-medium text-luxury-black mt-1 leading-relaxed">
                  123 Avenue des Champs-Élysées,
                  <br />
                  75008 Paris, France
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={18} className="text-luxury-gold flex-shrink-0 mt-1" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-charcoal font-sans font-medium">
                  Email
                </p>
                <p className="text-sm font-medium text-luxury-black mt-1">
                  concierge@elysee.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone
                size={18}
                className="text-luxury-gold flex-shrink-0 mt-1"
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-charcoal font-sans font-medium">
                  Phone
                </p>
                <p className="text-sm font-medium text-luxury-black mt-1">
                  +33 1 23 45 67 89
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock
                size={18}
                className="text-luxury-gold flex-shrink-0 mt-1"
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-charcoal font-sans font-medium">
                  Hours
                </p>
                <p className="text-sm font-medium text-luxury-black mt-1 leading-relaxed">
                  Mon – Sat: 10:00 AM – 8:00 PM
                  <br />
                  Sunday: 12:00 PM – 6:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-luxury-white/50 my-6" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-charcoal font-sans font-medium text-center">
            Respond within 24 hours
          </p>
        </div>

        {/* --- RIGHT: Contact Form --- */}
        <div className="lg:col-span-3 order-2 lg:order-2 bg-white">
          {/* Form Header */}
          <div className="mb-10">
            <span className="w-12 h-0.5 bg-luxury-gold block mb-4" />
            <h3 className="text-2xl md:text-3xl font-serif font-light tracking-wide text-luxury-black">
              Send a <span className="font-bold">Message</span>
            </h3>
            {/* CHANGED: Darker subtitle */}
            <p className="text-sm text-luxury-charcoal font-light mt-2">
              Fill in the details below and our team will respond shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              {/* CHANGED: Darker label */}
              <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-luxury-cream py-3 text-luxury-black placeholder-luxury-gray/60 focus:outline-none focus:border-luxury-gold transition duration-300"
                placeholder="e.g., James Harper"
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-luxury-cream py-3 text-luxury-black placeholder-luxury-gray/60 focus:outline-none focus:border-luxury-gold transition duration-300"
                placeholder="e.g., james@email.com"
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full bg-transparent border-b-2 border-luxury-cream py-3 text-luxury-black placeholder-luxury-gray/60 focus:outline-none focus:border-luxury-gold transition duration-300 resize-none"
                placeholder="How can we assist you today?"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-12 py-4 bg-luxury-black text-luxury-white text-sm tracking-[0.2em] uppercase font-sans font-medium hover:bg-luxury-charcoal transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
