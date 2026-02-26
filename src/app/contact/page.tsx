import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Impact-Edu.ai — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-indigo-200 leading-relaxed">
              Whether you&apos;re a researcher, educator, funder, or developer — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight mb-6">
                Get in touch
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                We&apos;re interested in connecting with researchers, educators, school districts, philanthropic organizations, and developers who share our commitment to equitable AI in education.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <a
                      href="mailto:hello@impact-edu.ai"
                      className="text-primary-light hover:text-primary transition-colors"
                    >
                      hello@impact-edu.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Program Director</h3>
                    <p className="text-muted">Derek Lomas, PhD</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Website</h3>
                    <a
                      href="https://impact-edu.ai"
                      className="text-primary-light hover:text-primary transition-colors"
                    >
                      impact-edu.ai
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-surface rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-2">A program of Wisdom Frontiers</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Impact-Edu.ai is a program of Wisdom Frontiers, a California nonprofit corporation. All inquiries about organizational matters, governance, or fiscal questions should be directed to Wisdom Frontiers.
                </p>
              </div>
            </div>

            {/* Areas of interest */}
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight mb-6">
                How you can get involved
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Researchers",
                    description:
                      "Partner with us on studies of AI tool efficacy, equity analyses, or measurement framework development.",
                    color: "bg-indigo-50 border-indigo-100",
                  },
                  {
                    title: "Educators & Districts",
                    description:
                      "Join our practitioner training programs, participate in research studies, or pilot open tools in your classrooms.",
                    color: "bg-amber-50 border-amber-100",
                  },
                  {
                    title: "Funders & Foundations",
                    description:
                      "Support open research, open-source tools, and practitioner training that benefits the entire field.",
                    color: "bg-emerald-50 border-emerald-100",
                  },
                  {
                    title: "Developers",
                    description:
                      "Contribute to open-source tools, help build evaluation frameworks, or develop reference implementations.",
                    color: "bg-rose-50 border-rose-100",
                  },
                ].map((area) => (
                  <div
                    key={area.title}
                    className={`p-6 rounded-xl border ${area.color}`}
                  >
                    <h3 className="font-semibold text-foreground mb-1">{area.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{area.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
