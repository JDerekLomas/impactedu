# J-PAL Project AI Evidence (PAIE) — Full RCT Proposal
## Impact-Edu.ai (Wisdom Frontiers)

**Initiative:** Project AI Evidence (PAIE) — Winter 2026 RFP
**Proposal Type:** Full Randomized Controlled Trial
**Requested Amount:** $200,000 USD
**Duration:** 24 months
**PI:** Derek Lomas, PhD (Carnegie Mellon HCI)
**Co-PI:** [J-PAL Affiliate — To Be Confirmed]
**Geography:** Rajasthan, India

---

## 1. Research Question

**Primary:** What is the causal effect of AI-powered adaptive learning tools on educational achievement, psychological wellbeing, and economic outcomes for different age groups in India?

**Secondary:**
- Does AI personalization (as opposed to digital content access alone) drive observed effects?
- At what age does AI-powered learning produce the greatest return per dollar invested?
- What mechanisms mediate AI's impact at each developmental stage?
- Does AI access widen or narrow existing equity gaps (by gender, caste, SES, baseline ability)?

## 2. Motivation

### The Evidence Gap
The existing evidence base for AI in education — while growing — has three critical limitations:

1. **Single-cohort designs.** Every major AI-education RCT (Mindspark, Pratham CAL, Rocketship, MIT J-WEL) tests one age group. The field cannot answer the policy-relevant question: where should governments invest in AI-powered learning for maximum impact?

2. **Learning outcomes only.** Most studies measure test scores. J-PAL's PAIE initiative explicitly calls for evidence on "how AI helps or harms the wellbeing of people experiencing poverty." There is almost no causal evidence linking AI learning tools to wellbeing, self-efficacy, economic outcomes, or household-level impacts.

3. **Pre-LLM interventions.** The Mindspark studies (2019, 2024) tested pre-LLM adaptive software. The current generation of AI tools — conversational tutoring, multilingual voice interaction, open-ended feedback — represents a qualitative leap that requires fresh evaluation.

### Why India, Why Now
- 600M+ people under 25 — the world's largest potential beneficiary population
- Documented learning crisis: 50%+ of Grade 5 students below Grade 2 reading level (ASER 2024)
- Government commitment to ed-tech (DIKSHA, PM eVIDYA, NEP 2020 technology provisions)
- Mature RCT infrastructure through J-PAL South Asia
- Our team's existing operational presence: SmartPaper has processed 5M+ assessments in Rajasthan government schools

### Why This Study for PAIE
PAIE seeks studies that examine "how AI-based innovations can improve the lives of people experiencing poverty." This study is distinctive because:
- It measures **wellbeing and economic outcomes alongside learning** — directly responding to PAIE's scope
- It compares AI impact **across the lifespan** — producing allocative efficiency evidence
- It isolates the **AI personalization mechanism** through a three-arm design
- It uses **open-source tools** — ensuring replicability and public benefit
- It builds on **existing infrastructure in India** — reducing implementation risk

## 3. Intervention

### AI-Adaptive Learning Platform (Treatment 1)
An open-source, LLM-powered adaptive learning platform deployed across four age cohorts:

**Technical Architecture:**
- **Content layer:** 34,000+ CC-licensed assessment items from Impact-Edu.ai's Open Items, calibrated by difficulty using Elo ratings, mapped to Indian curriculum standards (NCF 2023, NCERT, NSQF)
- **Adaptation engine:** Bayesian knowledge tracing + item response theory for mastery estimation; optimal item selection based on individual learning frontiers
- **LLM tutoring:** Conversational tutoring in Hindi and English; misconception detection; Socratic questioning; scaffolded hints
- **Voice interface:** Speech-to-text and text-to-speech for low-literacy participants (Cohorts C, D)
- **Assessment integration:** SmartPaper for paper-based pre/post testing (eliminates device dependency for outcome measurement)

**Delivery:**
- Cohorts A (ages 6-10) and B (ages 11-15): Shared tablets in school computer labs, 30 minutes daily
- Cohorts C (ages 16-20) and D (ages 21-30): Personal smartphones (BYOD) with data subsidy + community center access

### Digital-Basic Platform (Treatment 2)
Identical content library delivered in a fixed sequence — no AI personalization, no LLM interaction, no adaptive difficulty selection. Controls for Hawthorne effect, device novelty, and digital content access.

