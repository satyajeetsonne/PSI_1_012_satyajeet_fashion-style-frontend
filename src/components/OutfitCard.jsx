import { Link } from "react-router-dom";

export default function OutfitCard({ outfit }) {
  const isValidFashionImage = outfit.image_url || outfit.image;

  const getCategoryEmoji = (category) => {
    if (!category) return "";
    const c = String(category).toLowerCase();
    if (c.includes("foot")) return "";
    if (c.includes("outer")) return "";
    if (c.includes("access")) return "";
    if (c.includes("top")) return "";
    if (c.includes("pant") || c.includes("jean")) return "";
    if (c.includes("casual")) return "";
    if (c.includes("formal")) return "";
    return "";
  };

  return (
    <Link 
      to={`/outfits/${outfit.id}`} 
      className="group block relative h-full"
    >
      {/* Subtle glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-br from-stone-300/0 via-stone-400/0 to-stone-300/0 group-hover:from-stone-300/30 group-hover:via-stone-400/20 group-hover:to-stone-300/30 rounded-3xl blur-xl transition-all duration-500"></div>
      
      {/* Main Card */}
      <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white/90 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 flex flex-col h-full">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>

        {/* Image Container - 4:5 aspect ratio */}
        <div className="relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50 aspect-[4/5] flex-shrink-0">
          {isValidFashionImage ? (
            <>
              <img
                src={outfit.image_url || outfit.image}
                alt={outfit.name || "Outfit"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
              <div className="bg-white/70 backdrop-blur-md border-2 border-white rounded-full p-8 mb-4 shadow-lg">
                <svg className="w-16 h-16 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-stone-500 text-sm font-light uppercase tracking-[0.25em]">No Image</p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="relative p-4 lg:p-5 bg-white/50 backdrop-blur-sm flex flex-col flex-grow">
          {/* Title */}
          <h3 className="font-light text-sm lg:text-base text-stone-900 mb-2 line-clamp-2 leading-snug">
            {outfit.name || "Untitled Outfit"}
          </h3>

          {/* Date with icon */}
          {outfit.date && (
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-stone-500 text-xs font-light tracking-wide">
                {new Date(outfit.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          )}

          {/* Tags - Pills */}
          {outfit.tags && outfit.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {outfit.tags.slice(0, 2).map((tag, idx) => (
                <span 
                  key={idx} 
                  className="bg-white/80 backdrop-blur-sm text-stone-700 text-xs font-light px-2.5 py-1 border border-white/80 rounded-full shadow-sm"
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              ))}
              {outfit.tags.length > 2 && (
                <span className="bg-white/80 backdrop-blur-sm text-stone-600 text-xs font-light px-2.5 py-1 border border-white/80 rounded-full shadow-sm">
                  +{outfit.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Footer with View Link */}
          <div className="mt-auto pt-3 border-t border-white/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-stone-600">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs uppercase tracking-[0.15em] font-light">View</span>
              </div>

              {/* Arrow in circle */}
              <div className="flex items-center justify-center w-7 h-7 bg-white/70 backdrop-blur-sm border border-white/80 rounded-full group-hover:bg-stone-900 group-hover:border-stone-900 transition-all duration-300 shadow-sm">
                <svg className="w-3 h-3 text-stone-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}