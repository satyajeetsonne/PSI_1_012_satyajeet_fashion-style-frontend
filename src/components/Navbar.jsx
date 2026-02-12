import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-xl shadow-lg shadow-stone-900/5 border-b border-white/20' 
          : 'bg-white/60 backdrop-blur-md border-b border-white/10'
      }`}
    >
      {/* Glassmorphic overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-transparent pointer-events-none"></div>
      
      {/* Animated liquid blob effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-stone-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-16 right-1/3 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:shadow-xl shadow-amber-900/20 group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.414-2.414a1 1 0 00-.707-.293h-3.172a1 1 0 00-.707.293l-2.414 2.414A1 1 0 016.586 13H4a2 2 0 00-2 2v4a2 2 0 002 2z" />
                </svg>
                <div className="absolute inset-0 bg-amber-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </div>
              <span className="text-base font-light text-stone-900 tracking-wide transition-all duration-300 group-hover:text-amber-900">
                Fashion Style Recommender
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="relative text-stone-700 hover:text-amber-900 font-light transition-all duration-300 py-2 group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute inset-0 bg-amber-50/0 group-hover:bg-amber-50/50 rounded-lg transition-all duration-300 -z-10 blur-sm"></span>
                </Link>

                <Link
                  to="/favorites"
                  className="relative text-stone-700 hover:text-pink-700 font-light transition-all duration-300 py-2 group"
                >
                  Favorites
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute inset-0 bg-pink-50/0 group-hover:bg-pink-50/50 rounded-lg transition-all duration-300 -z-10 blur-sm"></span>
                </Link>
                <Link
                  to="/recommendations"
                  className="relative text-stone-700 hover:text-amber-700 font-light transition-all duration-300 py-2 group"
                >
                  Recommendations
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <div className="flex items-center gap-4 ml-4 pl-8 border-l border-stone-200/50">
                  <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-br from-white/80 to-amber-50/40 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg shadow-stone-900/5 hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-500 hover:scale-105">
                    <div className="relative w-9 h-9 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-full flex items-center justify-center shadow-lg shadow-amber-600/30">
                      <span className="text-white font-medium text-sm">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                    </div>
                    <div className="text-sm">
                      <p className="text-stone-900 font-normal">{user.email?.split('@')[0]}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="relative text-stone-600 hover:text-stone-900 font-light transition-all duration-300 group px-3 py-2"
                  >
                    Logout
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
                    <span className="absolute inset-0 bg-stone-50/0 group-hover:bg-stone-50/50 rounded-lg transition-all duration-300 -z-10 blur-sm"></span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="relative text-stone-700 hover:text-amber-900 font-light transition-all duration-300 py-2 group px-3"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute inset-0 bg-amber-50/0 group-hover:bg-amber-50/50 rounded-lg transition-all duration-300 -z-10 blur-sm"></span>
                </Link>
                <Link
                  to="/login"
                  className="relative text-stone-700 hover:text-amber-900 font-light transition-all duration-300 py-2 group px-3"
                >
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute inset-0 bg-amber-50/0 group-hover:bg-amber-50/50 rounded-lg transition-all duration-300 -z-10 blur-sm"></span>
                </Link>
                <Link
                  to="/signup"
                  className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 hover:from-stone-800 hover:via-amber-900 hover:to-amber-800 text-white font-normal transition-all duration-500 px-7 py-2.5 rounded-xl ml-2 shadow-xl shadow-stone-900/20 hover:shadow-2xl hover:shadow-amber-900/30 group overflow-hidden hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-400/20 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative text-stone-700 hover:text-amber-900 focus:outline-none p-2.5 bg-white/50 backdrop-blur-sm hover:bg-amber-50/50 rounded-xl transition-all duration-300 border border-white/50 shadow-lg shadow-stone-900/5"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/20 backdrop-blur-xl animate-fade-in-down">
            {user ? (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-white/80 to-amber-50/50 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl shadow-stone-900/5 mb-4">
                  <div className="relative w-11 h-11 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-full flex items-center justify-center shadow-lg shadow-amber-600/30">
                    <span className="text-white font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                  </div>
                  <div>
                    <p className="text-stone-900 font-normal text-sm">{user.email?.split('@')[0]}</p>
                    <p className="text-stone-500 text-xs">{user.email}</p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className="block text-stone-700 hover:text-amber-900 font-light transition-all duration-300 py-3.5 px-4 bg-white/50 hover:bg-amber-50/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg shadow-stone-900/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <Link
                  to="/favorites"
                  className="block text-stone-700 hover:text-pink-700 font-light transition-all duration-300 py-3.5 px-4 bg-white/50 hover:bg-pink-50/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg shadow-stone-900/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Favorites
                </Link>

                <Link
                  to="/recommendations"
                  className="block text-stone-700 hover:text-amber-900 font-light transition-all duration-300 py-3.5 px-4 bg-white/50 hover:bg-amber-50/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg shadow-stone-900/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Recommendations
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-stone-700 hover:text-stone-900 font-light transition-all duration-300 py-3.5 px-4 bg-white/50 hover:bg-stone-50/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg shadow-stone-900/5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/"
                  className="block text-stone-700 hover:text-amber-900 font-light transition-all duration-300 py-3.5 px-4 bg-white/50 hover:bg-amber-50/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg shadow-stone-900/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  to="/login"
                  className="block text-stone-700 hover:text-amber-900 font-light transition-all duration-300 py-3.5 px-4 bg-white/50 hover:bg-amber-50/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg shadow-stone-900/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="block bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 hover:from-stone-800 hover:via-amber-900 hover:to-amber-800 text-white text-center font-normal transition-all duration-500 px-6 py-3.5 rounded-xl mt-4 shadow-xl shadow-stone-900/20 hover:shadow-2xl hover:shadow-amber-900/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 20s infinite ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}