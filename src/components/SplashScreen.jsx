import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }) {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true);

      const fadeOutTimer = setTimeout(() => {
        onComplete();
      }, 400);

    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-400 ${
        isHiding ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center px-6 max-w-3xl">
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-tight ${
            !isHiding ? "animate-apple-splash-text" : ""
          }`}
        >
          Your style, decoded.
        </h1>
        <p
          className={`text-sm text-neutral-400 mt-6 tracking-wide font-light ${
            !isHiding ? "animate-apple-splash-subtitle" : ""
          }`}
        >
          AI-Powered Fashion Intelligence
        </p>
      </div>
    </div>
  );
}
