import { useEffect, useState } from "react";
import Carousel from "./Carousel";

export default function WeeklyCalendar({ suggestions = [], onRefresh }) {
  const [mounted, setMounted] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const today = new Date();
  const todayName = today.toLocaleDateString("en-US", { weekday: "long" });

  const colorSchemes = [
    "from-stone-700 to-stone-900",
    "from-amber-600 to-amber-800",
    "from-slate-600 to-slate-800",
    "from-neutral-600 to-neutral-800",
    "from-zinc-600 to-zinc-800",
    "from-rose-600 to-rose-800",
    "from-indigo-600 to-indigo-800",
  ];

  const weekData = daysOfWeek.map((day, idx) => {
    const s = suggestions.find((d) => d.day_name === day) || {};
    
    return {
      id: idx,
      day,
      short: day.slice(0, 3).toUpperCase(),
      occasion: s.occasion || "",
      recommendation: s.recommendation || "",
      items: s.suggested_items || [],
      isToday: day === todayName,
      color: colorSchemes[idx],
    };
  });

  const hasData = (d) =>
    d.occasion || d.recommendation || d.items.length > 0;

  /* ---------------- EMPTY STATE ---------------- */

  if (suggestions.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-stone-50 rounded-xl text-center">
        <h3 className="text-xl font-light text-stone-900 mb-2">
          Weekly Outfit Plan
        </h3>
        <p className="text-sm text-stone-500 mb-6 max-w-sm">
          Generate AI-powered outfit suggestions tailored to your wardrobe.
        </p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-6 py-2 bg-stone-900 text-white text-sm rounded-lg hover:bg-stone-800 transition"
          >
            Generate Plan
          </button>
        )}
      </div>
    );
  }

  /* ---------------- MAIN CAROUSEL ---------------- */

  return (
    <>
      <Carousel
        items={weekData}
        showArrows={true}
        renderItem={(day) => (
          <button
            onClick={() => hasData(day) && setSelectedDay(day)}
            className={`text-left transition-all w-full ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: `${day.id * 50}ms` }}
          >
            <div
              className={`h-full min-h-[220px] rounded-xl overflow-hidden border ${
                hasData(day)
                  ? "bg-white hover:shadow-md"
                  : "bg-stone-50"
              } transition`}
            >
              {/* Header */}
              <div
                className={`h-16 bg-gradient-to-br ${day.color} px-4 flex items-center justify-between`}
              >
                <div>
                  <div className="text-white text-lg font-light">
                    {day.short}
                  </div>
                </div>
                {day.isToday && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">
                    Today
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {hasData(day) ? (
                  <>
                    {day.occasion && (
                      <span className="inline-block text-[10px] uppercase tracking-wide text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                        {day.occasion}
                      </span>
                    )}

                    {day.items.slice(0, 3).map((item, i) => (
                      <p
                        key={i}
                        className="text-xs text-stone-600 leading-snug line-clamp-1"
                      >
                        • {item}
                      </p>
                    ))}

                    {day.items.length > 3 && (
                      <p className="text-[10px] text-stone-400">
                        +{day.items.length - 3} more
                      </p>
                    )}

                    <div className="pt-2 text-center text-[10px] text-stone-400 uppercase tracking-wide">
                      View details
                    </div>
                  </>
                ) : (
                  <div className="h-24 flex items-center justify-center text-xs text-stone-400">
                    Rest day
                  </div>
                )}
              </div>
            </div>
          </button>
        )}
      />

      {/* ---------------- DETAIL PANEL ---------------- */}

      {selectedDay && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setSelectedDay(null)}
        >
          <style>{`@keyframes slideInPanel { from { transform: translateX(12px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
          {(() => {
            const anchor = selectedDay.anchorRect || null;
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            if (!anchor || isMobile) {
              return (
                <div className="flex justify-end h-full">
                  <div
                    className="w-full max-w-[420px] bg-white h-full p-6 overflow-y-auto border-l-2 border-stone-200/10"
                    style={{ animation: 'slideInPanel 260ms ease-out forwards' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-4 right-4 text-stone-500"
                      onClick={() => setSelectedDay(null)}
                    >
                      ✕
                    </button>

                    <h2 className="text-2xl font-light text-stone-900 mb-4">
                      {selectedDay.day}
                    </h2>

                    {selectedDay.occasion && (
                      <span className="inline-block mb-4 text-xs uppercase tracking-wide text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                        {selectedDay.occasion}
                      </span>
                    )}

                    {selectedDay.recommendation && (
                      <p className="text-sm text-stone-700 mb-6">
                        {selectedDay.recommendation}
                      </p>
                    )}

                    <div className="space-y-3">
                      {selectedDay.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg"
                        >
                          <span className="w-6 h-6 flex items-center justify-center bg-stone-900 text-white text-xs rounded">
                            {i + 1}
                          </span>
                          <span className="text-sm text-stone-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            const panelWidth = 360;
            const gap = 12;
            const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1200;
            const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
            let left = anchor.right + gap;
            let placeLeft = false;
            if (left + panelWidth > viewportW - 12) {
              left = anchor.left - panelWidth - gap;
              placeLeft = true;
            }
            const top = Math.max(24, anchor.top + scrollY - 12);

            return (
              <>
                <div
                  style={{ top: anchor.top + scrollY + anchor.height / 2 - 8, left: placeLeft ? left + panelWidth : anchor.right + gap - 8 }}
                  className="absolute z-50 w-4 h-4 bg-white rounded-sm border border-stone-200/5 shadow-sm"
                />

                <div
                  className="absolute z-50 bg-white p-4 overflow-y-auto shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: panelWidth,
                    maxHeight: 'calc(100vh - 48px)',
                    left: left,
                    top: top,
                    borderLeft: '2px solid rgba(15, 23, 42, 0.05)',
                    borderRadius: 8,
                    animation: 'slideInPanel 260ms ease-out forwards'
                  }}
                >
                  <button
                    className="absolute top-4 right-4 text-stone-500"
                    onClick={() => setSelectedDay(null)}
                  >
                    ✕
                  </button>

                  <h2 className="text-2xl font-light text-stone-900 mb-4">
                    {selectedDay.day}
                  </h2>

                  {selectedDay.occasion && (
                    <span className="inline-block mb-4 text-xs uppercase tracking-wide text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                      {selectedDay.occasion}
                    </span>
                  )}

                  {selectedDay.recommendation && (
                    <p className="text-sm text-stone-700 mb-6">
                      {selectedDay.recommendation}
                    </p>
                  )}

                  <div className="space-y-3">
                    {selectedDay.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg"
                      >
                        <span className="w-6 h-6 flex items-center justify-center bg-stone-900 text-white text-xs rounded">
                          {i + 1}
                        </span>
                        <span className="text-sm text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </>
  );
}
