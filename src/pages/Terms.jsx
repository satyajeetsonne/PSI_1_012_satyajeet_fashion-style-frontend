import { useNavigate } from "react-router-dom";

export default function Terms() {
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
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-4">
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

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-900 tracking-tight">
            Terms of Service
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-stone-300"></div>
            <div className="w-2 h-2 rounded-full bg-amber-600"></div>
            <div className="w-12 h-px bg-stone-300"></div>
          </div>
          <p className="text-sm text-stone-500 font-light">Last updated: February 11, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 lg:p-12 space-y-12">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                1. Agreement to Terms
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                By accessing and using Fashion Style Recommender, you accept and agree to be bound by these terms. If you do not agree to these terms, please do not use this service.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                2. Use License
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                Permission is granted to temporarily download one copy of the materials for personal, non-commercial use only. Under this license you may not:
              </p>
              <ul className="space-y-3 ml-6">
                {[
                  "Modify or copy the materials",
                  "Use the materials for commercial purposes",
                  "Attempt to decompile or reverse engineer any software",
                  "Remove any copyright or proprietary notations",
                  "Transfer materials to another person or server"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-stone-700 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                3. Disclaimer
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                The materials on our service are provided "as is". We make no warranties, expressed or implied, and hereby disclaim all other warranties including merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                4. Limitations
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                Fashion Style Recommender shall not be liable for any damages arising out of the use or inability to use the materials on our service, including damages for loss of data, profit, or business interruption.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                5. User Content
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                You retain all rights to the images and content you upload. By uploading content, you grant us a license to use, store, and process your content solely for providing our services to you.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                6. Account Termination
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                We reserve the right to terminate or suspend accounts that violate these terms or engage in prohibited activities. You may delete your account at any time through the application settings.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                7. Modifications
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                We may revise these terms at any time. By continuing to use this service, you agree to be bound by the current version of these terms.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                8. Contact Information
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                Questions about these Terms of Service? Contact us at{" "}
                <a href="mailto:support@fashionstylerecommender.com" className="text-amber-700 hover:text-amber-800 transition-colors">
                  support@fashionstylerecommender.com
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Bottom CTA */}
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