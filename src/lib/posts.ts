export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string; // HTML
}

const posts: Post[] = [
  {
    slug: "open-items-knowledge-graph",
    title: "Building an Open Assessment Pipeline on the Learning Commons Knowledge Graph",
    date: "2026-02-26",
    description:
      "We built Open Items — 34K+ CC-licensed assessment items with AI generation and LLM evaluation — as the first applied project on the CZI Learning Commons Knowledge Graph. Here's what we learned about building the open applied layer on top of open infrastructure.",
    content: `
      <p>There's a gap in AI and education. CZI built the <a href="https://learningcommons.org">Learning Commons Knowledge Graph</a> — 250,000 standards, 2,000 learning components, 273,000 relationships mapping how K-12 math concepts connect. Student Achievement Partners built the Coherence Map showing how standards build on each other across grades. This is remarkable infrastructure.</p>

      <p>But infrastructure alone doesn't change classrooms.</p>

      <p>Someone has to build the applied layer — the tools that turn knowledge graphs into student-facing practice, that use learning progressions to generate adaptive sequences, that evaluate AI-generated content against the standards those graphs encode. That's what we built with <a href="/openitems">Open Items</a>.</p>

      <h3>What Open Items is</h3>

      <p>Open Items is open assessment infrastructure for K-12 education: 34,000+ CC-licensed assessment items with AI generation, LLM evaluation, and adaptive practice. It's built directly on the Learning Commons Knowledge Graph, which means every item is aligned to standards through the same graph that CZI, state departments of education, and curriculum developers use.</p>

      <p>The pipeline works like this:</p>

      <ol>
        <li><strong>Standards come from the Knowledge Graph.</strong> We import frameworks, standards, and learning components directly from the CASE Network. When we generate items for "3.NF.A.1," we're referencing the same canonical standard that every other system using the graph sees.</li>
        <li><strong>AI generates items aligned to those standards.</strong> Using Gemini 3 Flash, we generate 7-item difficulty sequences per skill — from easy direct application through hard transfer problems. Each sequence costs fractions of a cent.</li>
        <li><strong>LLM evaluators score quality on 5 dimensions.</strong> Factual accuracy, grade appropriateness, pedagogical soundness, schema validity, and completeness. Items scoring above threshold are auto-approved (85% pass rate). The rest go to human reviewers.</li>
        <li><strong>Human reviewers approve or revise.</strong> Nothing reaches students without a human sign-off. The evaluation pipeline handles volume; humans handle judgment.</li>
        <li><strong>Students practice adaptively.</strong> Elo-rated difficulty calibration adjusts to each learner. The Knowledge Graph's prerequisite relationships enable diagnostic placement and remediation suggestions.</li>
      </ol>

      <h3>Why the Knowledge Graph matters</h3>

      <p>Before the Knowledge Graph, every ed-tech company maintained its own standards mapping. Company A's version of "3.NF.A.1" might be subtly different from Company B's. Alignment was self-reported and unverifiable. Curriculum coherence — how concepts build on each other across grades — was invisible.</p>

      <p>The Knowledge Graph changes this. It provides a shared, canonical representation of educational standards with explicit relationships: prerequisites, equivalences, alignments across frameworks. When we say an item is aligned to a standard, that alignment is traceable through a public graph that anyone can inspect.</p>

      <p>For Open Items specifically, the graph enables three things we couldn't do before:</p>

      <ul>
        <li><strong>Prerequisite-aware generation.</strong> When generating items for a 5th-grade fractions skill, we can traverse the graph backward to identify prerequisite 3rd-grade concepts and generate scaffolding items that address gaps.</li>
        <li><strong>Cross-framework alignment.</strong> Items aligned to Common Core automatically map to state-specific versions of the same standards — California, Texas, New York — through the graph's equivalence relationships.</li>
        <li><strong>Coverage analysis at scale.</strong> We can see exactly which learning components have items, which don't, and where the gaps are — across the entire K-12 math landscape.</li>
      </ul>

      <h3>What we've learned so far</h3>

      <p><strong>AI generation is cheap but evaluation is the bottleneck.</strong> Generating a full K-12 item bank costs $25-50. But ensuring those items are mathematically correct, grade-appropriate, and pedagogically sound — that's where the real work is. Our LLM evaluation pipeline gets 98% mathematical accuracy, but the 2% that slip through can be seriously wrong. Human review remains essential.</p>

      <p><strong>The graph is more useful than we expected.</strong> We initially treated it as a standards lookup table. But the prerequisite relationships turned out to be the most valuable part — they enable adaptive learning paths, diagnostic placement, and intelligent remediation that actually follow the mathematical structure of K-12 learning.</p>

      <p><strong>Open infrastructure creates compound value.</strong> Every item we generate, evaluate, and calibrate adds to a public commons that any researcher, teacher, or tool builder can use. This is the opposite of the proprietary model where each company's item bank is locked behind licensing agreements. An open item bank with open psychometric data is a public good that gets more valuable as more people use it.</p>

      <h3>What we're building toward</h3>

      <p>Open Items is one applied project on top of the Knowledge Graph. We think there should be many. The graph is infrastructure; it's designed to be built on. We're publishing everything — code, items, psychometric data, evaluation results — so others can build on our work just as we built on CZI's.</p>

      <p>If you're building on the Learning Commons Knowledge Graph, or thinking about it, we'd love to compare notes. If you're a researcher who needs calibrated assessment items for a study, our item bank is CC-licensed and ready. If you're building educational tools and want to integrate open items via API, we're building that too.</p>

      <p>The source code is on <a href="https://github.com/JDerekLomas/open-items">GitHub</a>. The live platform is at <a href="/openitems">impact-edu.ai/openitems</a>. Everything is open.</p>
    `,
  },
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
