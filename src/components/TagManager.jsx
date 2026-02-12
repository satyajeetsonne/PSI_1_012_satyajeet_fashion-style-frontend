import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

export default function TagManager({ outfitId, userId }) {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [mutating, setMutating] = useState(false);

  // Fetch tags on mount
  useEffect(() => {
    if (outfitId && userId) {
      fetchTags();
    }
  }, [outfitId, userId]);

  const fetchTags = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `${API_BASE_URL}/api/outfits/${outfitId}/tags?user_id=${userId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch tags");
      }
      const data = await res.json();
      setTags(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load tags");
      setTags([]);
    } finally {
      setLoading(false);
    }
  };

  // Validate tag input
  const validateTag = (tag) => {
    tag = tag.trim();
    if (!tag) return "Tag cannot be empty";
    if (tag.length > 30) return "Tag must be 30 characters or less";
    if (tags.some(t => t === tag.toLowerCase())) return "Tag already exists";
    if (tags.length >= 15) return "Maximum 15 tags per outfit";
    return null;
  };

  // Add tag
  const handleAdd = async (e) => {
    e.preventDefault();
    const validation = validateTag(input);
    if (validation) {
      setError(validation);
      return;
    }

    const tagToAdd = input.trim().toLowerCase();
    const previousTags = tags;
    
    // Optimistic update
    setTags([...tags, tagToAdd]);
    setInput("");
    setMutating(true);
    setError("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/outfits/${outfitId}/tags?user_id=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tag: tagToAdd }),
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || "Failed to add tag");
      }
      const data = await res.json();
      setTags(Array.isArray(data.data) ? data.data : previousTags);
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not add tag");
      setTags(previousTags);
    } finally {
      setMutating(false);
    }
  };

  // Remove tag
  const handleRemove = async (tag) => {
    const previousTags = tags;
    setTags(tags.filter(t => t !== tag));
    setMutating(true);
    setError("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/outfits/${outfitId}/tags/${encodeURIComponent(tag)}?user_id=${userId}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || "Failed to remove tag");
      }
      const data = await res.json();
      setTags(Array.isArray(data.data) ? data.data : previousTags.filter(t => t !== tag));
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not remove tag");
      setTags(previousTags);
    } finally {
      setMutating(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <h4 
          className="text-sm font-normal text-stone-700 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Tags
        </h4>
        {tags.length > 0 && (
          <span className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-full px-3 py-1 text-xs text-stone-500 font-light shadow-sm">
            {tags.length}
          </span>
        )}
        <div className="flex-1 h-px bg-gradient-to-r from-stone-200/60 to-transparent"></div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-4">
          <svg className="w-4 h-4 animate-spin text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-stone-500 font-light">Loading tags…</p>
        </div>
      ) : (
        <>
          {/* Display existing tags */}
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag, index) => (
                <div 
                  key={tag}
                  className="group relative"
                  style={{ animation: `fadeIn 0.3s ease ${index * 0.05}s both` }}
                >
                  {/* Subtle hover glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-stone-400/10 to-amber-400/8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  
                  {/* Tag pill */}
                  <span className="relative inline-flex items-center gap-2.5 bg-white/70 backdrop-blur-sm text-stone-700 text-xs font-light px-4 py-2 rounded-full border border-white/80 shadow-sm group-hover:shadow-md group-hover:border-stone-300/60 transition-all duration-300">
                    <span className="text-stone-600">
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </span>
                    <button
                      type="button"
                      disabled={mutating}
                      onClick={() => handleRemove(tag)}
                      className="text-stone-400 hover:text-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Remove ${tag} tag`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative py-6">
              <div className="absolute -inset-1 bg-gradient-to-br from-stone-400/5 to-transparent rounded-2xl blur-lg"></div>
              <div className="relative bg-white/50 backdrop-blur-sm border border-white/70 rounded-2xl p-5 text-center">
                <div className="inline-flex items-center gap-2.5 text-stone-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h.008v.008H6V6z" />
                  </svg>
                  <span className="text-sm font-light">Add tags to organize your outfit</span>
                </div>
              </div>
            </div>
          )}

          {/* Add tag form */}
          <form onSubmit={handleAdd} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-stone-400/8 to-amber-400/6 rounded-2xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 blur-md"></div>
            
            <div className="relative flex gap-3">
              {/* Input field */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Add a tag (e.g., Casual, Summer)"
                  disabled={mutating}
                  maxLength={30}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-sm font-light text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-300/80 focus:bg-white/80 transition-all duration-300 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                />
                {input.length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-light">
                    {input.length}/30
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={mutating || !input.trim()}
                className="group relative px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-light rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-stone-900"
              >
                {mutating ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Saving</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add</span>
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Error message */}
          {error && (
            <div 
              className="relative"
              style={{ animation: 'fadeIn 0.2s ease both' }}
            >
              <div className="absolute -inset-1 bg-red-500/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-red-50/80 backdrop-blur-sm border border-red-200/60 rounded-2xl px-4 py-3 flex items-start gap-3">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700 font-light">{error}</p>
              </div>
            </div>
          )}

          {/* Helper text */}
          <div className="flex items-center gap-2 pt-1">
            <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-stone-500 font-light">
              Up to 15 tags, 30 characters each
            </p>
          </div>
        </>
      )}

      {/* Playfair Display font + animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}