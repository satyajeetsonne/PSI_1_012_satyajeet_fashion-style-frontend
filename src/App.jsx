import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OutfitDetail from "./pages/OutfitDetail";
import Favorites from "./pages/Favorites";
import WeeklyRecommendations from "./pages/WeeklyRecommendations";
import Recommendations from "./pages/Recommendations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      <div>
        <ScrollToTop />
        {!showSplash && <Navbar />}

        <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/outfits/:id"
            element={
              <ProtectedRoute>
                <OutfitDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recommendations/weekly"
            element={
              <ProtectedRoute>
                <WeeklyRecommendations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Fallback route */}
          <Route
            path="*"
            element={
              <div className="p-8 text-center text-gray-600">
                Page not found
              </div>
            }
          />
        </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
