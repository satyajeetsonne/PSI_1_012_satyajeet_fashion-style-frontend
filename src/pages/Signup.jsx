import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";

export default function Signup() {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      {/* Signup Form */}
      <section className="flex-grow flex items-center justify-center">
        <SignupForm />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
