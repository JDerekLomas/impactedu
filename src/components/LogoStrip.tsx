const partners = [
  { name: "Carnegie Mellon University", short: "CMU" },
  { name: "Gates Foundation" },
  { name: "Schmidt Futures" },
  { name: "UNESCO" },
  { name: "Savvas Learning" },
];

export default function LogoStrip() {
  return (
    <section className="py-10 border-y border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-muted-light text-center mb-6">
          Research partners &amp; funders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {partners.map((p) => (
            <span
              key={p.name}
              className="text-sm sm:text-base font-medium text-muted-light/70 hover:text-muted transition-colors select-none"
              title={p.name}
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
