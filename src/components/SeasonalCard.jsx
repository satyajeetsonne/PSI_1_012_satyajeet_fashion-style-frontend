export default function SeasonalCard({ loading, error, data, onRefresh }) {
  
  /* ────────────────────────────────────────────────────────────
     LOADING STATE
  ──────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="relative">
        {/* Ambient glow */}
        <div className="absolute -inset-3 bg-gradient-to-br from-amber-400/10 via-stone-400/5 to-transparent rounded-3xl blur-2xl"></div>
        
        <div className="relative bg-white/60 backdrop-blur-2xl border-2 border-white rounded-3xl shadow-xl overflow-hidden">
          {/* Top shimmer line */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>

          {/* Animated liquid blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-amber-300/12 to-transparent rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-tl from-stone-300/8 to-transparent rounded-full blur-3xl animate-[float_15s_ease-in-out_infinite_reverse]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-r from-amber-200/6 to-transparent rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
          </div>

          <div className="relative py-24 flex flex-col items-center justify-center gap-6">
            {/* Elegant spinner */}
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-3 border-stone-100 rounded-full"></div>
                <div className="absolute inset-0 border-t-3 border-amber-600 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-2 border-stone-50 rounded-full"></div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-base font-light text-stone-900 tracking-tight">
                Crafting Your Recommendations
              </p>
              <p className="text-sm font-light text-stone-500">
                Analyzing seasonal trends and your style...
              </p>
            </div>
          </div>

          {/* Bottom divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────
     ERROR STATE
  ──────────────────────────────────────────────────────────── */
  if (error) {
    return (
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-br from-red-400/12 to-rose-400/6 rounded-3xl blur-xl"></div>
        
        <div className="relative bg-white/60 backdrop-blur-2xl border-2 border-red-200/40 rounded-3xl shadow-xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-400/30 to-transparent"></div>
          
          <div className="p-10 space-y-6">
            {/* Error icon with glow */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400/20 rounded-full blur-lg"></div>
                <div className="relative bg-red-50 border-2 border-red-200 rounded-full p-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error message */}
            <div className="text-center space-y-3">
              <h3 className="text-xl font-light text-stone-900 tracking-tight">
                Unable to Load Recommendations
              </h3>
              <p className="text-sm font-light text-stone-600 leading-relaxed max-w-md mx-auto">
                {error}
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-400"></div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-stone-300 to-transparent"></div>
            </div>

            {/* Retry button */}
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="w-full group relative inline-flex items-center justify-center gap-3 bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <svg className="relative w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="relative text-sm uppercase tracking-[0.25em] font-light">Try Again</span>
              </button>
            )}
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────
     NO DATA
  ──────────────────────────────────────────────────────────── */
  if (!data) return null;

  const { season, advice, styling_tips = [], outfit_suggestions = [] } = data;

  /* ────────────────────────────────────────────────────────────
     MAIN CONTENT
  ──────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-12">
      
      {/* ═══════════════════════════════════════════════════════
          HEADER SECTION - Season Badge + Refresh
      ═══════════════════════════════════════════════════════ */}
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/10 to-teal-400/5 rounded-2xl blur-xl opacity-60"></div>
        
        <div className="relative bg-white/60 backdrop-blur-xl border-2 border-white rounded-2xl shadow-lg p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
          
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Season indicator */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-stone-500 font-light mb-1">
                  Current Season
                </div>
                <div className="text-xl font-light text-stone-900 capitalize tracking-tight">
                  {season || "Spring"}
                </div>
              </div>
            </div>

            {/* Refresh button */}
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/60 hover:bg-white border-2 border-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4 text-stone-600 transition-transform duration-500 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm text-stone-700 font-light">Refresh</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          OVERVIEW SECTION
      ═══════════════════════════════════════════════════════ */}
      {advice && (
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-br from-stone-400/8 to-amber-400/4 rounded-2xl blur-xl opacity-60"></div>
          
          <div className="relative bg-white/60 backdrop-blur-xl border-2 border-white rounded-2xl shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
            
            <div className="relative p-8 space-y-4">
              <h3 className="text-2xl font-light text-stone-900 tracking-tight">
                Seasonal Overview
              </h3>
              <p className="text-base text-stone-700 font-light leading-relaxed whitespace-pre-line">
                {advice}
              </p>
            </div>

            {/* Bottom divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          STYLING TIPS SECTION
      ═══════════════════════════════════════════════════════ */}
      {styling_tips.length > 0 && (
        <div className="space-y-6">
          {/* Section header */}
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-light text-stone-900 tracking-tight">
              Expert Styling Tips
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
              <span className="text-sm text-stone-500 font-light">
                {styling_tips.length} {styling_tips.length === 1 ? 'tip' : 'tips'}
              </span>
            </div>
          </div>

          {/* Tips grid */}
          <div className="grid gap-4">
            {styling_tips.map((tip, i) => (
              <div key={i} className="relative group">
                {/* Hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/8 to-stone-400/4 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated liquid blob */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-amber-400/6 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-[float_10s_ease-in-out_infinite]"></div>
                </div>

                {/* Tip card */}
                <div className="relative bg-white/60 backdrop-blur-xl border-2 border-white group-hover:border-amber-200/40 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Top accent line */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
                  
                  <div className="relative p-5 flex items-start gap-4">
                    {/* Number badge */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm text-white font-medium">{i + 1}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tip text */}
                    <p className="flex-1 text-base text-stone-700 font-light leading-relaxed pt-1.5">
                      {tip}
                    </p>
                  </div>

                  {/* Bottom divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
                </div>

                {/* Edge highlight on hover */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          OUTFIT SUGGESTIONS SECTION
      ═══════════════════════════════════════════════════════ */}
      {outfit_suggestions.length > 0 && (
        <div className="space-y-8">
          {/* Section divider with decorative elements */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-300 to-stone-200"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 shadow-sm"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-stone-500 font-light">
                Curated For You
              </span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 shadow-sm"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-stone-300 to-stone-200"></div>
          </div>

          {/* Section header */}
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-light text-stone-900 tracking-tight">
              Outfit Recommendations
            </h3>
            <p className="text-base text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
              Handpicked combinations to elevate your seasonal wardrobe
            </p>
          </div>

          {/* Suggestions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outfit_suggestions.map((suggestion, idx) => (
              <div key={idx} className="relative group">
                {/* Outer glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-stone-400/12 to-amber-400/8 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated liquid blob */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-36 h-36 bg-amber-400/8 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-[float_12s_ease-in-out_infinite]"></div>
                </div>

                {/* Suggestion card */}
                <div className="relative bg-white/60 backdrop-blur-xl border-2 border-white group-hover:border-amber-200/40 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Top gradient accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>

                  {/* Category badge (if present) */}
                  {suggestion.occasion && (
                    <div className="relative bg-stone-50/60 backdrop-blur-sm border-b-2 border-white px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                        <span className="text-xs uppercase tracking-[0.25em] text-stone-600 font-light">
                          {suggestion.occasion}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="relative p-6 space-y-5">
                    {/* Title */}
                    <h4 className="text-xl font-light text-stone-900 tracking-tight group-hover:text-amber-900 transition-colors">
                      {suggestion.title || `Outfit ${idx + 1}`}
                    </h4>

                    {/* Items as styled tags */}
                    {suggestion.items && suggestion.items.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-xs uppercase tracking-[0.25em] text-stone-500 font-light flex items-center gap-2">
                          <span>Complete Look</span>
                          <div className="w-1 h-1 rounded-full bg-stone-400"></div>
                          <span>{suggestion.items.length} Items</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.items.map((item, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm border border-white rounded-lg text-sm text-stone-700 font-light shadow-sm hover:shadow-md hover:border-amber-200/40 transition-all duration-200"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-stone-400"></div>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    {suggestion.explanation && (
                      <div className="pt-4 border-t-2 border-white space-y-2">
                        <div className="text-xs uppercase tracking-[0.25em] text-stone-500 font-light">
                          Why This Works
                        </div>
                        <p className="text-sm text-stone-600 font-light leading-relaxed">
                          {suggestion.explanation}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
                </div>

                {/* Edge highlight on hover */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          ANIMATIONS
      ═══════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          33% { 
            transform: translate(20px, -15px) scale(1.08); 
          }
          66% { 
            transform: translate(-15px, 18px) scale(0.95); 
          }
        }
      `}</style>
    </div>
  );
}