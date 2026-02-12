export default function Testimonial() {
  return (
    <div className="relative bg-stone-50 py-32 px-6 lg:px-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-amber-600/10 rotate-45 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Large quote mark */}
          <div className="absolute -top-12 -left-4 text-9xl font-serif text-stone-200 leading-none select-none">
            "
          </div>
          
          {/* Testimonial content */}
          <div className="relative space-y-8 pt-8">
            <blockquote className="text-3xl sm:text-4xl font-light text-stone-900 leading-relaxed">
              Finally, a tool that helps me understand what actually works for my body and lifestyle. 
              No more guessing or buying things I'll never wear.
            </blockquote>
            
            <div className="flex items-center gap-4 pt-8 border-t border-stone-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full"></div>
              <div>
                <p className="text-base font-normal text-stone-900">Sarah Martinez</p>
                <p className="text-sm text-stone-500 font-light">Style Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}