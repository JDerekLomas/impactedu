import Hero from "@/components/Hero";
import ProgramCard from "@/components/ProgramCard";
import Link from "next/link";

const programs = [
  {
    title: "Open Research",
    description:
      "Efficacy studies, equity analyses, and measurement frameworks — published openly for the entire field.",
    color: "bg-indigo-100 text-indigo-600",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Open Tools & Infrastructure",
    description:
      "Open-source datasets, reference implementations, and evaluation frameworks for AI in education.",
    color: "bg-emerald-100 text-emerald-600",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Practitioner Training",
    description:
      "Professional development for teachers and districts to integrate AI effectively and responsibly.",
    color: "bg-amber-100 text-amber-600",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Field-Building & Convening",
    description:
      "Connecting researchers, practitioners, developers, and policymakers to strengthen the AI-in-education ecosystem.",
    color: "bg-rose-100 text-rose-600",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Problem statement */}
      <section className="pt-10 pb-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              The AI gap in education is growing
            </h2>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Well-funded schools adopt AI tutoring and personalized learning while under-resourced schools fall further behind. Educators lack the evidence base and training to make informed decisions. The field needs open research, open tools, and practitioner support — not more vendor marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Program areas */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Four program areas
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Grounded in decades of learning science research, we work across four interconnected areas to ensure AI benefits every learner.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <ProgramCard key={program.title} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Research heritage */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-sm font-medium text-primary-light mb-4">
                Our foundation
              </div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                Built on decades of learning science
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Impact-Edu.ai is grounded in research from Carnegie Mellon&apos;s LearnLab and the Pittsburgh Science of Learning Center, which demonstrated that well-designed intelligent tutoring systems can dramatically improve student outcomes.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                We bring this research tradition into the current AI moment — combining rigorous evidence with open tools and training that the whole field can use.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Program areas", value: "4", accent: "text-indigo-600" },
                { label: "Focus", value: "Equity", accent: "text-amber-600" },
                { label: "All research", value: "Open", accent: "text-emerald-600" },
                { label: "All tools", value: "Open Source", accent: "text-rose-600" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 border border-border text-center hover:shadow-md transition-shadow"
                >
                  <div className={`text-3xl font-bold ${stat.accent}`}>{stat.value}</div>
                  <div className="text-sm text-muted mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Let&apos;s build a better future for AI in education
          </h2>
          <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
            Whether you&apos;re a researcher, educator, funder, or developer, there&apos;s a way to get involved.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
