import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-fuchsia-50 to-pink-100">
        <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-white/40 backdrop-blur-md shadow-2xl">
          <div className="relative">
            <svg
              className="animate-spin h-16 w-16 text-fuchsia-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <div className="absolute inset-0 animate-ping opacity-20">
              <svg className="h-16 w-16 text-fuchsia-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              </svg>
            </div>
          </div>
          <p className="text-gray-800 font-semibold text-lg tracking-wide">Preparing your wardrobe...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}