import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes from Impact-Edu.ai — research updates, reflections, and dispatches from the intersection of AI and education.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="py-16 dot-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted mb-3">
            Field notes
          </p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-3xl sm:text-4xl font-bold text-foreground leading-snug max-w-2xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            Research updates, reflections, and dispatches from the intersection of AI and education.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Notebook illustration as decorative element */}
          <div className="flex justify-center mb-16">
            <Image
              src="/illustrations/notebook-1.png"
              alt="Pencil sketch of a researcher's notebook with diagrams and annotations"
              width={320}
              height={227}
              className="opacity-40 mix-blend-multiply"
            />
          </div>

          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <time className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider text-muted-light">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 font-[family-name:var(--font-source-serif)] text-xl sm:text-2xl font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-muted leading-relaxed">
                    {post.description}
                  </p>
                  <span className="mt-3 inline-block text-sm text-accent group-hover:text-accent-light transition-colors">
                    Read more &rarr;
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
