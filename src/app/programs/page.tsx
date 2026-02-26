import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Impact-Edu.ai's four program areas: Open Research, Open Tools, Practitioner Training, and Field-Building.",
};

const programs = [
  {
    id: "research",
    title: "Open Research",
    tagline: "Evidence that the whole field can use",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "bg-indigo-100 text-indigo-600",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    description:
      "We conduct and publish applied research on AI in education, making findings accessible to practitioners — not just academics.",
    items: [
      "Efficacy studies of AI tutoring and assessment tools in real classroom settings",
      "Investigations of how large language models can support (or hinder) deep learning",
      "Analysis of equity gaps in AI-powered education tools",
      "Development of measurement frameworks for AI learning impact",
    ],
  },
  {
    id: "tools",
    title: "Open Tools & Infrastructure",
    tagline: "Lowering the barrier to effective AI in education",
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "bg-emerald-100 text-emerald-600",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description:
      "We build and maintain open-source tools that lower the barrier to effective AI in education.",
    items: [
      "Open datasets for training and evaluating educational AI",
      "Reference implementations of evidence-based AI tutoring patterns",
      "Evaluation frameworks that help educators and districts assess AI tool quality",
      "Interoperability standards that prevent vendor lock-in",
    ],
  },
  {
    id: "training",
    title: "Practitioner Training",
    tagline: "Helping educators use AI effectively, not fearfully",
    color: "bg-amber-50 border-amber-200",
    iconColor: "bg-amber-100 text-amber-600",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description:
      "We train educators to be informed, critical, and effective users of AI in their classrooms and districts.",
    items: [
      "Professional development programs for teachers and instructional designers",
      "District-level AI integration planning support",
      "Train-the-trainer programs that scale through educator networks",
      "Practical guides and resources freely available online",
    ],
  },
  {
    id: "field-building",
    title: "Field-Building & Convening",
    tagline: "Strengthening the AI-in-education ecosystem",
    color: "bg-rose-50 border-rose-200",
    iconColor: "bg-rose-100 text-rose-600",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    description:
      "We strengthen the ecosystem connecting researchers, practitioners, developers, and policymakers.",
    items: [
      "Annual convening of researchers and practitioners working on AI in education",
      "Working groups on critical topics: assessment, equity, safety, efficacy",
      "Policy briefs that translate research into actionable guidance for decision-makers",
      "Community of practice for educators implementing AI tools",
    ],
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Our Programs
            </h1>
            <p className="mt-4 text-lg text-indigo-200 leading-relaxed">
              Four interconnected program areas grounded in learning science research, designed to ensure AI benefits every learner.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, index) => (
              <div
                key={program.id}
                id={program.id}
                className={`rounded-2xl border p-8 sm:p-10 ${program.color}`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${program.iconColor}`}
                  >
                    {program.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                      {program.title}
                    </h2>
                    <p className="text-primary-light font-medium mt-1">
                      {program.tagline}
                    </p>
                    <p className="mt-4 text-muted leading-relaxed max-w-2xl">
                      {program.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {program.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-primary-lighter mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Interested in partnering with us?
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            We&apos;re looking for research partners, school districts, funders, and developers who share our vision of equitable AI in education.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
