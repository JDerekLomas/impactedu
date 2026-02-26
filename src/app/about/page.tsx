import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Impact-Edu.ai's mission, approach, and leadership — advancing equitable AI in education.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              About Impact-Edu.ai
            </h1>
            <p className="mt-4 text-lg text-indigo-200 leading-relaxed">
              Open research, open tools, and practitioner training to ensure AI works for every learner.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-sm font-medium text-red-600 mb-4">
              The problem
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              AI is transforming education — but the benefits are accruing unevenly
            </h2>
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                Well-funded schools and families adopt AI tutoring tools, personalized learning systems, and intelligent practice platforms while under-resourced schools fall further behind. Meanwhile, educators lack the training and evidence base to make informed decisions about which AI tools actually improve learning outcomes.
              </p>
              <p>The field needs:</p>
            </div>
            <ul className="mt-4 space-y-3">
              {[
                ["Open research", "on what works, grounded in learning science — not vendor marketing"],
                ["Open tools and frameworks", "that any school, district, or developer can use"],
                ["Practitioner training", "that helps teachers integrate AI effectively, not fearfully"],
                ["Standards and evaluation", "so schools can distinguish effective AI tools from hype"],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-lighter flex-shrink-0" />
                  <span className="text-muted">
                    <strong className="text-foreground">{bold}</strong> {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-sm font-medium text-primary-light mb-4">
              Our approach
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Grounded in learning science, built for the AI moment
            </h2>
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                Impact-Edu.ai is grounded in decades of research from the learning sciences — particularly the work of Carnegie Mellon&apos;s LearnLab and the Pittsburgh Science of Learning Center — which demonstrated that well-designed intelligent tutoring systems can dramatically improve student outcomes.
              </p>
              <p>
                We bring this research tradition into the current AI moment through{" "}
                <Link href="/programs" className="text-primary-light hover:text-primary underline underline-offset-2">
                  four program areas
                </Link>
                : Open Research, Open Tools &amp; Infrastructure, Practitioner Training, and Field-Building &amp; Convening.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wisdom Frontiers relationship */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-sm font-medium text-amber-600 mb-4">
              Our structure
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              A program of Wisdom Frontiers
            </h2>
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                Impact-Edu.ai operates as a program of Wisdom Frontiers, a California nonprofit corporation. All funds are received and administered by Wisdom Frontiers, with independent board oversight of all program decisions including budgets, partnerships, and research agendas.
              </p>
              <p>
                All work products funded through Impact-Edu.ai are published openly — open access, open source, Creative Commons — and are not the proprietary property of any commercial entity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-sm font-medium text-emerald-600 mb-4">
              Leadership
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-8">
              Our team
            </h2>

            <div className="bg-white rounded-2xl border border-border p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-bold">DL</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Derek Lomas, PhD</h3>
                  <p className="text-primary-light font-medium">Program Director</p>
                  <p className="mt-3 text-muted leading-relaxed">
                    Dr. Lomas earned his PhD in Human-Computer Interaction from Carnegie Mellon University under Ken Koedinger, one of the founders of the intelligent tutoring systems field. His research spans learning science, game design, and AI-powered education. He brings deep relationships across the AI and education research communities, philanthropic organizations, and the edtech industry.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl border border-border p-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">Advisory Board</h3>
              <p className="text-muted leading-relaxed">
                Impact-Edu.ai is convening an advisory board of leading researchers, practitioners, and policy experts to guide program strategy and ensure rigor and relevance. Details coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Want to learn more?
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Explore our programs or get in touch to discuss how we can work together.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
            >
              Our Programs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-surface transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
