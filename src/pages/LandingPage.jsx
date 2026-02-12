import Hero from "../components/Hero";
import Features from "../components/Features";
// import HowItWorks from "../components/HowItWorks";
import CTA from "../components/Cta";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <main className="bg-white text-stone-900 py-12 space-y-12">
      {/* Hero Section */}
      <section aria-label="Hero">
        <Hero />
      </section>

      {/* Features Section */}
      <section aria-label="Features">
        <Features />
      </section>

      {/* Optional: How it works */}
      {/*
      <section aria-label="How it works" className="mt-24">
        <HowItWorks />
      </section>
      */}

      {/* Call to Action */}
      <section aria-label="Call to action">
        <CTA />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
