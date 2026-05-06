import { Link } from "react-router-dom";
import hero1 from "../Assests/Images/heroImage-1.jpg";
import hero2 from "../Assests/Images/heroImage2.jpg";
import hero3 from "../Assests/Images/heroImage-3.jpg";

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden">
      {/* 3 images side by side */}
      <div className="absolute inset-0 grid grid-cols-3">
        <div className="overflow-hidden">
          <img
            src={hero1}
            alt="Macrame"
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="overflow-hidden">
          <img
            src={hero2}
            alt="Candles"
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="overflow-hidden">
          <img
            src={hero3}
            alt="Macrame"
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-4">
        <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#f0c89a] border border-[#C8441A] px-4 py-1.5 rounded-full">
          New Collection
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-wide">
          Handcrafted with
          <br />
          <span className="text-[#f0a070] italic">love & soul</span>
        </h1>

        <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#e8d5c4] mt-1">
          Candles · Macrame · Gifts
        </p>

        <Link
          to="/products"
          className="mt-4 bg-[#C8441A] hover:bg-[#a83615] text-white text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm transition-colors duration-200"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}
