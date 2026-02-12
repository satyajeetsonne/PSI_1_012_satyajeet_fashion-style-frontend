import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Large typographic background elements */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
        <span className="text-[25rem] font-serif italic text-stone-900 leading-none">S</span>
      </div>

      {/* Geometric accent elements */}
      <div className="absolute top-1/4 right-0 w-px h-96 bg-gradient-to-b from-transparent via-amber-600/20 to-transparent"></div>
      <div className="absolute bottom-1/4 left-12 w-96 h-px bg-gradient-to-r from-amber-600/20 via-transparent to-transparent"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 border border-stone-200/40 -rotate-12"></div>
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-amber-600/10 rotate-45"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        
        {/* Hero Section - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center min-h-[600px]">
          
          {/* Main Content - Left Side */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="max-w-5xl w-full space-y-8">
              
              {/* Eyebrow with line */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-stone-900"></div>
                <span className="text-xs uppercase tracking-[0.4em] text-stone-500 font-normal">
                  Fashion Style Recommender
                </span>
                <div className="flex-1 h-px bg-stone-200"></div>
              </div>

              {/* Statement Headline - Extra Large */}
              <div className="space-y-6">
                <h1 className="text-7xl sm:text-8xl lg:text-9xl text-stone-900 leading-[0.9] tracking-tighter">
                  <span className="block font-light">Your</span>
                  <span className="block font-light">wardrobe,</span>
                  <span className="block font-serif italic font-normal mt-4 text-amber-900">decoded</span>
                </h1>
                
                {/* Visual separator */}
                <div className="flex items-center gap-6">
                  <div className="w-32 h-1 bg-amber-600"></div>
                  <div className="w-16 h-1 bg-stone-900"></div>
                  <div className="w-8 h-1 bg-stone-300"></div>
                </div>
              </div>

              {/* Two-column subtext */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                <div className="space-y-6">
                  <p className="text-3xl text-stone-900 font-light leading-tight">
                    Stop guessing.
                  </p>
                  <p className="text-lg text-stone-600 font-light leading-relaxed">
                    We analyze what you own, identify what flatters you, and show you exactly what's missing.
                  </p>
                </div>
                <div className="space-y-6 md:pt-12">
                  <p className="text-lg text-stone-600 font-light leading-relaxed">
                    No trends. No pressure. Just clarity about your personal style and the confidence to dress like yourself.
                  </p>
                </div>
              </div>

              {/* CTA with stats */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                <button 
                  onClick={handleGetStarted}
                  className="group relative inline-flex items-center gap-4 bg-stone-900 text-white px-12 py-6 transition-all duration-300 hover:bg-stone-800 shadow-lg hover:shadow-xl"
                >
                  <span className="text-sm uppercase tracking-[0.2em] font-normal">
                    Begin Your Journey
                  </span>
                  <div className="w-12 h-px bg-white transition-all duration-300 group-hover:w-16"></div>
                </button>

                {/* Subtle trust indicator */}
                <div className="flex items-center gap-6 text-sm text-stone-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                    <span className="font-light">Trusted by thousands</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Image Stack - NEW */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-[550px] sm:h-[650px] lg:h-[700px]">
              {/* Main featured image */}
              <div className="absolute top-0 right-0 w-[75%] h-[65%] overflow-hidden border border-stone-200 shadow-2xl z-10 transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src="/images/hero_stack_01.jpg" 
                  alt="Minimalist fashion elegance"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Second image - offset bottom left */}
              <div className="absolute bottom-0 left-0 w-[60%] h-[50%] overflow-hidden border-2 border-white shadow-xl z-20 transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src="/images/hero_stack_03.jpg" 
                  alt="Refined tailoring details"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Decorative frame accent */}
              <div className="absolute top-8 right-8 w-[75%] h-[65%] border border-amber-600/20 -z-10"></div>
              
              {/* Quote overlay */}
              <div className="absolute bottom-20 right-4 bg-stone-900/90 text-white p-6 max-w-xs backdrop-blur-sm z-30 shadow-lg">
                <p className="text-sm font-light italic leading-relaxed">
                  "Style is knowing who you are and what you want to say"
                </p>
                <div className="w-16 h-px bg-amber-600 mt-4"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section - keeping original spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-stone-200 pt-8 mt-10">
          {/* Features removed - moved to separate Features component */}
        </div>
      </div>

      {/* Brand Statement - Bottom right */}
      <div className="absolute bottom-12 right-12 max-w-sm">
        <p className="text-right text-sm text-stone-400 font-light leading-relaxed italic">
          "."
        </p>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-stone-200"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-stone-200"></div>
    </div>
  );
}