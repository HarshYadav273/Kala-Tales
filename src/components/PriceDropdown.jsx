import { useState, useRef, useEffect } from "react";

/**
 * Custom styled price dropdown — replaces the native <select>.
 * Props:
 *   ranges   — array of { label, value }
 *   value    — currently selected value string
 *   onChange — called with the new value string
 */
export default function PriceDropdown({ ranges, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = ranges.find((r) => r.value === value) || ranges[0];

  // Close when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 text-[10px] tracking-widest uppercase px-4 py-2 rounded-sm border transition-colors duration-200 min-w-[160px] justify-between ${
          open || value !== "all"
            ? "bg-[#C8441A] border-[#C8441A] text-white"
            : "border-[#e8ddd4] text-[#3a3028] hover:border-[#C8441A] hover:text-[#C8441A]"
        }`}
      >
        <span>{selected.label}</span>
        {/* Chevron icon */}
        <svg
          className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-full min-w-[200px] bg-white border border-[#e8ddd4] rounded-md shadow-lg z-30 overflow-hidden">
          {ranges.map((range, idx) => {
            const isActive = range.value === value;
            return (
              <button
                key={range.value}
                onClick={() => {
                  onChange(range.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-[10px] tracking-widest uppercase transition-colors duration-150 text-left ${
                  isActive
                    ? "bg-[#fff3ee] text-[#C8441A]"
                    : "text-[#3a3028] hover:bg-[#fffaf5] hover:text-[#C8441A]"
                } ${idx !== 0 ? "border-t border-[#f0ebe4]" : ""}`}
              >
                <span>{range.label}</span>
                {isActive && (
                  <svg
                    className="w-3 h-3 text-[#C8441A] flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
