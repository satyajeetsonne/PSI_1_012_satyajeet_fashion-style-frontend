import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setSubmitting(false);
    setFormState({ name: "", email: "", message: "" });
    
    // Reset after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Simple Navigation */}
      <nav className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4">
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

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-900 tracking-tight">
            Get in Touch
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-stone-300"></div>
            <div className="w-2 h-2 rounded-full bg-amber-600"></div>
            <div className="w-12 h-px bg-stone-300"></div>
          </div>
          <p className="text-base text-stone-600 font-light max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-light text-stone-900">Let's Talk</h2>
              <p className="text-stone-600 font-light leading-relaxed">
                Whether you have a question about features, need technical support, or just want to share feedback, our team is ready to help.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Email */}
              <div className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-stone-900 mb-1">Email</h3>
                    <a href="mailto:support@fashionstylerecommender.com" className="text-sm text-stone-600 hover:text-amber-700 transition-colors">
                      support@fashionstylerecommender.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white border border-stone-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-stone-900 mb-1">Response Time</h3>
                    <p className="text-sm text-stone-600">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-white border border-stone-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-stone-900 mb-1">Global Support</h3>
                    <p className="text-sm text-stone-600">Available worldwide, 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl"></div>
                    <div className="relative w-16 h-16 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-stone-900">Message Sent!</h3>
                    <p className="text-sm text-stone-600 font-light max-w-sm">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-stone-900 mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 bg-white border border-stone-200 hover:border-stone-300 focus:border-stone-400 focus:outline-none rounded-lg transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-stone-900 mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 bg-white border border-stone-200 hover:border-stone-300 focus:border-stone-400 focus:outline-none rounded-lg transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-stone-900 mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-stone-200 hover:border-stone-300 focus:border-stone-400 focus:outline-none rounded-lg transition-colors font-light resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-all duration-200 text-sm uppercase tracking-wider font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Back Button at Bottom Right */}
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