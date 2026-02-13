import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

export default function ImageViewer({ imageUrl, outfitName }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");

  const normalizeSrc = (src) => {
    if (!src) return src;
    if (/^data:/i.test(src) || /^https?:\/\//i.test(src)) return src;
    if (src.startsWith("/")) return `${baseUrl}${src}`;
    return `${baseUrl}/${src}`;
  };

  // Rewrite dev localhost absolute URLs (backend may return http://localhost:8000/...) to production base URL
  const normalizeDevHost = (src) => {
    if (!src) return src;
    const m = String(src).match(/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(\/.*)$/i);
    if (m && m[1]) return `${baseUrl}${m[1]}`;
    return src;
  };

  const normalizedDevImageUrl = normalizeDevHost(normalizedImageUrl);
  const finalImageUrl = normalizedDevImageUrl;

  const normalizedImageUrl = normalizeSrc(imageUrl);
  const [hasValidImage, setHasValidImage] = useState(Boolean(finalImageUrl));

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e) => { if (e.key === "Escape") setIsFullscreen(false); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  /* ────── Empty / Error State ────── */
  if (!hasValidImage) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4">
          <div className="relative aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden flex flex-col items-center justify-center">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ 
                backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", 
                backgroundSize: "20px 20px" 
              }}
            ></div>

            <div className="relative bg-white rounded-full p-6 shadow-sm border border-stone-200">
              <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-stone-400 mt-4">No image available</p>
          </div>
        </div>

        {/* Disabled button */}
        <div className="px-5 pb-5 pt-2 flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 border border-stone-200">
            <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">View Full</span>
          </div>
        </div>
      </div>
    );
  }

  /* ────── Main Component ────── */
  return (
    <div>
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Image area */}
        <div
          className="group relative p-4 cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-100">

            {/* Loading spinner */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-100 z-10">
                <svg className="w-8 h-8 text-stone-400 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              </div>
            )}

            {/* Image */}
            <img
              src={finalImageUrl}
              alt={outfitName || "Outfit"}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } group-hover:scale-105`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setHasValidImage(false)}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* View Full button */}
        <div className="px-5 pb-5 pt-2 flex justify-center">
          <button
            onClick={() => setIsFullscreen(true)}
            className="group inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 hover:border-stone-300 text-stone-700 px-5 py-2.5 rounded-full transition-all duration-200"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs uppercase tracking-wider font-medium">View Full</span>
          </button>
        </div>
      </div>

      {/* ────── Fullscreen Modal ────── */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">

          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 z-20 group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full px-5 py-3 transition-all duration-200"
            aria-label="Close"
          >
            <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-xs uppercase tracking-wider font-medium">Close</span>
          </button>

          {/* ESC hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <kbd className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-xs font-medium">ESC</kbd>
              <span className="text-white/70 text-xs">to close</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center">
            <img
              src={finalImageUrl}
              alt={outfitName || "Outfit"}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Click-to-close backdrop */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsFullscreen(false)} />
        </div>
      )}
    </div>
  );
}