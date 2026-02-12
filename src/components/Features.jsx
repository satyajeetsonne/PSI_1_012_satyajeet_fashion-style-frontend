import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
  const navigate = useNavigate();

  const galleryItems = [
    {
      image: "/images/smart_match_top.jpg",
      title: "Smart Matching",
      description: "AI-powered outfit combinations"
    },
    {
      image: "/images/seasonal_top.jpg",
      title: "Seasonal Advice",
      description: "Weather-appropriate styling"
    },
    {
      image: "/images/weekly_left.jpg",
      title: "Weekly Planning",
      description: "Effortless daily coordination"
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-white to-stone-50/50 py-12 px-6 lg:px-12 overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute top-1/4 right-0 w-px h-96 bg-gradient-to-b from-transparent via-amber-600/10 to-transparent" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-px bg-gradient-to-r from-transparent via-amber-600/10 to-transparent" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto">

        {/* Main two-column section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">

          {/* Left Side - Featured Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] w-full">
              {/* Main image */}
              <div className="relative overflow-hidden shadow-2xl group">
                <img 
                  src="/images/feature_analysis.jpg"
                  alt="AI-powered outfit analysis showing personalized style recommendations"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-amber-600/30 -z-10 transition-all duration-500 group-hover:border-amber-600/50" aria-hidden="true"></div>
              <div className="absolute top-0 left-0 w-full h-full border border-white -translate-x-4 -translate-y-4 -z-20" aria-hidden="true"></div>

              {/* Accent label */}
              <div className="absolute -top-6 -left-6 bg-stone-900 text-white px-8 py-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <p className="text-xs uppercase tracking-[0.4em] font-light">
                    AI-Powered Analysis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="relative order-1 lg:order-2 space-y-5">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-px bg-amber-600"></div>
              <span className="text-xs uppercase tracking-[0.4em] text-stone-500 font-light">
                How it works
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-stone-900 tracking-tight leading-[1.1]">
                Ready to decode your 
                <span className="block font-serif italic text-amber-900 mt-2">wardrobe?</span>
              </h2>
              <div className="flex items-center gap-4" aria-hidden="true">
                <div className="w-24 h-1 bg-amber-600"></div>
                <div className="w-12 h-1 bg-stone-900"></div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl text-stone-600 font-light leading-relaxed">
              Join thousands discovering their personal style with clarity and confidence through AI-powered insights.
            </p>

            {/* Feature highlights */}
            <div className="space-y-3 pt-2">
              {[
                { icon: "✓", text: "Personalized style analysis" },
                { icon: "✓", text: "Smart wardrobe optimization" },
                { icon: "✓", text: "Curated daily recommendations" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-9 h-9 bg-amber-50 flex items-center justify-center text-amber-600 text-sm font-light border border-amber-600/20 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-stone-700 font-light group-hover:text-stone-900 transition-colors duration-300">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button 
                onClick={() => navigate("/signup")}
                className="group relative inline-flex items-center gap-4 bg-stone-900 hover:bg-amber-900 text-white font-light py-5 px-12 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:ring-offset-2"
                aria-label="Get started for free"
              >
                <span className="relative z-10 text-sm uppercase tracking-[0.3em]">
                  Get Started Free
                </span>
                <div className="relative z-10 w-12 h-px bg-white transition-all duration-300 group-hover:w-16"></div>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-sm text-stone-500 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                  <span className="font-light">No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                  <span className="font-light">Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Enhanced Gallery Section */}
        <div className="relative">
          {/* Section header */}
          <div className="text-center mb-8 space-y-3">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-amber-600"></div>
              <span className="text-xs uppercase tracking-[0.4em] text-stone-500 font-light">
                Features
              </span>
              <div className="w-8 h-px bg-amber-600"></div>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-light text-stone-900 tracking-tight">
              Powerful features at your 
              <span className="block font-serif italic text-amber-900 mt-1">fingertips</span>
            </h3>
            <p className="text-stone-600 font-light max-w-2xl mx-auto">
              Everything you need to build your perfect wardrobe
            </p>
          </div>

          {/* Gallery grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div 
                key={index}
                className="group relative aspect-[4/5] overflow-hidden bg-stone-100 border border-stone-200/60 transition-all duration-500 hover:border-amber-600/40 hover:shadow-2xl transform hover:-translate-y-2"
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={`${item.title} - ${item.description}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-light tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm text-stone-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Accent line */}
                  <div className="w-12 h-px bg-amber-600 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                {/* Index number */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="text-white text-sm font-light">0{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}