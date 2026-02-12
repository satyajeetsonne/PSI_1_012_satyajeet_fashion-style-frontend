import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-stone-50 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Two-column layout with image */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Featured Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Main image with sophisticated framing */}
              <div className="relative overflow-hidden border-2 border-stone-900 shadow-2xl group">
                <img 
                  src="/images/ai_analysis_result.jpg"
                  alt="Refined fashion elegance and style analysis"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Decorative frame accent */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-amber-600 -z-10"></div>
              
              {/* Accent label box */}
              <div className="absolute -top-8 -left-8 bg-amber-600 text-white p-6 max-w-[200px] shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-xs uppercase tracking-[0.3em] font-light">
                  Begin your style journey
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - CTA Content */}
          <div className="relative order-1 lg:order-2">
            <div className="border border-stone-200 p-8 lg:p-10 text-center lg:text-left bg-white relative shadow-lg">
              {/* Decorative frame accent */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-amber-600/20 -z-10"></div>
              
              <div className="space-y-5">
                {/* Eyebrow */}
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-12 h-px bg-stone-900"></div>
                  <span className="text-xs uppercase tracking-[0.4em] text-stone-500 font-normal">
                    Get Started
                  </span>
                  <div className="w-12 h-px bg-stone-900"></div>
                </div>

                {/* Headline */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-stone-900 tracking-tight leading-[1.1] max-w-3xl mx-auto lg:mx-0">
                  Ready to decode your 
                  <span className="block font-serif italic text-amber-900 mt-2">wardrobe?</span>
                </h2>

                {/* Visual separator */}
                <div className="flex items-center justify-center lg:justify-start gap-3" aria-hidden="true">
                  <div className="w-16 h-1 bg-amber-600"></div>
                  <div className="w-8 h-1 bg-stone-900"></div>
                </div>

                {/* Description */}
                <p className="text-lg text-stone-600 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Join thousands discovering their personal style with clarity and confidence
                </p>

                {/* CTA Button */}
                <div className="pt-3">
                  <button 
                    onClick={() => navigate("/signup")}
                    className="group inline-flex items-center gap-4 bg-stone-900 hover:bg-stone-800 text-white font-normal py-5 px-12 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
                    aria-label="Create your account"
                  >
                    <span className="text-sm uppercase tracking-[0.2em]">Create Account</span>
                    <div className="w-12 h-px bg-white transition-all duration-300 group-hover:w-16"></div>
                  </button>
                </div>

                {/* Trust line */}
                <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-stone-500 font-light pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    <span>Free to start</span>
                  </div>
                  <div className="w-px h-3 bg-stone-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}