import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <footer className="bg-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        <p>AI Business Discovery Framework</p>
      </footer>
    </main>
  );
}
