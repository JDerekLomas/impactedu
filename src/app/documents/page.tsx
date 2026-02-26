import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Documents",
  description: "Impact-Edu.ai organizational documents for board members and funders.",
};

const documents = [
  {
    title: "Program Description",
    description: "Impact-Edu.ai mission, approach, program areas, leadership, and budget overview.",
    category: "Program",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    href: "/docs/impact-edu-program-description.pdf",
    available: false,
  },
  {
    title: "Conflict of Interest Policy",
    description: "Wisdom Frontiers conflict of interest policy with Impact-Edu.ai specific disclosures.",
    category: "Governance",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    href: "/docs/conflict-of-interest-policy.pdf",
    available: false,
  },
  {
    title: "Budget",
    description: "Annual budget and financial projections.",
    category: "Financial",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: "#",
    available: false,
  },
  {
    title: "Board Minutes",
    description: "Minutes from board of directors meetings.",
    category: "Governance",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    href: "#",
    available: false,
  },
];

export default async function DocumentsPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/documents/login");
  }

  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-indigo-200 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Authorized access
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Documents
            </h1>
            <p className="mt-4 text-lg text-indigo-200 leading-relaxed">
              Organizational documents for board members and funders.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className={`relative p-6 bg-white rounded-2xl border border-border ${
                  doc.available
                    ? "hover:border-primary-lighter/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
                    : "opacity-60"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center flex-shrink-0 text-muted">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted uppercase tracking-wider">
                        {doc.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mt-1">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-muted mt-1 leading-relaxed">
                      {doc.description}
                    </p>
                    {doc.available ? (
                      <a
                        href={doc.href}
                        className="mt-3 inline-flex items-center text-sm font-medium text-primary-lighter hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download PDF
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </a>
                    ) : (
                      <span className="mt-3 inline-flex items-center text-sm text-muted-light">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-surface rounded-xl border border-border text-center">
            <p className="text-sm text-muted">
              Need additional documents or have questions? Contact{" "}
              <a href="mailto:hello@impact-edu.ai" className="text-primary-light hover:text-primary">
                hello@impact-edu.ai
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
