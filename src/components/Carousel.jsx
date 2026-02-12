import { useRef } from "react";

export default function Carousel({ items = [], renderItem, showArrows = true }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.offsetWidth;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-stone-500 text-center">No items to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 pb-2"
        style={{
          scrollBehavior: "smooth",
          msOverflowStyle: "none", // Hide scrollbar in IE and Edge
          scrollbarWidth: "none", // Hide scrollbar in Firefox
        }}
      >
        {/* Hide scrollbar in Chrome, Safari and Opera */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Render items with fixed width */}
        {items.map((item, idx) => (
          <div
            key={idx}
            className="shrink-0 w-[260px] sm:w-[280px] md:w-[300px] snap-start"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Arrow Buttons - Visible only on md and above */}
      {showArrows && items.length > 0 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 items-center justify-center bg-white border border-stone-200 rounded-full shadow-md hover:shadow-lg hover:bg-stone-50 transition-all duration-300 z-10"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 text-stone-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 items-center justify-center bg-white border border-stone-200 rounded-full shadow-md hover:shadow-lg hover:bg-stone-50 transition-all duration-300 z-10"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 text-stone-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
