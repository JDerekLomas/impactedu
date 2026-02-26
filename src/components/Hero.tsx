import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-sm text-indigo-200 mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            A program of Wisdom Frontiers
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            AI should work for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              every learner
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-indigo-200/90 leading-relaxed max-w-2xl">
            We advance equitable access to AI-powered learning through open research, open-source tools, and practitioner training — so every educator and learner benefits from advances in artificial intelligence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-[#1e1b4b] font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15"
            >
              Our Programs
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
          <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="var(--surface)" />
        </svg>
      </div>
    </section>
  );
}
