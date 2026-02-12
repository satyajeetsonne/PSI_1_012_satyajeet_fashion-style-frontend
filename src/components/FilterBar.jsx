import { useState } from "react";

export default function FilterBar({ onSearch, onFilterChange, onSortChange, onReset }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStyle, setFilterStyle] = useState("");
  const [sortValue, setSortValue] = useState("recent");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterStyle(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortValue(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilterStyle("");
    setSortValue("recent");
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="relative group">
      {/* Outer glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-stone-400/20 to-amber-400/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Main container */}
      <div className="relative bg-white/70 backdrop-blur-xl border-2 border-white rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative p-5 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            
            {/* Search Input */}
            <div className="flex-1 relative group/search">
              <div className="absolute inset-0 bg-white/50 rounded-xl blur opacity-0 group-hover/search:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center">
                <svg className="absolute left-4 w-5 h-5 text-stone-400 group-focus-within/search:text-stone-600 transition-colors z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search your wardrobe..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  className="relative w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-md border-2 border-white hover:bg-white/80 focus:bg-white/90 focus:border-stone-300 focus:outline-none rounded-xl transition-all duration-300 font-light placeholder:text-stone-400 text-stone-900 shadow-md"
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="relative min-w-[180px] group/filter">
              <div className="absolute inset-0 bg-white/50 rounded-xl blur opacity-0 group-hover/filter:opacity-100 transition-opacity"></div>
              <div className="relative">
                <select 
                  value={filterStyle}
                  onChange={handleFilterChange}
                  className="relative appearance-none w-full pl-4 pr-11 py-3 bg-white/60 backdrop-blur-md border-2 border-white hover:bg-white/80 focus:bg-white/90 focus:border-stone-300 focus:outline-none rounded-xl font-light text-stone-900 cursor-pointer transition-all duration-300 text-sm shadow-md"
                >
                  <option value="">All Styles</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="sport">Sport</option>
                  <option value="party">Party</option>
                  <option value="business">Business</option>
                  <option value="streetwear">Streetwear</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[180px] group/sort">
              <div className="absolute inset-0 bg-white/50 rounded-xl blur opacity-0 group-hover/sort:opacity-100 transition-opacity"></div>
              <div className="relative">
                <select 
                  value={sortValue}
                  onChange={handleSortChange}
                  className="relative appearance-none w-full pl-4 pr-11 py-3 bg-white/60 backdrop-blur-md border-2 border-white hover:bg-white/80 focus:bg-white/90 focus:border-stone-300 focus:outline-none rounded-xl font-light text-stone-900 cursor-pointer transition-all duration-300 text-sm shadow-md"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  {/* <option value="name">Alphabetical</option>
                  <option value="favorites">Favorites</option> */}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 lg:gap-3">
              {/* Search Button */}
              <button 
                onClick={handleSearchSubmit}
                className="relative group/btn flex-1 lg:flex-none px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-light whitespace-nowrap">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="hidden sm:inline">Search</span>
                </span>
              </button>

              {/* Reset Button */}
              <button 
                onClick={handleReset}
                className="relative group/btn flex-1 lg:flex-none px-5 py-3 bg-white/60 backdrop-blur-md border-2 border-white hover:bg-white/80 text-stone-700 hover:text-stone-900 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <span className="relative flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-light whitespace-nowrap">
                  <svg className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">Reset</span>
                </span>
              </button>
            </div>
          </div>

          {/* Active Filters Indicator */}
          {(searchQuery || filterStyle || sortValue !== "recent") && (
            <div className="mt-4 pt-4 border-t-2 border-white/80">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-light">
                  Active Filters:
                </span>
                
                {searchQuery && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full">
                    <span className="text-xs text-stone-700 font-light">Search: {searchQuery}</span>
                    <button 
                      onClick={() => {
                        setSearchQuery("");
                        if (onSearch) onSearch("");
                      }}
                      className="w-4 h-4 rounded-full bg-stone-300 hover:bg-stone-400 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {filterStyle && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full">
                    <span className="text-xs text-stone-700 font-light capitalize">{filterStyle}</span>
                    <button 
                      onClick={() => {
                        setFilterStyle("");
                        if (onFilterChange) onFilterChange("");
                      }}
                      className="w-4 h-4 rounded-full bg-stone-300 hover:bg-stone-400 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {sortValue !== "recent" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full">
                    <span className="text-xs text-stone-700 font-light">
                      {sortValue === "oldest" && "Oldest First"}
                      {sortValue === "name" && "A-Z"}
                      {sortValue === "favorites" && "Favorites"}
                    </span>
                    <button 
                      onClick={() => {
                        setSortValue("recent");
                        if (onSortChange) onSortChange("recent");
                      }}
                      className="w-4 h-4 rounded-full bg-stone-300 hover:bg-stone-400 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}