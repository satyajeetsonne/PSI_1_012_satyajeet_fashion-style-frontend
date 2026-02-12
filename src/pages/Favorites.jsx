import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { API_BASE_URL } from "../config/api";
import { getAuth } from "firebase/auth";
import Carousel from "../components/Carousel";
import { API_BASE_URL } from "../config/api";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";

export default function Favorites() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  
  const [favorites, setFavorites] = useState([]);
  const [displayedFavorites, setDisplayedFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterStyle, setFilterStyle] = useState("");
  const [sortValue, setSortValue] = useState("recent");

  /* ────── Fetch favorites ────── */
  const fetchFavorites = async () => {
    try {
      setError("");
      setLoading(true);
      setIsSearching(false);
      setSearchQuery("");
      setFilterStyle("");
      setSortValue("recent");
      const firebaseAuth = getAuth();
      const currentUser = (firebaseAuth && firebaseAuth.currentUser) || user;
      if (!currentUser) {
        console.warn("fetchFavorites: no authenticated user, aborting");
        setError("You must be signed in to view favorites.");
        setLoading(false);
        return;
      }

      const uid = currentUser.uid;
      const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");
      const url = `${baseUrl}/api/outfits/favorites?user_id=${encodeURIComponent(uid)}`;
      console.debug("fetchFavorites: requesting", url);

      const response = await fetch(url);
      if (!response.ok) {
        const body = await response.text().catch(() => null);
        console.error("fetchFavorites: non-OK", response.status, body);
        setError("Failed to load favorites. Please try again.");
        return;
      }

      const data = await response.json();
      const favoritesList = data.data || [];
      setFavorites(favoritesList);
      setDisplayedFavorites(favoritesList);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server.");
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
      // Sort by name alphabetically as "popular" proxy
      filtered.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    return filtered;
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchQuery("");
      const sorted = applyFiltersAndSort(favorites, "", filterStyle, sortValue);
      setDisplayedFavorites(sorted);
      return;
    }

    try {
      setSearching(true);
      setError("");
      setSearchQuery(query);
      const firebaseAuth = getAuth();
      const currentUser = (firebaseAuth && firebaseAuth.currentUser) || user;
      if (!currentUser) {
        console.warn("handleSearch (favorites): no authenticated user, aborting");
        setError("You must be signed in to search favorites.");
        setSearching(false);
        setDisplayedFavorites([]);
        return;
      }

      const uid = currentUser.uid;
      const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");
      const url = `${baseUrl}/api/search?user_id=${encodeURIComponent(uid)}&q=${encodeURIComponent(query)}`;
      console.debug("Favorites.handleSearch: requesting", url);

      const response = await fetch(url);
      if (!response.ok) {
        const body = await response.text().catch(() => null);
        console.error("Favorites.handleSearch: non-OK", response.status, body);
        setError("Failed to search favorites. Please try again.");
        setDisplayedFavorites([]);
        return;
      }

      const data = await response.json();
      // Filter search results to only include favorited outfits
      const favoriteIds = new Set(favorites.map(f => f.id));
      const filteredResults = (data.data || []).filter(outfit => favoriteIds.has(outfit.id));
      const sorted = applyFiltersAndSort(filteredResults, query, filterStyle, sortValue);
      setDisplayedFavorites(sorted);
      setIsSearching(true);
    } catch (error) {
      console.error("Error searching favorites:", error);
      setError("Unable to search. Please check your connection.");
      setDisplayedFavorites([]);
    } finally {
      setSearching(false);
    }
  };

  const handleFilterChange = (style) => {
    setFilterStyle(style);
    const baseFavorites = isSearching ? displayedFavorites : favorites;
    const sorted = applyFiltersAndSort(baseFavorites, searchQuery, style, sortValue);
    setDisplayedFavorites(sorted);
  };

  const handleSortChange = (sort) => {
    setSortValue(sort);
    const sorted = applyFiltersAndSort(displayedFavorites, searchQuery, filterStyle, sort);
    setDisplayedFavorites(sorted);
  };

  const handleReset = () => {
    setIsSearching(false);
    setDisplayedFavorites(favorites);
    setSearchQuery("");
    setFilterStyle("");
    setSortValue("recent");
    setError("");
  };

  useEffect(() => {
    if (user) fetchFavorites();
  }, [user]);

  /* ────── Empty state component ────── */
  const EmptyState = () => (
    <div className="py-20">
      <div className="max-w-xl mx-auto">
        <div className="bg-white border border-stone-200/50 p-12 text-center space-y-8 rounded-lg shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-50 border border-stone-200 rounded-md">
            <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-light text-stone-900 tracking-tight">
              No favorites yet
            </h3>
            <p className="text-sm text-stone-600 font-light leading-relaxed max-w-md mx-auto">
              Start building your collection by marking outfits as favorites. Your curated selections will appear here for easy access.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-3 px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 transition-colors duration-300 text-sm uppercase tracking-[0.2em] font-normal rounded-md shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Browse Wardrobe</span>
          </button>
        </div>
      </div>
    </div>
  );

  /* ────── Error state component ────── */
  const ErrorState = () => (
    <div className="py-20">
      <div className="max-w-xl mx-auto">
        <div className="bg-white border border-stone-200/50 p-12 text-center space-y-6 rounded-lg shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-50 border border-stone-200 rounded-md">
            <svg className="w-8 h-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-normal text-stone-900 tracking-tight">
              Something went wrong
            </h3>
            <p className="text-sm text-stone-600 font-normal leading-relaxed max-w-md mx-auto">
              {error}
            </p>
          </div>

          <button
            onClick={fetchFavorites}
            className="inline-flex items-center gap-3 px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 transition-colors duration-300 text-sm uppercase tracking-[0.2em] font-normal rounded-md shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );

  /* ────── Render ────── */
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="absolute top-40 right-20 w-32 h-32 border border-stone-200/40 -rotate-12 pointer-events-none"></div>
      <div className="absolute top-96 left-20 w-24 h-24 border border-stone-200/20 rotate-45 pointer-events-none"></div>

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
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-stone-400"></div>
                  <span className="text-xs uppercase tracking-[0.4em] text-stone-600 font-light">
                    Collection
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-stone-900 tracking-tight">
                  My Favorites
                </h1>

                <p className="text-lg text-stone-600 font-light max-w-xl leading-relaxed mt-2">
                  The looks you love, beautifully kept.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white border border-stone-200/40 rounded-lg shadow-sm">
                <svg className="w-4 h-4 text-stone-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <span className="text-sm text-stone-700 font-semibold">
                  {loading ? "—" : favorites.length}
                </span>
                <span className="text-xs text-stone-500 font-normal">
                  {favorites.length === 1 ? "outfit" : "outfits"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Search Bar */}
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

        {error ? (
          <ErrorState />
        ) : displayedFavorites.length === 0 && !loading && !searching ? (
          isSearching ? (
            <div className="py-32 text-center">
              <div className="max-w-md mx-auto space-y-8">
                <div className="relative">
                  <span className="text-9xl font-light text-stone-200 select-none">0</span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-normal text-stone-900">
                    No results found
                  </h2>
                  <p className="text-base text-stone-600 font-light leading-relaxed">
                    Try adjusting your search terms or browse your full wardrobe
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="w-16 h-px bg-stone-300"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                  <div className="w-16 h-px bg-stone-300"></div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState />
          )
        ) : (
          <div>
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
                  <p className="text-xs text-stone-500 font-normal uppercase tracking-[0.25em]">Loading favorites</p>
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
            ) : (
              <Carousel
                items={displayedFavorites}
                showArrows={true}
                renderItem={(outfit) => (
                  <div
                    onClick={() => navigate(`/outfits/${outfit.id}`)}
                    className="group cursor-pointer h-full"
                  >
                    <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 hover:scale-105 flex flex-col h-full">
                      {/* Image Container - 4:5 aspect ratio */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50 aspect-[4/5] flex-shrink-0">
                              {(() => {
                                const rawImage = outfit.image_url || outfit.image;
                                const baseUrl = String(API_BASE_URL).replace(/\/+$/g, "");
                                const placeholder = "/images/placeholder.png";
                                let imageSrc = rawImage;
                                if (!imageSrc) imageSrc = placeholder;
                                else if (imageSrc.startsWith("/")) imageSrc = `${baseUrl}${imageSrc}`;
                                else if (!/^https?:\/\//i.test(imageSrc) && !imageSrc.startsWith("data:")) imageSrc = `${baseUrl}/${imageSrc}`;

                                if (imageSrc) {
                                  return (
                                    <>
                                      <img
                                        src={imageSrc}
                                        alt={outfit.name || "Outfit"}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent"></div>
                                    </>
                                  );
                                }

                                return (
                                  <div className="w-full h-full flex flex-col items-center justify-center p-8">
                                    <div className="bg-white/70 backdrop-blur-md border-2 border-white rounded-full p-8 mb-4 shadow-lg">
                                      <svg className="w-16 h-16 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                    <p className="text-stone-500 text-sm font-light uppercase tracking-[0.25em]">No Image</p>
                                  </div>
                                );
                              })()}
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
        )}
      </div>

      <Footer />
    </div>
  );
}
