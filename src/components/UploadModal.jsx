import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { API_BASE_URL } from "../config/api";

export default function UploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [user] = useAuthState(auth);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please select a valid image file (JPG, PNG, GIF, WebP)");
      return;
    }

    // Validate file size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    setError("");

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !user) return;

    setLoading(true);
    setError("");
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.uid);
      formData.append("name", name || file.name);
      formData.append("tags", tags);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 30;
        });
      }, 200);

      const response = await fetch(`${API_BASE_URL}/api/outfits`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }

      const data = await response.json();
      setSuccess(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        handleClose();
        onUploadSuccess?.(data.data);
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to upload outfit");
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleClose = () => {
    if (loading) return; // Prevent closing while uploading
    setFile(null);
    setPreview(null);
    setName("");
    setTags("");
    setError("");
    setUploadProgress(0);
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-stone-900/70 backdrop-blur-lg flex items-center justify-center z-50 px-4 sm:px-6 animate-fadeIn"
      onClick={handleClose}
    >
      <div 
        className="relative bg-stone-50/95 backdrop-blur-2xl border border-white/90 max-w-3xl w-full rounded-3xl shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
        
        <div className="relative p-6 sm:p-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
                Add to wardrobe
              </h2>
              <p className="text-sm text-stone-600 font-light">
                Upload an outfit image to get AI-powered style insights
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2.5 text-stone-400 hover:text-stone-900 transition-colors rounded-xl hover:bg-white/60 backdrop-blur-sm"
              disabled={loading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/15 backdrop-blur-md border border-green-400/50 rounded-2xl shadow-lg animate-slideDown">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-green-800 font-light">
                  Upload successful! Redirecting to your wardrobe...
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/15 backdrop-blur-md border border-red-400/50 rounded-2xl shadow-lg animate-slideDown">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-red-800 font-light">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {preview && (
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-br from-stone-400/20 to-amber-600/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative border-4 border-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl" style={{width: '320px', height: '400px'}}>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Area */}
          {!preview && (
            <div className="mb-8">
              <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-stone-300/60 rounded-3xl cursor-pointer hover:border-stone-400/80 transition-all duration-300 group bg-white/40 backdrop-blur-sm hover:bg-white/60 shadow-lg hover:shadow-xl" style={{minHeight: '400px'}}>
                <div className="flex flex-col items-center justify-center space-y-6 p-12">
                  {/* Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-900/5 to-amber-600/5 rounded-full blur-2xl"></div>
                    <div className="relative bg-white/80 backdrop-blur-md border-2 border-white rounded-full p-8 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                      <svg
                        className="w-16 h-16 text-stone-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-8"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-lg text-stone-800 font-normal">
                      Click to select an image
                    </p>
                    <p className="text-sm text-stone-500 font-light">
                      or drag and drop here
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <div className="w-8 h-px bg-stone-300"></div>
                      <p className="text-xs text-stone-400 font-light">JPG, PNG, GIF, WebP (Max 10MB)</p>
                      <div className="w-8 h-px bg-stone-300"></div>
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={loading}
                />
              </label>
            </div>
          )}

          {/* Form Fields */}
          {preview && (
            <div className="space-y-6 mb-8">
              {/* Outfit Name */}
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-stone-600 mb-3 font-light">
                  Outfit Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Summer Casual"
                  className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border-2 border-white/80 rounded-2xl transition-all duration-300 focus:outline-none font-light hover:border-white focus:border-stone-400 focus:bg-white/80 shadow-lg text-stone-900 placeholder:text-stone-400"
                  disabled={loading}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-stone-600 mb-3 font-light">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., casual, summer, comfortable"
                  className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border-2 border-white/80 rounded-2xl transition-all duration-300 focus:outline-none font-light hover:border-white focus:border-stone-400 focus:bg-white/80 shadow-lg text-stone-900 placeholder:text-stone-400"
                  disabled={loading}
                />
                <p className="mt-2 text-xs text-stone-500 font-light">
                  Add tags to help organize and find your outfits
                </p>
              </div>

              {/* Upload Progress */}
              {loading && (
                <div className="bg-white/70 backdrop-blur-md border-2 border-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-stone-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-xs uppercase tracking-[0.25em] text-stone-700 font-light">
                        Uploading to wardrobe
                      </p>
                    </div>
                    <span className="text-base text-stone-700 font-normal tabular-nums">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-200/70 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-700 h-2.5 transition-all duration-300 rounded-full shadow-lg"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          {preview ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setName("");
                  setTags("");
                }}
                className="flex-1 py-4 bg-white/70 backdrop-blur-md border-2 border-white rounded-2xl text-stone-700 font-light text-sm uppercase tracking-[0.25em] hover:bg-white transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                Change Image
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 py-4 bg-stone-900 backdrop-blur-md border-2 border-stone-900 rounded-2xl text-white font-light text-sm uppercase tracking-[0.25em] hover:bg-stone-800 transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                disabled={loading || success}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Upload Outfit"
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={handleClose}
              className="w-full py-4 bg-white/70 backdrop-blur-md border-2 border-white rounded-2xl text-stone-700 font-light text-sm uppercase tracking-[0.25em] hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}