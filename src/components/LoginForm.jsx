import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setSuccessMessage("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      // Show success message
      setSuccessMessage("Login successful");

      // Clear form on success
      setFormData({
        email: "",
        password: "",
      });

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setLoading(false);

      // Map Firebase error codes to user-friendly messages
      let userMessage = "Login failed. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          userMessage = "No account found with this email address.";
          break;
        case "auth/wrong-password":
          userMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          userMessage = "Invalid email address format.";
          break;
        case "auth/too-many-requests":
          userMessage = "Too many login attempts. Please try again later.";
          break;
        case "auth/user-disabled":
          userMessage = "This account has been disabled.";
          break;
        case "auth/invalid-credential":
          userMessage = "Invalid email or password.";
          break;
        default:
          userMessage = error.message || "Login failed. Please try again.";
      }

      setAuthError(userMessage);
    }
  };

  const inputClasses = (hasError) =>
    `w-full px-5 py-4 bg-white/30 backdrop-blur-md border transition-all duration-300 focus:outline-none font-light text-stone-900 placeholder:text-stone-500 rounded-lg shadow-lg ${
      hasError
        ? "border-red-400/60 focus:border-red-500 focus:bg-white/40 shadow-red-500/20"
        : "border-white/60 focus:border-white/80 hover:border-white/70 focus:bg-white/40 hover:shadow-xl"
    }`;

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Fashion Image */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/outfit_detail_accessory.jpg')",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-stone-50/40"></div>
        </div>

        {/* Content Overlay on Image */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo/Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-white"></div>
              <span className="text-xs uppercase tracking-[0.4em] text-white font-light">
                Premium
              </span>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="max-w-md">
            <h2 className="text-5xl font-light text-white mb-4 leading-tight">
              Fashion meets elegance
            </h2>
            <p className="text-lg text-white/80 font-light">
              Join our exclusive community and discover a world of timeless style.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center bg-stone-50 px-6 py-16 relative overflow-hidden min-h-screen">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/40 backdrop-blur-sm border border-stone-300/40 -rotate-12 hidden xl:block"></div>
        <div className="absolute bottom-32 left-10 w-24 h-24 bg-white/40 backdrop-blur-sm border border-stone-300/40 rotate-45 hidden xl:block"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Glassmorphism Card */}
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl p-8 sm:p-10">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-stone-900"></div>
                  <span className="text-xs uppercase tracking-[0.4em] text-stone-600 font-normal">
                    Login
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-light text-stone-900 tracking-tight mb-3">
                  Welcome back
                </h1>
                <p className="text-base text-stone-600 font-light">
                  Sign in to continue
                </p>
              </div>

              {/* Error Message - Glassmorphism */}
              {authError && (
                <div className="mb-6 p-4 bg-red-500/15 backdrop-blur-lg border border-red-400/50 rounded-xl shadow-lg">
                  <p className="text-sm text-red-800 font-light">
                    {authError}
                  </p>
                </div>
              )}

              {/* Success Message - Glassmorphism */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-500/15 backdrop-blur-lg border border-green-400/50 rounded-xl shadow-lg">
                  <p className="text-sm text-green-800 font-light">
                    {successMessage}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input - Glassmorphism */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-[0.2em] text-stone-700 mb-3 font-normal"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClasses(errors.email)}
                    aria-label="Email Address"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-2 text-xs text-red-600 font-light"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input - Glassmorphism */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs uppercase tracking-[0.2em] text-stone-700 mb-3 font-normal"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={inputClasses(errors.password)}
                    aria-label="Password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  {errors.password && (
                    <p
                      id="password-error"
                      className="mt-2 text-xs text-red-600 font-light"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button - Glassmorphism */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl transition-all duration-300 focus:outline-none font-normal text-sm uppercase tracking-[0.2em] backdrop-blur-md shadow-lg ${
                      loading
                        ? "bg-stone-400/80 text-white cursor-not-allowed border border-stone-400/60"
                        : "bg-stone-900/90 text-white hover:bg-stone-900 hover:shadow-2xl border border-stone-900/60 hover:scale-[1.02]"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Signing in</span>
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-stone-300/50">
                <p className="text-sm text-stone-600 font-light">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-stone-900 font-normal hover:text-stone-700 transition-colors duration-300 relative group"
                  >
                    Sign up
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-900 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Decorative accent */}
          <div className="mt-8 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}