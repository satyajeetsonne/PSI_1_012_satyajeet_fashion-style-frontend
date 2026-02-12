import { useEffect, useState, useCallback } from "react";
import SeasonalCard from "../components/SeasonalCard";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../config/api";

export default function Recommendations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /* ── fetch seasonal recommendations ── */
  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/recommendations/seasonal`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Unable to generate seasonal recommendations");
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  /* ── render ── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50">

      {/* Decorative elements (match Dashboard) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-stone-300/15 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section (style similar to Dashboard) */}
      <div className="relative mb-12">
        <div className="relative h-80 lg:h-96 overflow-hidden">
          <img src="/images/profile_wardrobe.jpg" alt="" 
          className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/50 to-stone-900/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative -mt-24">
          <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-stone-400"></div>
                  <span className="text-xs uppercase tracking-[0.4em] text-stone-600 font-light">
                    Seasonal_Edit</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-stone-900 tracking-tight">The Current Edit</h1>
                <p className="text-lg text-stone-600 font-light max-w-xl leading-relaxed">Quiet luxury for the season.</p>
              </div>

              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content area (narrower for Recommendations) */}
      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 pb-16">
        {/* Seasonal card in a frosted pane (kept original visuals) */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-br from-stone-900/8 via-amber-600/6 to-stone-900/8 rounded-3xl blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative bg-white/60 backdrop-blur-2xl border-2 border-white/90 rounded-3xl shadow-2xl overflow-hidden group-hover:border-amber-200/40 transition-all duration-700">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="max-w-3xl mx-auto">
                  <SeasonalCard loading={loading} error={error} data={data} onRefresh={fetchRecommendations} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}