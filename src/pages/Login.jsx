import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      {/* Login Form */}
      <section
        aria-label="Login"
        className="flex-grow flex items-center justify-center px-4"
      >
        <LoginForm />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
