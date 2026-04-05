const steps = [
  {
    step: "01",
    title: "Answer Questions",
    description: "Complete our 5-step guided assessment about your business, workflows, challenges, and goals.",
  },
  {
    step: "02",
    title: "Get Analysis",
    description: "Our engine analyzes your responses against a catalog of AI solutions to find the best matches.",
  },
  {
    step: "03",
    title: "Review Recommendations",
    description: "Receive a prioritized list of AI opportunities with impact scores, effort estimates, and a phased roadmap.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-kova-navy px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white font-display">How It Works</h2>
          <p className="mt-3 text-slate-400">Three simple steps to your AI transformation roadmap.</p>
        </div>
        <div className="mt-16 space-y-12">
          {steps.map((s) => (
            <div key={s.step} className="flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-kova-violet text-xl font-bold text-white shadow-lg shadow-kova-violet/25 font-display">
                {s.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white font-display">{s.title}</h3>
                <p className="mt-1 text-slate-400">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
