import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { API_BASE_URL } from "../config/api";
import WeeklyCalendar from "../components/WeeklyCalendar";
import Footer from "../components/Footer";

export default function WeeklyRecommendations() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchWeeklySuggestions();
    }
  }, [user]);

  const fetchWeeklySuggestions = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError("");
      
      const response = await fetch(
        `${API_BASE_URL}/api/recommendations/weekly`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.uid }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.data || []);
      } else {
        setError("Failed to generate weekly suggestions. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching weekly suggestions:", err);
      setError("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="absolute top-40 right-20 w-32 h-32 border border-stone-200/40 -rotate-12 pointer-events-none"></div>
      <div className="absolute top-96 left-20 w-24 h-24 border border-amber-600/10 rotate-45 pointer-events-none"></div>

      
        <div className="relative mb-12">
          <div className="relative h-80 lg:h-96 overflow-hidden">
            <img
              src="/images/profile_wardrobe.jpg"
              alt=""
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/50 to-stone-900/70"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative -mt-32">
            <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-px bg-stone-400"></div>
                    <span className="text-xs uppercase tracking-[0.4em] text-stone-600 font-light">
                      Weekly Planning
                    </span>
                  </div>

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-stone-900 tracking-tight leading-none">
                    Your Week, Curated.
                  </h1>

                  <p className="text-lg text-stone-600 font-light max-w-xl leading-relaxed">
                    Refined outfit suggestions crafted for your rhythm.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="group flex items-center gap-3 px-6 py-3 border border-stone-300/40 text-stone-700 hover:border-stone-400/60 hover:bg-stone-50/40 transition-all duration-300 rounded-md text-xs uppercase tracking-[0.2em] font-normal"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-6">
        
        {/* Status Bar */}
        {!loading && !error && suggestions.length > 0 && (
          <div className="mb-8">
            <div className="p-6 border border-stone-200/40 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-light text-stone-900 tabular-nums">{suggestions.length}</span>
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-600 font-normal">
                      {suggestions.length === 1 ? 'outfit' : 'outfits'} curated
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-stone-500 font-normal mt-1">
                      This Week
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={fetchWeeklySuggestions}
                  disabled={loading}
                  className="group inline-flex items-center gap-2.5 px-6 py-3 border border-stone-300/40 text-stone-700 hover:border-stone-400/60 hover:bg-stone-50/40 transition-all duration-300 disabled:opacity-40 text-sm uppercase tracking-[0.2em] font-normal"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-12 p-6 border border-red-200 bg-red-50/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-normal text-red-900 mb-1">Error loading suggestions</p>
                <p className="text-sm text-red-700 font-light">{error}</p>
              </div>
              <button
                onClick={fetchWeeklySuggestions}
                className="px-5 py-2 bg-stone-900 text-white text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors duration-300 font-normal"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="flex flex-col items-center gap-6">
              <svg
                className="animate-spin h-8 w-8 text-stone-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                ></circle>
                <path
                  className="opacity-60"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-xs text-stone-500 font-normal uppercase tracking-[0.25em]">
                Curating your week
              </p>
            </div>
          </div>
        ) : (
          <>
            {!error && (
              <div>
                <WeeklyCalendar suggestions={suggestions} onRefresh={fetchWeeklySuggestions} />
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}