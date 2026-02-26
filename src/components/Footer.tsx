import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-[family-name:var(--font-source-serif)] font-bold text-lg text-foreground">
              Impact-Edu<span className="text-accent">.ai</span>
            </span>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
              Research and tools for equitable AI in education. A program of Wisdom Frontiers.
            </p>
          </div>

          <div>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">Navigate</p>
            <div className="space-y-1.5">
              <Link href="/about" className="block text-sm text-muted hover:text-foreground transition-colors">About</Link>
              <Link href="/work" className="block text-sm text-muted hover:text-foreground transition-colors">Work</Link>
              <Link href="/programs" className="block text-sm text-muted hover:text-foreground transition-colors">Programs</Link>
              <Link href="/blog" className="block text-sm text-muted hover:text-foreground transition-colors">Blog</Link>
              <Link href="/roadmap" className="block text-sm text-muted hover:text-foreground transition-colors">Roadmap</Link>
              <Link href="/contact" className="block text-sm text-muted hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">Organization</p>
            <p className="text-sm text-muted">A program of Wisdom Frontiers</p>
            <p className="text-sm text-muted-light mt-0.5">California nonprofit corporation</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-light">
            &copy; {new Date().getFullYear()} Wisdom Frontiers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
