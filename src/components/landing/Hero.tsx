import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
          AI Business Discovery Framework
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover How AI Can{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Transform
          </span>{" "}
          Your Business
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Take our guided assessment to identify the highest-impact AI opportunities
          for your business. Get a personalized roadmap with prioritized recommendations
          in minutes.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/assessment">
            <Button size="lg">Start Free Assessment</Button>
          </Link>
          <a href="#how-it-works">
            <Button size="lg" variant="outline" className="border-slate-500 text-white hover:bg-white/10">
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
