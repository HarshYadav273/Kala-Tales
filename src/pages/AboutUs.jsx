import logo from "../Assests/Images/Logo.png";
import { Link } from "react-router-dom";

const values = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
    ),
    title: "Handcrafted with Intention",
    desc: "Every piece is made by hand — slowly, carefully, and with deep respect for the craft. No mass production, no shortcuts.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
    title: "Women Artisan Made",
    desc: "Kala Tales actively supports women artisans, creating meaningful livelihood opportunities through craft and creativity.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"
        />
      </svg>
    ),
    title: "Tradition Meets Contemporary",
    desc: "We blend age-old Indian craft traditions with modern aesthetics — creating pieces that feel timeless yet relevant.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    title: "Made with Love",
    desc: "Each product carries the energy of the hands that made it. We believe objects made with love carry that warmth into your home.",
  },
];

const stats = [
  { number: "25+", label: "Macrame Designs" },
  { number: "9+", label: "Premium Candles" },
  { number: "100%", label: "Handcrafted" },
  { number: "Women", label: "Artisan Made" },
];

export default function AboutUs() {
  return (
    <div className="bg-[#fffaf5] min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#2a1f1a] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #C8441A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C8441A 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center text-center gap-5">
          <img
            src={logo}
            alt="Kala Tales"
            className="h-20 md:h-24 w-auto object-contain opacity-95"
          />
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A]">
            Our Story
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-light text-[#fffaf5] max-w-2xl leading-tight tracking-wide">
            Handcrafted Luxury Candles and Artisanal Lifestyle Creations
          </h1>
          <p className="text-sm text-[#c4b5a8] max-w-xl leading-relaxed">
            Made with love in India · Women Artisan Made · Hand Poured · Soy Wax
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-3">
              Who We Are
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-[#2a1f1a] tracking-wide mb-6 leading-snug">
              Rooted in Craftsmanship,
              <br />
              <span className="italic text-[#C8441A]">Driven by Purpose</span>
            </h2>
            <div className="flex flex-col gap-4 text-sm text-[#5a4a40] leading-relaxed">
              <p>
                Kala Tales creates handcrafted candles and lifestyle pieces that
                blend tradition with contemporary aesthetics. Each product is
                thoughtfully designed using premium materials, artisan
                detailing, and curated fragrances to elevate everyday spaces.
              </p>
              <p>
                Crafted with care and purpose, our creations also support women
                artisans and celebrate women-led craftsmanship through
                meaningful livelihood opportunities. Every purchase directly
                supports the hands that made it.
              </p>
              <p>
                From our premium metal jar candles to our handwoven macrame
                décor, every piece tells a story of skill, patience, and passion
                — a story that becomes part of your home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-8">
              <Link
                to="/candles"
                className="text-center bg-[#C8441A] hover:bg-[#a83615] text-white text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200"
              >
                Shop Candles
              </Link>
              <Link
                to="/macrame"
                className="text-center border border-[#C8441A] text-[#C8441A] hover:bg-[#C8441A] hover:text-white text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200"
              >
                Shop Macrame
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-[#e8ddd4] rounded-lg p-6 flex flex-col items-center justify-center text-center gap-1"
              >
                <span className="text-2xl sm:text-3xl font-light text-[#C8441A]">
                  {stat.number}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#7a6a60]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[#e8ddd4]" />
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-2">
            What We Believe
          </p>
          <h2 className="text-xl sm:text-2xl font-light text-[#2a1f1a] tracking-wide">
            Our Values
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((val) => (
            <div
              key={val.title}
              className="bg-white border border-[#e8ddd4] rounded-lg p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#C8441A]/10 flex items-center justify-center text-[#C8441A]">
                {val.icon}
              </div>
              <h3 className="text-sm font-medium text-[#2a1f1a] leading-snug">
                {val.title}
              </h3>
              <p className="text-xs text-[#7a6a60] leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-[#fff3eb] border-t border-b border-[#f0d5c0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8441A] mb-2">
            Get in Touch
          </p>
          <h3 className="text-xl sm:text-2xl font-light text-[#2a1f1a] mb-3 tracking-wide">
            Bulk Orders · Corporate Gifting · Custom Collections
          </h3>
          <p className="text-sm text-[#7a6a60] mb-6 max-w-md mx-auto">
            Have a special requirement? We'd love to create something unique for
            you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919999944552"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-[#C8441A] text-[#C8441A] hover:bg-[#C8441A] hover:text-white text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
