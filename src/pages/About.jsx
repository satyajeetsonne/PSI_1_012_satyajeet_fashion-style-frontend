import { useNavigate, Link } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Simple Navigation */}
      <nav className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-4">
          <button 
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <h1 className="text-5xl lg:text-6xl font-light text-stone-900 tracking-tight">
            About Us
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-stone-300"></div>
            <div className="w-2 h-2 rounded-full bg-amber-600"></div>
            <div className="w-12 h-px bg-stone-300"></div>
          </div>
          <p className="text-xl text-stone-600 font-light max-w-3xl mx-auto leading-relaxed">
            Fashion Style Recommender is an AI-powered platform helping you discover and refine your personal style with confidence.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-10 lg:p-12 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-light text-stone-900">Our Mission</h2>
              </div>
              <p className="text-stone-700 font-light leading-relaxed text-lg">
                We believe everyone deserves to feel confident in their wardrobe. Our mission is to make personalized fashion advice accessible through cutting-edge AI technology that understands your unique style, preferences, and lifestyle needs.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-stone-900 text-center mb-12">What We Offer</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "AI-Powered Analysis",
                description: "Upload outfit photos and receive instant feedback on style, fit, colors, and occasion appropriateness from our advanced AI."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Weekly Planning",
                description: "Get intelligent outfit suggestions tailored to your calendar, weather, and lifestyle for the entire week ahead."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "Seasonal Insights",
                description: "Receive personalized recommendations based on current trends, upcoming seasons, and weather patterns."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
                title: "Smart Matching",
                description: "Discover perfect combinations from your existing wardrobe that you never thought of before."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Favorites Collection",
                description: "Save and organize your favorite outfits for quick access and inspiration whenever you need it."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                ),
                title: "Style Tags",
                description: "Organize your wardrobe with smart tags for occasions, seasons, colors, and styles."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0 text-stone-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-stone-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-stone-600 font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-10 lg:p-12 space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-light text-stone-900">How It Works</h2>
                <p className="text-stone-600 font-light max-w-2xl mx-auto">
                  Getting started is simple. Here's how Fashion Style Recommender helps you build confidence in your style.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 pt-8">
                {[
                  {
                    step: "01",
                    title: "Upload Your Outfits",
                    description: "Take photos of your clothing combinations and upload them to your personal wardrobe."
                  },
                  {
                    step: "02",
                    title: "Get AI Analysis",
                    description: "Our AI analyzes colors, styles, fit, and combinations to provide personalized insights."
                  },
                  {
                    step: "03",
                    title: "Discover Your Style",
                    description: "Receive tailored recommendations, weekly plans, and style advice based on your preferences."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 border-2 border-amber-200 rounded-full text-2xl font-light text-amber-700">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-medium text-stone-900">{item.title}</h3>
                    <p className="text-sm text-stone-600 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-stone-900 text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Privacy First",
                description: "Your images and data are securely stored and never shared with third parties."
              },
              {
                title: "Inclusive Style",
                description: "Fashion is personal. We celebrate all styles, bodies, and preferences."
              },
              {
                title: "Sustainable Fashion",
                description: "We help you make the most of what you already own, reducing waste."
              }
            ].map((value, idx) => (
              <div key={idx} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-stone-100 rounded-full mb-2">
                  <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                </div>
                <h3 className="text-lg font-medium text-stone-900">{value.title}</h3>
                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-light mb-4">Ready to Get Started?</h2>
          <p className="text-stone-300 font-light mb-8 max-w-2xl mx-auto">
            Join thousands discovering their personal style with confidence through AI-powered insights.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 px-8 py-4 rounded-lg transition-all duration-200 text-sm uppercase tracking-wider font-medium"
          >
            Create Free Account
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}