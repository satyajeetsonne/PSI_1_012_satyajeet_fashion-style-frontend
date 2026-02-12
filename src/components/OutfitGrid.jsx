import { useState, useEffect } from "react";
import OutfitCard from "./OutfitCard";

// Skeleton placeholder that mirrors OutfitCard's glass shape
function OutfitSkeleton() {
  return (
    <div className="relative rounded-3xl overflow-hidden">
      {/* Glass container matching OutfitCard */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-lg overflow-hidden">
        {/* Image placeholder */}
        <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-white/60 to-stone-200 animate-[shimmer_1.5s_infinite_linear]" style={{ backgroundSize: '200% 100%' }}></div>
          {/* Fake badge */}
          <div className="absolute top-4 left-4 h-7 w-24 bg-white/40 backdrop-blur-sm rounded-full"></div>
        </div>
        {/* Content placeholder */}
        <div className="p-5 space-y-3">
          <div className="h-4 w-3/4 bg-stone-200 rounded-full animate-pulse"></div>
          <div className="h-3 w-1/2 bg-stone-100 rounded-full animate-pulse"></div>
          <div className="flex gap-2 pt-2">
            <div className="h-6 w-16 bg-stone-100 rounded-full animate-pulse"></div>
            <div className="h-6 w-20 bg-stone-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated particle dot for empty state
function FloatingDot({ className, style }) {
  return <div className={className} style={style}></div>;
}

export default function OutfitGrid({ outfits = [], isLoading = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // ─── Loading skeleton grid ───────────────────────────────────────
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="opacity-0 animate-[fadeUp_0.4s_ease_forwards]"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <OutfitSkeleton />
          </div>
        ))}
      </div>
    );
  }

  // ─── Populated grid ─────────────────────────────────────────────
  if (outfits.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-max">
        {outfits.map((outfit, index) => (
          <div
            key={outfit.id || index}
            className={`transition-all duration-500 h-full ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <OutfitCard outfit={outfit} />
          </div>
        ))}
      </div>
    );
  }

  // ─── Empty state ─────────────────────────────────────────────────
  return (
    <div className="col-span-full">
      <div className="flex flex-col items-center justify-center py-24 px-4">

        {/* Ambient floating dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { top: "12%", left: "18%", size: 6, delay: 0 },
            { top: "25%", right: "14%", size: 4, delay: 0.6 },
            { top: "60%", left: "8%",  size: 5, delay: 1.2 },
            { top: "70%", right: "22%", size: 3, delay: 0.3 },
            { top: "40%", left: "75%", size: 4, delay: 0.9 },
            { top: "80%", left: "40%", size: 5, delay: 1.5 },
          ].map((dot, i) => (
            <FloatingDot
              key={i}
              className="absolute rounded-full bg-amber-500 opacity-0 animate-[floatDot_3s_ease-in-out_infinite]"
              style={{
                top: dot.top,
                left: dot.left,
                right: dot.right,
                width: dot.size,
                height: dot.size,
                animationDelay: `${dot.delay}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Outer glow */}
        <div className="relative w-full max-w-lg">
          <div className="absolute -inset-2 bg-gradient-to-br from-stone-900/8 via-amber-600/6 to-stone-900/8 rounded-3xl blur-3xl"></div>

          {/* Glass card */}
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-xl overflow-hidden">

            {/* Top shimmer stripe */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>

            <div className="p-10 sm:p-14 flex flex-col items-center text-center space-y-8">

              {/* Icon ring */}
              <div className="relative">
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-[ping_2s_ease-out_infinite]"></div>
                {/* Glass circle */}
                <div className="relative bg-white/70 backdrop-blur-md border border-white/80 rounded-full p-5 shadow-md">
                  <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Copy */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-light text-stone-900 tracking-tight">
                  No outfits yet
                </h3>
                <p className="text-sm text-stone-500 font-light leading-relaxed max-w-xs mx-auto">
                  Upload photos of your outfits and let AI analyse your personal style
                </p>
              </div>

              {/* Divider with amber accent */}
              <div className="flex items-center justify-center gap-3 w-full">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-stone-200"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-stone-200"></div>
              </div>

              {/* CTA hint */}
              <div className="flex items-center gap-3">
                <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-full px-5 py-2.5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-500 font-light flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add to wardrobe to get started
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes floatDot {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50%      { opacity: 0.5; transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}