export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string; // HTML
}

const posts: Post[] = [
  {
    slug: "why-we-started",
    title: "Why We Started Impact-Edu.ai",
    date: "2026-02-15",
    description:
      "Education has a crisis of purpose. AI changes what students need to know — but nobody has the evidence to say what matters now. That's the gap we're filling.",
    content: `
      <p>For the past decade, our team has been building AI-powered education tools — adaptive assessments, learning games, computer vision for paper worksheets. These tools have reached 15 million students across the US and India.</p>
      <p>But the deeper we got into the work, the clearer a problem became: <strong>we don't know if we're teaching the right things.</strong></p>
      <p>Education's standards were designed before AI existed. The Common Core has no sense of priority — no way to say which objectives matter most when a student can ask ChatGPT to do their homework. The process of updating standards takes years. Meanwhile, AI is being adopted in classrooms faster than anyone can study its effects.</p>
      <p>Well-funded schools experiment. Under-resourced schools fall further behind. Vendors make claims nobody can verify. Teachers make decisions with no evidence to guide them.</p>
      <p>Impact-Edu.ai exists to close that gap. We build the open research infrastructure — assessments, datasets, evaluation frameworks, practitioner training — that the field needs to figure out what matters in an AI age and whether we're actually teaching it.</p>
      <p>Everything we produce is open: open access, open source, Creative Commons. Because the answers to "what should students learn?" shouldn't be locked behind a paywall.</p>
    `,
  },
  {
    slug: "aied-2026",
    title: "AIED 2026: LLM Difficulty Estimation Across 200 Conditions",
    date: "2026-02-20",
    description:
      "Our paper on using large language models to estimate item difficulty has been accepted at AIED 2026. Here's what we found across 15+ models and 200 experimental conditions.",
    content: `
      <p>We're presenting new work at <strong>AIED 2026</strong> on a question that matters for anyone building AI-powered assessments: can large language models accurately estimate how hard a test question is?</p>
      <p>Item difficulty estimation is foundational to adaptive testing, item bank development, and quality assurance. Traditional methods require hundreds of student responses per item. If LLMs could reliably estimate difficulty from the item text alone, it would dramatically accelerate assessment development — especially for new content areas where student data doesn't yet exist.</p>
      <h3>What we tested</h3>
      <p>We evaluated 15+ language models across 200 experimental conditions, varying prompt strategies, item formats, subject areas, and grade levels. We used our open item bank of 34,000+ CC-licensed assessment items with known psychometric parameters as ground truth.</p>
      <h3>Key findings</h3>
      <p>The short version: LLMs can estimate difficulty, but with important caveats. Performance varies significantly by model, subject area, and prompt strategy. Some combinations achieve correlations above 0.7 with empirical difficulty — useful for rough calibration. Others fail badly, especially on items that are hard for reasons LLMs don't naturally attend to (misleading distractors, reading load, prerequisite knowledge gaps).</p>
      <p>The full paper, dataset, and evaluation code will be published openly after the conference. This is exactly the kind of infrastructure work Impact-Edu.ai was built to do: rigorous evaluation that benefits the entire field, not just one vendor.</p>
    `,
  },
];

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
