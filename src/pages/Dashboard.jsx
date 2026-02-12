import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { API_BASE_URL } from "../config/api";
import Carousel from "../components/Carousel";
import UploadButton from "../components/UploadButton";
import UploadModal from "../components/UploadModal";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  
  const [outfits, setOutfits] = useState([]);
  const [displayedOutfits, setDisplayedOutfits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterStyle, setFilterStyle] = useState("");
  const [sortValue, setSortValue] = useState("recent");

  useEffect(() => {
    if (user) {
      fetchOutfits();
    }
  }, [user]);

  const fetchOutfits = async () => {
    try {
      setLoading(true);
      setError("");
      setIsSearching(false);
      setSearchQuery("");
      setFilterStyle("");
      setSortValue("recent");
      const firebaseAuth = getAuth();
      const currentUser = (firebaseAuth && firebaseAuth.currentUser) || user;
      if (!currentUser) {
        console.warn("fetchOutfits: no authenticated user found, aborting request");
        setError("You must be signed in to view outfits.");
        setLoading(false);
        return;
      }

      const uid = currentUser.uid;
      const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");
      const url = `${baseUrl}/api/outfits?user_id=${encodeURIComponent(uid)}`;
      console.debug("fetchOutfits: requesting", url);

      const response = await fetch(url);
      if (!response.ok) {
        const body = await response.text().catch(() => null);
        console.error("fetchOutfits: non-OK response", response.status, body);
        setError("Failed to load outfits. Server returned an error.");
        return;
      }

      const data = await response.json();
      const outfitList = data.data || [];
      console.debug("fetchOutfits: received outfits count=", outfitList.length);
      setOutfits(outfitList);
      setDisplayedOutfits(outfitList);
    } catch (error) {
      console.error("Error fetching outfits:", error);
      setError("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = (outfitsList, searchQ, styleFilter, sort) => {
    let filtered = outfitsList;

    // Apply style filter
    if (styleFilter) {
      filtered = filtered.filter(outfit =>
        outfit.tags && outfit.tags.some(tag =>
          tag.toLowerCase().includes(styleFilter.toLowerCase())
        )
      );
    }

    // Apply sort
    if (sort === "oldest") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "recent") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "popular") {
      filtered.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    return filtered;
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchQuery("");
      const sorted = applyFiltersAndSort(outfits, "", filterStyle, sortValue);
      setDisplayedOutfits(sorted);
      return;
    }

    try {
      setSearching(true);
      setError("");
      setSearchQuery(query);

      const firebaseAuth = getAuth();
      const currentUser = (firebaseAuth && firebaseAuth.currentUser) || user;
      if (!currentUser) {
        console.warn("handleSearch: no authenticated user found, aborting search");
        setError("You must be signed in to search outfits.");
        setSearching(false);
        setDisplayedOutfits([]);
        return;
      }

      const uid = currentUser.uid;
      const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");
      const url = `${baseUrl}/api/search?user_id=${encodeURIComponent(uid)}&q=${encodeURIComponent(query)}`;
      console.debug("handleSearch: requesting", url);

      const response = await fetch(url);
      if (!response.ok) {
        const body = await response.text().catch(() => null);
        console.error("handleSearch: non-OK response", response.status, body);
        setError("Failed to search outfits. Server returned an error.");
        setDisplayedOutfits([]);
        return;
      }

      const data = await response.json();
      const sorted = applyFiltersAndSort(data.data || [], query, filterStyle, sortValue);
      setDisplayedOutfits(sorted);
      setIsSearching(true);
    } catch (error) {
      console.error("Error searching outfits:", error);
      setError("Unable to search. Please check your connection.");
      setDisplayedOutfits([]);
    } finally {
      setSearching(false);
    }
  };

  const handleFilterChange = (style) => {
    setFilterStyle(style);
    const baseOutfits = isSearching ? displayedOutfits : outfits;
    const sorted = applyFiltersAndSort(baseOutfits, searchQuery, style, sortValue);
    setDisplayedOutfits(sorted);
  };

  const handleSortChange = (sort) => {
    setSortValue(sort);
    const sorted = applyFiltersAndSort(displayedOutfits, searchQuery, filterStyle, sort);
    setDisplayedOutfits(sorted);
  };

  const handleReset = () => {
    setIsSearching(false);
    setDisplayedOutfits(outfits);
    setSearchQuery("");
    setFilterStyle("");
    setSortValue("recent");
    setError("");
  };

  const handleUploadSuccess = (newOutfit) => {
    setOutfits([newOutfit, ...outfits]);
    if (!isSearching && !filterStyle) {
      setDisplayedOutfits([newOutfit, ...displayedOutfits]);
    }
  };

  const handleOutfitDeleted = (deletedOutfitId) => {
    const updatedOutfits = outfits.filter(outfit => outfit.id !== deletedOutfitId);
    setOutfits(updatedOutfits);
    setDisplayedOutfits(displayedOutfits.filter(outfit => outfit.id !== deletedOutfitId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50">
      {/* Decorative elements */}
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
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-stone-400"></div>
                  <span className="text-xs uppercase tracking-[0.4em] text-stone-600 font-light">
                    Dashboard
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-stone-900 tracking-tight">
                  Your Wardrobe
                </h1>
                
                <p className="text-lg text-stone-600 font-light max-w-xl leading-relaxed">
                  View, organize, and discover what works for you
                </p>
              </div>

              <div>
                <UploadButton onUploadClick={() => setIsModalOpen(true)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        
        {/* Weekly Plan Card */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/recommendations/weekly")}
            className="group w-full relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-amber-500/15 to-amber-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Card */}
            <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  {/* Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-lg"></div>
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shadow-md">
                      <svg className="w-7 h-7 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="text-left">
                    <h3 className="text-xl font-light text-stone-900 mb-1">Weekly Outfit Plan</h3>
                    <p className="text-sm text-stone-600 font-light">Get AI-generated suggestions for every day</p>
                  </div>
                </div>
                
                {/* Arrow */}
                <svg className="w-6 h-6 text-amber-700 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onReset={handleReset}
          />
        </div>

        {isSearching && (
          <div className="mb-6 p-4 bg-amber-50/50 border border-amber-200/60 rounded-lg">
            <p className="text-sm text-amber-900 font-light">
              Showing search results for: <span className="font-normal">"{searchQuery}"</span>
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-12 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-rose-400/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-900">Error loading outfits</p>
                      <p className="text-sm text-stone-600 font-light mt-0.5">{error}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={fetchOutfits}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-light rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-4 border-stone-200/50"></div>
                <svg
                  className="animate-spin h-16 w-16 text-stone-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <p className="text-sm text-stone-600 font-light uppercase tracking-[0.3em]">Loading wardrobe</p>
            </div>
          </div>
        ) : searching ? (
          <div className="flex justify-center items-center py-32">
            <div className="flex flex-col items-center gap-6">
              <svg
                className="animate-spin h-8 w-8 text-amber-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-sm text-stone-500 font-light uppercase tracking-[0.2em]">Searching</p>
            </div>
          </div>
        ) : displayedOutfits.length === 0 ? (
          <div className="py-32">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-br from-stone-300/20 to-amber-300/10 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl shadow-2xl p-16">
                <div className="text-center space-y-8">
                  {/* Icon */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-stone-300/30 rounded-full blur-2xl"></div>
                    <div className="relative w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl font-light text-stone-900 tracking-tight">
                      {isSearching ? "No results found" : "Nothing here yet"}
                    </h2>
                    <p className="text-base text-stone-600 font-light leading-relaxed max-w-md mx-auto">
                      {isSearching 
                        ? "Try adjusting your search terms or filters" 
                        : "Upload your first outfit to begin building your style collection"
                      }
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-4 py-4">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent to-stone-300"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                    <div className="w-20 h-px bg-gradient-to-l from-transparent to-stone-300"></div>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 text-white px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-sm uppercase tracking-[0.25em] font-light">Upload First Outfit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Carousel
            items={displayedOutfits}
            showArrows={true}
            renderItem={(outfit) => (
              <div
                onClick={() => navigate(`/outfits/${outfit.id}`)}
                className="group cursor-pointer h-full"
              >
                <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 hover:scale-105 flex flex-col h-full">
                  {/* Image Container - 4:5 aspect ratio */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50 aspect-[4/5] flex-shrink-0">
                    {outfit.image_url || outfit.image ? (
                      <>
                        <img
                          src={outfit.image_url || outfit.image}
                          alt={outfit.name || "Outfit"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
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
                      <div className="flex flex-wrap gap-1.5">
                        {outfit.tags.slice(0, 2).map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="bg-white/80 backdrop-blur-sm text-stone-700 text-xs font-light px-2.5 py-1 border border-white/80 rounded-full shadow-sm"
                          >
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        )}
      </div>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <Footer />
    </div>
  );
}
