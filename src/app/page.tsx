import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <footer className="bg-kova-navy-mid border-t border-kova-navy-light px-4 py-8 text-center">
        <p className="text-sm text-slate-500 font-display tracking-wider">KOVA · Intelligent Automation</p>
      </footer>
    </main>
  );
}
