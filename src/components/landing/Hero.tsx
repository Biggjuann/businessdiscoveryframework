import Link from "next/link";
import Button from "@/components/ui/Button";

function KovaMark() {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rotate-45 rounded-lg bg-kova-violet/20 border border-kova-violet/40" />
        <div className="absolute inset-2 rotate-45 rounded-md bg-kova-violet/40" />
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold font-display text-white">
          K
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-kova-navy px-4 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.05),transparent_40%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-center">
          <KovaMark />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-kova-violet font-display">
          KOVA · Intelligent Automation
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
          Discover How AI Can{" "}
          <span className="text-kova-violet">
            Transform
          </span>{" "}
          Your Business
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          AI services that pay for themselves — typically inside 30 days.
          Take our guided assessment to identify the highest-impact AI opportunities
          for your business.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/assessment">
            <Button size="lg">Start Free Assessment</Button>
          </Link>
          <a href="#how-it-works">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
