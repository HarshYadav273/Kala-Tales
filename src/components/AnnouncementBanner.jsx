// ─────────────────────────────────────────────────────────────────────────────
// SALE BANNER CONFIG
// Set SHOW_BANNER to true  → banner is visible
// Set SHOW_BANNER to false → banner is hidden (zero height, no layout shift)
// ─────────────────────────────────────────────────────────────────────────────
const SHOW_BANNER = true;

const BANNER = {
  event: "Mother's Day",
  message: "Celebrate Mom with love — enjoy",
  discount: "15% OFF",
  suffix: "sitewide this Mother's Day! 🌸",
};
// ─────────────────────────────────────────────────────────────────────────────

export default function AnnouncementBanner() {
  if (!SHOW_BANNER) return null;

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #b5446e 0%, #d4547a 50%, #b5446e 100%)",
        backgroundSize: "200% 100%",
        animation: "bannerSlide 6s linear infinite",
        color: "#fff",
        textAlign: "center",
        fontSize: "0.78rem",
        letterSpacing: "0.06em",
        padding: "7px 16px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        position: "relative",
        zIndex: 100,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        flexWrap: "wrap",
        lineHeight: 1.4,
      }}
    >
      {/* Shimmer overlay */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          animation: "shimmer 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Flower icon */}
      <span style={{ fontSize: "1em", flexShrink: 0 }}>🌷</span>

      {/* Main text */}
      <span>
        {BANNER.message}&nbsp;
        <strong style={{ fontWeight: 700, letterSpacing: "0.08em" }}>
          {BANNER.discount}
        </strong>
        &nbsp;{BANNER.suffix}
      </span>



      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes bannerSlide {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}
