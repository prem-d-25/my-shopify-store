export default function MarqueeSlider() {
  return (
    <div className="relative overflow-hidden bg-black py-2 text-white">
      <div className="marquee-wrapper group">
        <div className="marquee-content flex items-center gap-16 space-x-8 px-8">
          {Array(10).fill("✸ SALE 50% OFF ✸").map((text, index) => (
            <span key={index} className="text-2xl font-bold whitespace-nowrap">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-wrapper {
          display: flex;
          overflow: hidden;
          position: relative;
          width: 100%; /* Ensure wrapper fits the viewport */
        }

        .marquee-content {
          flex-shrink: 0;
          width: 50%; /* Adjust for seamless animation */
          display: flex;
          align-items: center;
          animation: marquee 15s linear infinite;
        }

        .group:hover .marquee-content {
          animation-play-state: paused; /* Pause animation on hover */
        }
      `}</style>
    </div>
  );
}
