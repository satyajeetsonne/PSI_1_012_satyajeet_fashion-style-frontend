import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

export default function MatchingSuggestions({ outfitId, userId, analysisStatus }) {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAutoLoaded, setIsAutoLoaded] = useState(false);

  const getCategoryEmoji = (category) => {
    if (!category) return "";
    const c = String(category).toLowerCase();
    if (c.includes("foot")) return "👟";
    if (c.includes("outer")) return "🧥";
    if (c.includes("access")) return "👜";
    if (c.includes("top")) return "👕";
    if (c.includes("pant") || c.includes("jean")) return "👖";
    return "🧾";
  };

  // Auto-fetch suggestions when outfit analysis is completed
  useEffect(() => {
    if (analysisStatus === "completed" && !isAutoLoaded && !loading) {
      fetchSuggestions();
      setIsAutoLoaded(true);
    }
  }, [analysisStatus, isAutoLoaded, loading]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      setError("");

      const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");
      const url = `${baseUrl}/api/outfits/${outfitId}/matching?user_id=${encodeURIComponent(userId)}`;
      console.debug("MatchingSuggestions.fetchSuggestions: requesting", url);
      const response = await fetch(url, { method: "POST" });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to generate suggestions");
      }

      const data = await response.json();
      setSuggestions(data.data.suggestions);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to generate suggestions");
    } finally {
      setLoading(false);
    }
  };

  // Don't show section until analysis is completed
  if (analysisStatus !== "completed") {
    return null;
  }

  return (
    <div className="space-y-10">
      {/* Section divider with liquid glass */}
      <div className="relative flex items-center gap-4 pt-12">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-300/60 to-stone-200/40"></div>
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/10 to-stone-400/10 rounded-full blur-md"></div>
          <span className="relative text-xs uppercase tracking-[0.3em] text-stone-500 font-light bg-white/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/60">
            Recommendations
          </span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-stone-300/60 to-stone-200/40"></div>
      </div>

      {/* Section Header with glass effect */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-stone-900/3 via-transparent to-amber-600/4 rounded-3xl blur-2xl"></div>
        <div className="relative space-y-4">
          <h2 
            className="text-3xl lg:text-4xl font-light text-stone-900 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Matching Suggestions
          </h2>
          <p className="text-sm text-stone-600 font-light leading-relaxed max-w-2xl">
            Curated recommendations to complete this look. Explore items that work with the colors, style, and mood of this outfit.
          </p>
        </div>
      </div>

      {/* Loading State with liquid glass */}
      {loading && !suggestions && (
        <div className="relative py-20">
          {/* Liquid blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/8 rounded-full blur-3xl animate-[liquidPulse_8s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-stone-400/6 rounded-full blur-2xl animate-[liquidPulse_6s_ease-in-out_infinite_reverse]"></div>
          </div>

          {/* Glass card */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-amber-400/10 to-stone-400/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/55 backdrop-blur-xl border border-white/70 rounded-3xl p-10 shadow-lg">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent mb-8"></div>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 bg-amber-200/30 rounded-full blur-lg animate-pulse"></div>
                  <div className="relative bg-amber-50/80 backdrop-blur-sm border border-amber-200/60 rounded-full p-3 shadow-sm">
                    <svg className="w-8 h-8 text-amber-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm font-light text-stone-700">
                    Generating personalized suggestions
                  </p>
                  <p className="text-xs text-stone-500 font-light">
                    Analyzing your outfit and style preferences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State with glass */}
      {error && !loading && (
        <div className="relative">
          <div className="absolute -inset-1.5 bg-gradient-to-br from-red-400/10 to-red-500/6 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/55 backdrop-blur-xl border border-red-300/50 rounded-3xl overflow-hidden shadow-lg">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-red-400/30 to-transparent"></div>
            
            <div className="p-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-200/30 rounded-full blur-md"></div>
                  <div className="relative bg-red-50/80 backdrop-blur-sm border border-red-200/60 rounded-full p-2.5">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-normal text-red-800">
                    Couldn't generate suggestions
                  </p>
                  <p className="text-xs text-red-600 font-light">{error}</p>
                </div>
              </div>
              
              <button
                onClick={fetchSuggestions}
                className="w-full text-xs uppercase tracking-[0.2em] text-red-700 hover:text-red-900 font-light border-t border-red-200/60 pt-5 transition-colors duration-300"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions Grid with liquid glass cards */}
      {suggestions && suggestions.length > 0 && (
        <>
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-white/60 rounded-full px-6 py-3 shadow-lg">
                  <svg className="w-5 h-5 animate-spin text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm text-stone-700 font-light">Refreshing…</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{ animation: `fadeUp 0.5s ease ${index * 0.1}s both` }}
                >
                  {/* Outer glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-stone-900/4 via-transparent to-amber-600/6 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Liquid blob on hover */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-400/12 rounded-full blur-2xl animate-[liquidFloat_10s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>

                  {/* Glass card */}
                  <div className="relative bg-white/55 backdrop-blur-xl border border-white/70 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-xl group-hover:border-amber-300/40 transition-all duration-400">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/25 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="relative bg-white/30 backdrop-blur-sm px-6 py-3.5 border-b border-white/50">
                      <span className="inline-flex items-center gap-2.5 text-xs font-light text-stone-600 uppercase tracking-[0.2em]">
                        <span className="text-base">{getCategoryEmoji(suggestion.category)}</span>
                        <span>{suggestion.category}</span>
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-7 space-y-5">
                      {/* Title */}
                      <h3 
                        className="text-xl font-normal text-stone-900 group-hover:text-amber-900 transition-colors duration-300"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {suggestion.title}
                      </h3>

                      {/* Why it works */}
                      <p className="text-sm text-stone-700 font-light leading-[1.75]">
                        {suggestion.why}
                      </p>

                      {/* Styling tip */}
                      {suggestion.tip && (
                        <div className="relative pt-4 mt-4 border-t border-white/60">
                          <div className="flex items-start gap-2.5">
                            <span className="text-sm flex-shrink-0">💡</span>
                            <p className="text-xs text-stone-600 italic font-light leading-relaxed">
                              {suggestion.tip}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refresh Button with glass effect */}
          <div className="flex justify-center pt-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-stone-400/15 to-amber-400/10 rounded-full blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <button
                onClick={fetchSuggestions}
                disabled={loading}
                className="relative text-xs uppercase tracking-[0.25em] text-stone-600 hover:text-stone-900 font-light bg-white/60 backdrop-blur-md border border-white/70 hover:border-amber-300/50 px-8 py-3.5 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2.5">
                    <svg className="w-4 h-4 animate-spin text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Refreshing…</span>
                  </span>
                ) : (
                  "Refresh suggestions"
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Empty State with glass */}
      {suggestions && !loading && suggestions.length === 0 && (
        <div className="relative py-16">
          <div className="absolute -inset-4 bg-gradient-to-br from-stone-900/3 to-stone-400/4 rounded-3xl blur-2xl"></div>
          <div className="relative bg-white/55 backdrop-blur-xl border border-white/70 rounded-3xl p-10 shadow-lg text-center space-y-5">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-400/25 to-transparent mb-6"></div>
            
            <div className="inline-flex bg-stone-50/80 backdrop-blur-sm border border-stone-200/60 rounded-full p-4 mb-2">
              <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            
            <p className="text-sm text-stone-600 font-light">
              No suggestions available at this time
            </p>
            
            <button
              onClick={fetchSuggestions}
              className="text-xs uppercase tracking-[0.2em] text-amber-600 hover:text-amber-900 font-light transition-colors duration-300 pt-4"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Playfair Display font + animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes liquidPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50%      { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
        }
        
        @keyframes liquidFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(12px, -8px) scale(1.05); }
          66%      { transform: translate(-8px, 10px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}