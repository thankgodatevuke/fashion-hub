// client/src/pages/About.jsx
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      {/* --- HERO SECTION (Light & Airy) --- */}
      <section className="relative h-[90vh] md:h-[70vh] flex items-center justify-center bg-luxury-cream text-luxury-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-sm tracking-[0.3em] uppercase text-luxury-gold font-sans font-light">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mt-4">
            The Art of <br className="hidden md:block" />
            <span className="italic text-luxury-gold">Modern Luxury</span>
          </h1>
          <p className="mt-6 text-lg font-light text-luxury-gray max-w-2xl mx-auto">
            Where architectural precision meets draped fluidity. We exist for
            the individual who seeks distinction.
          </p>
        </div>
      </section>

      {/* --- BRAND STORY (Two Columns) --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 border-b border-luxury-cream">
        <div>
          <h2 className="text-sm tracking-[0.3em] uppercase text-luxury-gold font-sans font-semibold mb-4">
            ÉLYSÉE
          </h2>
          <p className="text-2xl md:text-3xl font-serif font-light leading-snug">
            Clothing is architecture. <br />
            <span className="font-bold">It is a matter of proportion.</span>
          </p>
        </div>
        <div className="space-y-6 text-luxury-gray font-light leading-relaxed">
          <p>
            Founded in 2024, ÉLYSÉE was born from a desire to bridge the gap
            between minimalist discipline and maximalist expression. We believe
            that true luxury is not loud—it is felt in the weight of a fabric,
            the precision of a seam, and the silent confidence of a perfect
            silhouette.
          </p>
          <p>
            Our collections are crafted from the world's finest materials,
            sourced ethically from Italy, Japan, and beyond. Each piece is
            designed to transcend seasons, becoming a staple in the wardrobes of
            those who appreciate enduring design over fleeting trends.
          </p>
        </div>
      </div>

      {/* --- VALUES / MISSION (3 Columns) --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-b border-luxury-cream">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-xs tracking-[0.3em] uppercase text-luxury-gold font-sans font-semibold mb-2">
            Philosophy
          </h3>
          <h2 className="text-3xl md:text-4xl font-serif font-light">
            Designed to <span className="font-bold">last.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-12 h-0.5 bg-luxury-gold mx-auto mb-6" />
            <h4 className="font-serif text-xl font-medium mb-3">
              Exceptional Craft
            </h4>
            <p className="text-sm text-luxury-gray font-light leading-relaxed">
              Every garment is constructed with traditional tailoring
              techniques, ensuring a fit that improves with age.
            </p>
          </div>
          <div>
            <div className="w-12 h-0.5 bg-luxury-gold mx-auto mb-6" />
            <h4 className="font-serif text-xl font-medium mb-3">
              Radical Transparency
            </h4>
            <p className="text-sm text-luxury-gray font-light leading-relaxed">
              We trace every thread to its origin. Our supply chain is ethical,
              sustainable, and fully traceable.
            </p>
          </div>
          <div>
            <div className="w-12 h-0.5 bg-luxury-gold mx-auto mb-6" />
            <h4 className="font-serif text-xl font-medium mb-3">
              Timeless Aesthetic
            </h4>
            <p className="text-sm text-luxury-gray font-light leading-relaxed">
              We reject the fast-fashion cycle. Our pieces are designed to exist
              beyond the whims of the season.
            </p>
          </div>
        </div>
      </div>

      {/* --- CALL TO ACTION (Lookbook) --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-light">
          Explore the <span className="font-bold">Collection</span>
        </h2>
        <p className="text-luxury-gray font-light mt-4 mb-8">
          Discover the pieces that define the new standard of luxury.
        </p>
        <Link to="/shop">
          <button className="px-10 py-4 border-2 border-luxury-black text-sm tracking-[0.2em] uppercase hover:bg-luxury-black hover:text-luxury-white transition duration-300 font-sans font-medium">
            View Shop
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
