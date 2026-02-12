import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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
            Privacy Policy
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
            
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                Introduction
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                Fashion Style Recommender ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our service.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Information We Collect */}
            <section className="space-y-6">
              <h2 className="text-xl font-light text-stone-900">
                Information We Collect
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                We collect several types of information to provide and improve our service:
              </p>
              
              <div className="space-y-6 ml-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">Personal Information</h3>
                  <p className="text-stone-600 font-light">Email address, username, and profile information when you create an account.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">Outfit Images</h3>
                  <p className="text-stone-600 font-light">Photos you upload for AI analysis are securely stored and processed. We do not share these images with third parties.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">Usage Data</h3>
                  <p className="text-stone-600 font-light">Information about how you use our service, including features accessed, time spent, and interaction patterns.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">Technical Data</h3>
                  <p className="text-stone-600 font-light">Browser type, device information, IP address, and operating system for service optimization.</p>
                </div>
              </div>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* How We Use Your Data */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                How We Use Your Data
              </h2>
              <p className="text-stone-700 font-light leading-relaxed mb-4">
                We use your information for the following purposes:
              </p>
              <ul className="space-y-3 ml-6">
                {[
                  "Provide personalized style recommendations",
                  "Process and analyze your outfit images with AI",
                  "Maintain and improve our service",
                  "Send you updates about your account",
                  "Respond to your support requests",
                  "Monitor and analyze usage patterns"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-stone-700 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Data Security */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                Data Security
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                We implement industry-standard security measures to protect your personal information. Your outfit images and personal data are encrypted both in transit and at rest. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Your Rights */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                Your Rights
              </h2>
              <p className="text-stone-700 font-light leading-relaxed mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="space-y-3 ml-6">
                {[
                  "Access and download your personal data",
                  "Correct inaccurate or incomplete information",
                  "Delete your account and associated data",
                  "Opt out of promotional communications",
                  "Request data portability"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-stone-700 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Data Retention */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                Data Retention
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                We retain your personal information only for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and data at any time through your account settings.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Third-Party Services */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                Third-Party Services
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                We use Firebase for authentication and Google's AI services for image analysis. These services have their own privacy policies. We do not sell your personal information to third parties.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Changes to Policy */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                Changes to This Policy
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <div className="h-px bg-stone-200"></div>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-xl font-light text-stone-900">
                Contact Us
              </h2>
              <p className="text-stone-700 font-light leading-relaxed">
                Questions about this Privacy Policy? Contact us at{" "}
                <a href="mailto:privacy@fashionstylerecommender.com" className="text-amber-700 hover:text-amber-800 transition-colors">
                  privacy@fashionstylerecommender.com
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