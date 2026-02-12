import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white via-stone-50/50 to-amber-50/30 border-t border-white/40 mt-24 overflow-hidden">
      {/* Animated liquid blob backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-stone-300/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/2 left-1/3 w-[300px] h-[300px] bg-amber-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12">
        
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-3 items-start mb-12">
          
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 rounded-xl flex items-center justify-center shadow-xl shadow-stone-900/20 group hover:scale-110 hover:rotate-3 transition-all duration-500">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.414-2.414a1 1 0 00-.707-.293h-3.172a1 1 0 00-.707.293l-2.414 2.414A1 1 0 016.586 13H4a2 2 0 00-2 2v4a2 2 0 002 2z" />
                </svg>
                <div className="absolute inset-0 bg-amber-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </div>
              <h3 className="text-lg font-light text-stone-900">
                Fashion Style Recommender
              </h3>
            </div>
            <p className="text-sm text-stone-600 font-light leading-relaxed max-w-xs">
              Your personal guide to discovering and refining your unique style through AI-powered insights.
            </p>
            {/* Accent line with animation */}
            <div className="flex items-center gap-2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 animate-expand-width"></div>
              <div className="w-8 h-0.5 bg-stone-400"></div>
            </div>
          </div>

          {/* Links */}
          <div className="md:pl-8">
            <h4 className="text-xs font-normal text-stone-900 mb-6 uppercase tracking-[0.3em]">
              Explore
            </h4>
            <div className="space-y-3.5 text-sm text-stone-600">
              <div className="group cursor-pointer">
                <Link to="/about" className="inline-flex items-center gap-2 hover:text-amber-900 transition-all duration-300 font-light relative hover:translate-x-1">
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
              <div className="group cursor-pointer">
                <Link to="/contact" className="inline-flex items-center gap-2 hover:text-amber-900 transition-all duration-300 font-light relative hover:translate-x-1">
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
              <div className="group cursor-pointer">
                <Link to="/privacy-policy" className="inline-flex items-center gap-2 hover:text-amber-900 transition-all duration-300 font-light relative hover:translate-x-1">
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
              <div className="group cursor-pointer">
                <Link to="/terms" className="inline-flex items-center gap-2 hover:text-amber-900 transition-all duration-300 font-light relative hover:translate-x-1">
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Terms of Service
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>
          </div>

          {/* Tagline & Social */}
          <div className="md:text-right space-y-6">
            <div className="space-y-3">
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                Discover the latest in personal styling and fashion insights.
              </p>
              <div className="flex items-center justify-start md:justify-end gap-2">
                <div className="w-8 h-px bg-amber-600"></div>
                <p className="text-lg text-stone-900 font-serif italic">
                  "Discover what works for you"
                </p>
              </div>
            </div>

            {/* Social Icons - Glassmorphic */}
            {/* <div className="flex items-center gap-3 justify-start md:justify-end">
              {[
                { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", label: "Twitter" },
                { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z", label: "LinkedIn" },
                { icon: "M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z", label: "Facebook" }
              ].map((social, index) => (
                <div
                  key={index}
                  className="relative w-10 h-10 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl flex items-center justify-center text-stone-600 hover:text-amber-900 hover:bg-amber-50/60 transition-all duration-300 shadow-lg shadow-stone-900/5 hover:shadow-xl hover:shadow-amber-900/10 cursor-pointer group hover:scale-110 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-600/0 group-hover:from-amber-400/10 group-hover:to-amber-600/10 rounded-xl transition-all duration-300"></div>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Bottom bar with glassmorphic effect */}
        <div className="relative border-t border-white/40 pt-8 mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
          
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-stone-500 font-light flex items-center gap-2">
              <span className="inline-block w-1 h-1 rounded-full bg-amber-600 animate-pulse"></span>
              © 2025 Fashion Style Recommender. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-xs text-stone-500 font-light">
              <span className="hover:text-amber-900 cursor-pointer transition-colors duration-300 flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Made with care
              </span>
              <div className="w-1 h-1 rounded-full bg-stone-400"></div>
              <span className="hover:text-amber-900 cursor-pointer transition-colors duration-300 flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Premium styling
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes expand-width {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-blob {
          animation: blob 25s infinite ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-expand-width {
          animation: expand-width 2s ease-out;
        }
      `}</style>
    </footer>
  );
}