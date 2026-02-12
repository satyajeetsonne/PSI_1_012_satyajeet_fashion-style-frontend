import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { API_BASE_URL } from "../config/api";
import { getAuth } from "firebase/auth";
import ImageViewer from "../components/ImageViewer";
import AnalysisView from "../components/AnalysisView";
import MatchingSuggestions from "../components/MatchingSuggestions";
import TagManager from "../components/TagManager";
import Footer from "../components/Footer";
import { normalizeImageUrl } from "../utils/imageUtils";

export default function OutfitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [showFavoriteAnimation, setShowFavoriteAnimation] = useState(false);

  /* ────── Fetch outfit details ────── */
  const fetchOutfitDetails = useCallback(async () => {
    try {
      setError("");
      const firebaseAuth = getAuth();
      const currentUser = (firebaseAuth && firebaseAuth.currentUser) || user;
      if (!currentUser) {
        console.warn("fetchOutfitDetails: no authenticated user, aborting");
        setError("You must be signed in to view this outfit");
        setLoading(false);
        return;
      }

      const uid = currentUser.uid;
      const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");
      const url = `${baseUrl}/api/outfits/${id}?user_id=${encodeURIComponent(uid)}`;
      console.debug("fetchOutfitDetails: requesting", url);

      const response = await fetch(url);
      
      if (response.status === 404) {
        setError("Outfit not found");
        return;
      }
      if (response.status === 403) {
        setError("You don't have permission to view this outfit");
        return;
      }
      if (!response.ok) {
        setError("Failed to load outfit details. Please try again.");
        return;
      }
      
      const data = await response.json();
      const outfitData = data.data || null;
      if (outfitData) {
        outfitData.image_url = normalizeImageUrl(outfitData.image_url || outfitData.image);
      }
      setOutfit(outfitData);
      setIsFavorite((outfitData && outfitData.is_favorite) || false);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }, [id, user?.uid]);

  useEffect(() => {
    if (user && id) fetchOutfitDetails();
  }, [user, id, fetchOutfitDetails]);

  /* ────── Polling for pending analysis ────── */
  useEffect(() => {
    if (outfit?.analysis_status !== "pending") return;
    const interval = setInterval(fetchOutfitDetails, 2000);
    return () => clearInterval(interval);
  }, [outfit?.analysis_status, fetchOutfitDetails]);

  /* ────── Status badge component ────── */
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        bg: "bg-amber-50/80",
        border: "border-amber-300/60",
        text: "text-amber-700",
        dot: "bg-amber-500",
        pulse: true,
        label: "Analyzing"
      },
      completed: {
        bg: "bg-emerald-50/80",
        border: "border-emerald-300/60",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
        pulse: false,
        label: "Complete"
      },
      failed: {
        bg: "bg-red-50/80",
        border: "border-red-300/60",
        text: "text-red-700",
        dot: "bg-red-500",
        pulse: false,
        label: "Failed"
      }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full backdrop-blur-md border-2 shadow-lg ${config.bg} ${config.border}`}>
        <span className={`w-2 h-2 rounded-full ${config.dot} ${config.pulse ? 'animate-pulse' : ''}`}></span>
        <span className={`text-xs font-light uppercase tracking-[0.25em] ${config.text}`}>
          {config.label}
        </span>
      </div>
    );
  };

  /* ────── Delete handler ────── */
  const handleDeleteConfirm = async () => {
    try {
      setDeleteError("");
      setIsDeleting(true);
      const firebaseAuth = getAuth();
      const currentUser = (firebaseAuth && firebaseAuth.currentUser) || user;
      if (!currentUser) {
        setDeleteError("You must be signed in to delete outfits.");
        return;
      }

      const uid = currentUser.uid;
      const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");
      const url = `${baseUrl}/api/outfits/${id}?user_id=${encodeURIComponent(uid)}`;
      console.debug("handleDeleteConfirm: requesting", url);

      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) {
        const body = await response.text().catch(() => null);
        console.error("handleDeleteConfirm: non-OK", response.status, body);
        setDeleteError("Failed to delete outfit.");
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setDeleteError("Unable to connect to server.");
    } finally {
      setIsDeleting(false);
    }
  };

  /* ────── Favorite toggle handler ────── */
  const handleToggleFavorite = async () => {
    try {
      setIsTogglingFavorite(true);
      const firebaseAuth = getAuth();
      const currentUser = (firebaseAuth && firebaseAuth.currentUser) || user;
      if (!currentUser) {
        console.warn("handleToggleFavorite: no user");
        return;
      }

      const uid = currentUser.uid;
      const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");
      const method = isFavorite ? "DELETE" : "POST";
      const url = `${baseUrl}/api/outfits/${id}/favorite?user_id=${encodeURIComponent(uid)}`;
      console.debug("handleToggleFavorite: requesting", url, "method", method);

      const response = await fetch(url, { method });
      if (!response.ok) {
        const body = await response.text().catch(() => null);
        console.error("handleToggleFavorite: non-OK", response.status, body);
        return;
      }

      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);
      if (newFavoriteState) {
        setShowFavoriteAnimation(true);
        setTimeout(() => setShowFavoriteAnimation(false), 1000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  /* ────── Loading state ────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50">
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-stone-300/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mb-12">
          <div className="relative h-80 lg:h-96 overflow-hidden">
            <div className="w-full h-full bg-stone-200 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/50 to-stone-900/70"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative -mt-32">
            <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <div className="space-y-6">
                <div className="w-32 h-10 bg-white/70 rounded-xl animate-pulse"></div>
                <div className="w-80 h-12 bg-white/80 rounded-2xl animate-pulse"></div>
                <div className="w-48 h-8 bg-white/60 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl p-6 shadow-lg">
                <div className="aspect-square bg-stone-100 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl p-8 shadow-lg">
                <div className="space-y-4">
                  <div className="w-40 h-6 bg-stone-200 rounded-full animate-pulse"></div>
                  <div className="w-full h-4 bg-stone-100 rounded-full animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-stone-100 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ────── Error state ────── */
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50">
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-stone-300/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center px-6">
          <div className="max-w-lg w-full">
            <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-400/20 rounded-full blur-xl"></div>
                    <div className="relative bg-red-50/90 border-2 border-red-200/70 rounded-full p-5 shadow-lg">
                      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-light text-stone-900">Something went wrong</h2>
                  <p className="text-stone-600 font-light">{error}</p>
                </div>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl transition-all duration-300 text-sm uppercase tracking-[0.2em] font-light"
                >
                  Back to Wardrobe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!outfit) return null;

  /* ────── Main page ────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-stone-300/15 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
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
            <div className="flex justify-between items-center gap-4">
              <div className="min-w-0 flex-1 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-stone-400"></div>
                  <span className="text-xs uppercase tracking-[0.4em] text-stone-600 font-light">
                    Outfit Details
                  </span>
                </div>

                <h1 
                  className="text-4xl lg:text-5xl font-light text-stone-900 tracking-tight truncate"
                  title={outfit.name || "Untitled Outfit"}
                >
                  {outfit.name || "Untitled Outfit"}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <StatusBadge status={outfit.analysis_status} />
                  
                  {outfit.created_at && (
                    <>
                      <div className="w-px h-6 bg-stone-300"></div>
                      <div className="flex items-center gap-2 text-stone-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-light">
                          {new Date(outfit.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 shrink-0">
              {/* Favorite button */}
              <button
                onClick={handleToggleFavorite}
                disabled={isTogglingFavorite}
                className={`relative inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 ${
                  isFavorite
                    ? "border-rose-400/60 bg-rose-50/80 text-rose-700 hover:bg-rose-100/80"
                    : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                {showFavoriteAnimation && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          animation: `heartFloat 1s ease-out forwards`,
                          animationDelay: `${i * 0.1}s`,
                          transform: `rotate(${i * 60}deg)`
                        }}
                      >
                        <svg className="w-3 h-3 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                )}
                
                {isTogglingFavorite ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg 
                    className="w-4 h-4 transition-transform duration-300"
                    fill={isFavorite ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                )}
                
                <span className="text-xs uppercase tracking-[0.2em] font-light">
                  {isFavorite ? "Favorited" : "Favorite"}
                </span>
              </button>

              {/* Delete button */}
              <button
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-red-50/80 border-2 border-red-300/60 rounded-xl text-red-700 hover:bg-red-100/80 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="text-xs uppercase tracking-[0.2em] font-light">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column - Image & Tags */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Card */}
            <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl shadow-lg overflow-hidden">
              <div className="p-4">
                <ImageViewer imageUrl={outfit.image_url} outfitName={outfit.name} />
              </div>
            </div>

            {/* Tags Card */}
            <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl shadow-lg p-6">
              <TagManager outfitId={id} userId={user.uid} />
            </div>
          </div>

          {/* Right column - Analysis & Suggestions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Analysis Card */}
            <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl shadow-lg p-8">
              <AnalysisView analysis={outfit.analysis} status={outfit.analysis_status} />
            </div>

            {/* Matching Suggestions Card */}
            <div className="bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl shadow-lg p-8">
              <MatchingSuggestions outfitId={id} userId={user.uid} analysisStatus={outfit.analysis_status} />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-xl border-2 border-white rounded-3xl shadow-2xl p-10">
              <div className="space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-400/20 rounded-full blur-xl"></div>
                    <div className="relative bg-red-50/90 border-2 border-red-200/70 rounded-full p-5 shadow-lg">
                      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-light text-stone-900">Delete this outfit?</h3>
                  <p className="text-sm text-stone-600 font-light">This action is permanent and cannot be undone.</p>
                </div>

                {/* Error */}
                {deleteError && (
                  <div className="bg-red-50/90 border-2 border-red-200/70 rounded-xl px-5 py-3">
                    <p className="text-red-700 text-xs font-light text-center">{deleteError}</p>
                  </div>
                )}

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-400"></div>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-stone-300 to-transparent"></div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsDeleteConfirmOpen(false)}
                    className="flex-1 px-6 py-3.5 bg-white border-2 border-stone-300 rounded-xl text-stone-700 hover:bg-stone-50 transition-all duration-300 text-sm uppercase tracking-[0.2em] font-light"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={isDeleting}
                    className="flex-1 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 disabled:opacity-60 text-sm uppercase tracking-[0.2em] font-light"
                  >
                    {isDeleting ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Deleting...
                      </span>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes heartFloat {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-40px) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
}