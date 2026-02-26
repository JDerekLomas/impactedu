import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-lighter rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IE</span>
              </div>
              <span className="font-bold text-lg">
                Impact-Edu<span className="text-primary-lighter">.ai</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Advancing equitable access to AI-powered learning through open research, open tools, and practitioner training.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Navigate</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/programs" className="block text-sm text-gray-300 hover:text-white transition-colors">Programs</Link>
              <Link href="/contact" className="block text-sm text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">A Program Of</h3>
            <p className="text-sm text-gray-300">Wisdom Frontiers</p>
            <p className="text-sm text-gray-400 mt-1">A California nonprofit corporation</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Wisdom Frontiers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
