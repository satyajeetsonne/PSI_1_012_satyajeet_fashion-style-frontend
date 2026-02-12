export default function AnalysisView({ analysis, status = "pending" }) {

  /* ── shared glass state card ── */
  const StateCard = ({ color = "stone", icon, title, subtitle }) => {
    const palette = {
      amber:  { bg: "bg-amber-400/14",  border: "border-amber-300/50",  glow: "from-amber-400/10 to-amber-500/6",  text: "text-amber-700",  iconBg: "bg-amber-50/80",  iconBorder: "border-amber-200/60", iconColor: "text-amber-500" },
      red:    { bg: "bg-red-400/12",    border: "border-red-300/45",    glow: "from-red-400/10 to-red-500/6",      text: "text-red-700",    iconBg: "bg-red-50/80",    iconBorder: "border-red-200/60",   iconColor: "text-red-500" },
      stone:  { bg: "bg-stone-400/10",  border: "border-stone-300/40",  glow: "from-stone-400/8 to-stone-500/4",   text: "text-stone-600",  iconBg: "bg-stone-50/80",  iconBorder: "border-stone-200/60", iconColor: "text-stone-400" },
    };
    const c = palette[color];

    return (
      <div className="relative">
        {/* outer glow */}
        <div className={`absolute -inset-1.5 bg-gradient-to-br ${c.glow} rounded-3xl blur-xl`}></div>

        {/* liquid blob */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className={`absolute -top-8 -right-8 w-36 h-36 ${c.bg} rounded-full blur-3xl animate-[liquidA_9s_ease-in-out_infinite]`}></div>
        </div>

        {/* frosted pane */}
        <div className={`relative bg-white/55 backdrop-blur-xl border ${c.border} rounded-3xl shadow-lg overflow-hidden`}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/35 to-transparent"></div>

          <div className="p-8 flex flex-col items-center text-center gap-5" aria-live="polite">
            {/* icon ring */}
            <div className="relative">
              {color === "amber" && <div className="absolute inset-0 rounded-full bg-amber-200/40 blur-lg animate-pulse"></div>}
              <div className={`relative ${c.iconBg} backdrop-blur-sm border ${c.iconBorder} rounded-full p-4 shadow-sm`}>
                {icon}
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-normal text-stone-800 uppercase tracking-[0.3em]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {title}
              </h3>
              <p className={`text-sm font-light leading-relaxed ${c.text}`}>{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ── status states ── */
  if (status === "pending") {
    return (
      <StateCard
        color="amber"
        title="Analyzing"
        subtitle="AI is reading your outfit — hang tight"
        icon={
          <svg className="w-6 h-6 text-amber-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        }
      />
    );
  }

  if (status === "failed") {
    return (
      <StateCard
        color="red"
        title="Analysis Failed"
        subtitle="Something went wrong — try re-uploading the image"
        icon={
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376a12 12 0 1021.593 0M12 15.75h.008v.008H12v-.008z" />
          </svg>
        }
      />
    );
  }

  if (!analysis || typeof analysis !== "object") {
    return (
      <StateCard
        color="stone"
        title="No Analysis"
        subtitle="Analysis data is not available yet"
        icon={
          <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
        }
      />
    );
  }

  /* ── normalize ── */
  const styles          = Array.isArray(analysis.styles) ? analysis.styles : [];
  const items           = Array.isArray(analysis.clothing_items) ? analysis.clothing_items : Array.isArray(analysis.items) ? analysis.items : [];
  const recommendations = Array.isArray(analysis.recommendations) ? analysis.recommendations : [];

  /* ── section heading ── */
  const SectionHead = ({ label, count }) => (
    <div className="flex items-center gap-3 mb-5">
      <h4 className="text-lg font-normal text-stone-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
        {label}
      </h4>
      {count !== undefined && (
        <span className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-full px-3 py-1 text-xs text-stone-600 font-light shadow-sm">
          {count}
        </span>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-stone-200/60 to-transparent"></div>
    </div>
  );

  /* ── pill chip ── */
  const Chip = ({ label, variant = "default" }) => {
    const styles = {
      default: "bg-white/60 border-white/70 text-stone-700 hover:border-stone-400/60 hover:bg-stone-100/50",
      amber:   "bg-stone-100/70 border-stone-300/60 text-stone-800 hover:bg-stone-150/60",
    };
    return (
      <span className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-light backdrop-blur-sm shadow-sm transition-all duration-300 cursor-default ${styles[variant]}`}>
        {label}
      </span>
    );
  };

  /* ── main ── */
  return (
    <div className="space-y-8">

      {/* ── Overview ── */}
      {analysis.description && (
        <section className="animate-[fadeUp_0.4s_ease_forwards]">
          <SectionHead label="Overview" />
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-stone-900/4 via-transparent to-amber-600/5 rounded-3xl blur-lg"></div>
            <div className="relative bg-white/55 backdrop-blur-xl border border-white/70 rounded-3xl p-6 shadow-lg">
              <p className="text-sm text-stone-600 font-light leading-[1.8]">
                {analysis.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Styles ── */}
      {styles.length > 0 && (
        <section className="animate-[fadeUp_0.4s_ease_0.1s_forwards] opacity-0">
          <SectionHead label="Styles" count={styles.length} />
          <div className="flex flex-wrap gap-3">
            {styles.map((style, idx) => (
              <Chip key={idx} label={style} variant="amber" />
            ))}
          </div>
        </section>
      )}

      {/* ── Detected Items ── */}
      {items.length > 0 && (
        <section className="animate-[fadeUp_0.4s_ease_0.2s_forwards] opacity-0">
          <SectionHead label="Detected Items" count={items.length} />
          <div className="flex flex-wrap gap-3">
            {items.map((item, idx) => (
              <Chip key={idx} label={item} variant="default" />
            ))}
          </div>
        </section>
      )}

      {/* ── Styling Tips ── */}
      {recommendations.length > 0 && (
        <section className="animate-[fadeUp_0.4s_ease_0.3s_forwards] opacity-0">
          <SectionHead label="Styling Tips" count={recommendations.length} />
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div 
                key={idx} 
                className="group relative"
                style={{ animation: `fadeUp 0.45s ease ${idx * 0.08}s both` }}
              >
                {/* hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-stone-900/4 via-transparent to-amber-600/5 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* liquid blob — appears on hover */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-[liquidB_10s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>

                {/* glass tip card */}
                <div className="relative bg-white/55 backdrop-blur-xl border border-white/70 rounded-3xl p-6 shadow-lg hover:shadow-xl group-hover:border-amber-300/40 overflow-hidden transition-all duration-400">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/25 to-transparent"></div>

                  <div className="relative space-y-3">
                    <h3 
                      className="text-lg font-normal text-stone-900 group-hover:text-amber-900 transition-colors duration-300"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Tip {idx + 1}
                    </h3>
                    <p className="text-sm text-stone-600 font-light leading-[1.75]">
                      {rec}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Playfair Display + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes liquidA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(14px, -10px) scale(1.07); }
        }
      `}</style>
    </div>
  );
}