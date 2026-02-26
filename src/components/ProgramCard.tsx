import Link from "next/link";

interface ProgramCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function ProgramCard({ title, description, icon, color }: ProgramCardProps) {
  return (
    <Link href="/programs" className="group block">
      <div className="relative h-full p-6 bg-white rounded-2xl border border-border hover:border-primary-lighter/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary-light transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center text-sm font-medium text-primary-lighter opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more
          <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