### Control
Status quo educational resources. Control group receives delayed access to the AI platform after endline (waitlist design).

## 4. Experimental Design

### Design
Stratified cluster-randomized controlled trial with four age cohorts, three arms per cohort.

### Sample

| Cohort | Age | Setting | N | Randomization |
|--------|-----|---------|---|--------------|
| A: Children | 6-10 | Government primary schools | 1,500 | School-level cluster |
| B: Adolescents | 11-15 | Government upper primary/secondary | 1,500 | School-level cluster |
| C: Youth | 16-20 | ITIs, polytechnics, community centers | 1,500 | Individual |
| D: Adults | 21-30 | Community centers, SHGs, workplaces | 1,500 | Individual |

**Total N = 6,000** (500 per arm × 3 arms × 4 cohorts)

### Stratification Variables
- Urban/rural
- Baseline learning level (above/below median)
- Gender

### Power
MDES = 0.20 SD within each cohort (conservative, below Mindspark's 0.37 SD average and at the 0.22 SD personalization-specific effect). Power = 0.80, α = 0.05, ICC = 0.15 for clustered cohorts, 15% anticipated attrition. N = 500 per arm provides adequate power for within-cohort treatment effects and pre-specified heterogeneity analyses.

## 5. Outcome Measures

### Primary Outcomes

**Learning (all cohorts):**
- Standardized math/literacy scores via SmartPaper adaptive assessment (Cohorts A, B)
- Vocational skill competency via NSQF-aligned practical assessment (Cohorts C, D)
- Measured at: Baseline, Midline (Month 3), Endline (Month 6), Follow-up (Month 18)

**Wellbeing (all cohorts):**
- General Self-Efficacy Scale (Hindi-validated, Schwarzer & Jerusalem)
- WHO-5 Well-Being Index
- Rosenberg Self-Esteem Scale (adapted)
- Agency/locus of control (adapted from World Values Survey)
- Measured at: Baseline, Endline, Follow-up

**Economic (Cohorts C, D):**
- Monthly individual income (self-report + mobile money verification where available)
- Employment status and quality (ILO standard module)
- Household expenditure (consumption module)
- Measured at: Baseline, Follow-up (Month 18)

### Secondary Outcomes
- School attendance and dropout (Cohorts A, B — administrative records)
- Digital literacy (ICDL-equivalent, Cohorts C, D)
- Educational and career aspirations (Cohorts B, C, D)
- Self-regulated learning behaviors (SRL questionnaire)
- Intra-household spillovers (ASER-style assessment of siblings/children)

### Pre-Specified Heterogeneity
- Gender (male vs. female)
- Baseline learning level (below grade vs. at/above)
- SES (BPL card, parental education)
- Caste (SC/ST/OBC/General)
- Urban vs. rural
- Prior technology exposure

## 6. Identification Strategy

The three-arm design enables clean identification:

- **T1 vs. C** = Total effect of AI-adaptive platform (including device access, content, AI)
- **T1 vs. T2** = Effect of AI personalization specifically (holding device + content constant)
- **T2 vs. C** = Effect of digital content access alone

The **cross-cohort comparison** (T1 vs. C effect size in Cohort A vs. B vs. C vs. D) provides the novel allocative efficiency evidence — where does AI produce the highest return?

Cluster randomization at the school level (Cohorts A, B) prevents within-school contamination. Individual randomization (Cohorts C, D) is feasible given non-classroom settings.

## 7. Potential Threats and Mitigation

| Threat | Mitigation |
|--------|-----------|
| Differential attrition | Endline incentives; monitoring dashboards; ITT as primary specification |
| Control group contamination | School-level clustering for A/B; monitoring of control access to AI tools |
| Hawthorne effect | T2 arm controls for attention/novelty |
| Implementation variation across cohorts | Standardized protocols; fidelity monitoring; per-cohort TOT analysis |
| Low usage/compliance | Daily facilitated sessions (A/B); SMS nudges + usage dashboards (C/D) |
| Connectivity failures | Offline-capable platform; content pre-cached on devices |
| Spillovers | Measure intra-household spillovers as secondary outcome |

## 8. Timeline

| Phase | Months | Activities |
|-------|--------|-----------|
| Setup | 1-3 | IRB, government MOUs, platform localization, training, recruitment |
| Baseline | 4 | Baseline assessment, randomization |
| Intervention | 5-10 | 6 months of AI tool access; midline at Month 7 |
| Endline | 11 | Endline assessment, qualitative subsample |
| Analysis I | 12-14 | Short-run analysis, working paper draft |
| Follow-up | 18 | 12-month follow-up (persistence, economic outcomes) |
| Analysis II | 19-24 | Full analysis, journal submission, policy briefs |

## 9. Budget

| Category | Amount |
|----------|--------|
| Field team (PM, coordinators, enumerators) | $55,000 |
| Platform development & maintenance | $30,000 |
| Devices & connectivity | $25,000 |
| Assessment & data collection (4 rounds × 6,000) | $30,000 |
| PI & Co-PI time | $25,000 |
| Travel | $15,000 |
| Data management & analysis | $10,000 |
| Overhead (5%) | $10,000 |
| **Total** | **$200,000** |

**Note:** This budget assumes co-funding or in-kind contributions for several components:
- SmartPaper assessment infrastructure (existing, no incremental cost for basic deployment)
- Open Items content library (existing, CC-licensed)
- India-based institutional overhead covered by co-PI's institution
- Full platform development costs partially covered by Impact-Edu.ai's ongoing tool development budget

If PAIE funding is the sole source, the study can be executed with reduced scope (2 cohorts instead of 4, N=3,000) within this budget. We will pursue complementary funding from Gates Grand Challenges India ($100K) and Central Square Foundation for full four-cohort implementation.

## 10. Team and Qualifications

### Derek Lomas, PhD — Principal Investigator
- PhD, Human-Computer Interaction, Carnegie Mellon University (advisor: Ken Koedinger)
- 75+ peer-reviewed publications (CHI, AIED, EDM, L@S, JCAL, IEEE, Springer)
- Research involving 70,000+ experimental subjects
- Creator of SmartPaper (5M+ assessments in Indian government schools, UNESCO-recognized)
- Co-founder, Play Power Labs (15M+ students across US and India)
- Program Director, Impact-Edu.ai (Wisdom Frontiers)

### Co-PI — [J-PAL Affiliate, To Be Confirmed]
- [Required: J-PAL network affiliate or invited researcher with education/development economics background and India RCT experience]
- [Target profiles: Faculty at ISI Delhi, IIM Bangalore, IGIDR, or US institution with active J-PAL South Asia collaboration]

### Implementation
- India-based project manager with RCT field experience
- Field coordination through established survey firm (e.g., Morsel Research, which supports multiple J-PAL studies in Rajasthan)
- SmartPaper technical team for assessment deployment

## 11. Relevance to PAIE Mission

This study directly addresses PAIE's three stated priorities:

1. **"How AI-based innovations can improve the lives of people experiencing poverty"** — All four cohorts target government school students and low-income community members in Rajasthan, one of India's least-developed states.

2. **"Wellbeing"** — We measure self-efficacy, agency, and life satisfaction alongside learning outcomes — an explicit gap PAIE identifies.

3. **"Rigorous causal evidence"** — Three-arm cluster-RCT with pre-registered analysis plan, AEA registration, and publication commitment.

The study also advances PAIE's capacity-building goal by producing open-source tools and open data that enable future researchers to conduct AI-education evaluations at lower cost.

## 12. Data and Dissemination

- **Pre-registration:** AEA RCT Registry + RIDIE
- **Pre-analysis plan:** Filed before endline, publicly available
- **Open data:** De-identified datasets on Harvard Dataverse (CC-BY)
- **Open tools:** Platform code, assessment instruments, and implementation protocols on GitHub (MIT license)
- **Publications:** Target AER, JDE, or AEJ: Applied Economics; all gold open access
- **Policy:** Briefs for MHRD, NITI Aayog, Rajasthan state education department
- **J-PAL Policy Insights:** Summary for practitioner and policy audiences

---

**Contact:**
Derek Lomas, PhD
Program Director, Impact-Edu.ai — A Program of Wisdom Frontiers
https://impact-edu.ai

---

*All research funded through Impact-Edu.ai is published openly. All tools are open-source. All data is shared for replication.*
