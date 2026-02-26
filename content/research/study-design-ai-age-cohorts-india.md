# Study Design: Impact of AI-Powered Learning Across the Lifespan in India

**Impact-Edu.ai — A Program of Wisdom Frontiers**
**Principal Investigator:** Derek Lomas, PhD (Carnegie Mellon HCI)
**Draft Date:** February 2026

---

## 1. Research Overview

### Title
**AI Across Ages: A Multi-Cohort Randomized Controlled Trial of AI-Powered Learning Tools on Educational, Wellbeing, and Economic Outcomes in India**

### Core Question
At what age does access to AI-powered learning tools produce the greatest impact on educational achievement, psychological wellbeing, and economic trajectory — and through what mechanisms?

### Why This Matters
Nearly every AI-in-education study to date has tested a single tool with a single age group. The field has no comparative evidence on where AI learning interventions produce the highest return across the human lifespan. This study provides that evidence, directly informing how governments and funders should allocate AI-education investment.

India is the ideal context: the world's largest youth population (600M+ under 25), massive variation in educational infrastructure, existing government digital initiatives (DIKSHA, PM eVIDYA), and a proven track record of rigorous education RCTs through J-PAL South Asia.

### Innovation
No existing study compares AI learning interventions across age cohorts within the same context using a unified measurement framework. This design allows direct comparison of effect sizes, cost-effectiveness ratios, and mechanism pathways across developmental stages — producing actionable evidence for resource allocation.

---

## 2. Theoretical Framework

### Why Age Matters for AI Impact
The impact of AI learning tools likely varies by age for several reasons:

1. **Developmental readiness.** Younger children may benefit most from adaptive scaffolding (Vygotsky's ZPD), while older learners may benefit from AI-supported self-regulation and metacognition.
2. **Baseline gaps.** India's learning crisis is most acute at the foundational level — 50%+ of Grade 5 students cannot read Grade 2 text (ASER 2024). AI may have the largest absolute effect where gaps are largest.
3. **Compounding returns.** Earlier interventions compound over more years of schooling, but later interventions may have more immediate economic returns (vocational skills, employability).
4. **Substitution vs. complement.** For younger children, AI supplements teacher instruction. For adults, AI may substitute for formal education entirely (second-chance learning, upskilling).
5. **Wellbeing pathways.** AI's effect on self-efficacy, agency, and motivation may differ dramatically by developmental stage.

### Theory of Change

```
AI Tool Access → Personalized Learning → [Age-Specific Mechanisms] → Outcomes

Mechanisms by cohort:
  Children (6-10):  Foundational mastery → School persistence → Long-term trajectories
  Adolescents (11-15): Grade-level catch-up → Self-efficacy → Reduced dropout
  Youth (16-20): Skill acquisition → Employability → Income
  Adults (21-30): Upskilling/reskilling → Labor market mobility → Household income
```

---

## 3. Study Design

### Design Type
Stratified cluster-randomized controlled trial (RCT) with four age cohorts, two treatment arms, and one control arm per cohort.

### Arms

| Arm | Description | N per cohort |
|-----|-------------|-------------|
| **T1: AI-Adaptive** | Access to AI-powered adaptive learning platform (personalized content, LLM-based tutoring, progress tracking) | 500 |
| **T2: Digital-Basic** | Access to equivalent digital content without AI personalization (same content, fixed sequence, no adaptation) | 500 |
| **C: Control** | Status quo — existing educational resources only | 500 |

**Rationale for T2:** The Mindspark Rajasthan study (Muralidharan et al.) demonstrated that isolating the personalization mechanism is critical. T2 controls for the Hawthorne effect, device novelty, and digital content access, allowing clean identification of AI-specific impact.

### Age Cohorts

| Cohort | Age Range | N | Setting | Intervention Focus |
|--------|-----------|---|---------|-------------------|
| **A: Children** | 6–10 | 1,500 | Government primary schools | Foundational literacy & numeracy via adaptive practice |
| **B: Adolescents** | 11–15 | 1,500 | Government upper primary / secondary schools | Grade-level math & science via AI tutoring |
| **C: Youth** | 16–20 | 1,500 | ITIs, polytechnics, community centers | Vocational skills & employability via AI-guided learning |
| **D: Adults** | 21–30 | 1,500 | Community centers, self-help groups, workplaces | Digital literacy, financial literacy, upskilling via AI tools |

**Total sample: 6,000 participants** (1,500 per cohort × 4 cohorts)

### Randomization
- **Cohorts A & B:** Cluster-randomized at the school level (to avoid contamination). Approximately 30 schools per cohort, 10 per arm, ~50 students per school.
- **Cohorts C & D:** Individual-level randomization within recruitment sites (less contamination risk in non-classroom settings).

### Duration
- **Intervention period:** 6 months of active AI tool access
- **Endline assessment:** Immediately post-intervention (Month 6)
- **Follow-up:** 12 months post-intervention (Month 18) for persistence and economic outcomes

---

## 4. Intervention: AI Learning Platform

### Platform Design
The intervention deploys an AI-powered learning platform adapted for each cohort, built on Impact-Edu.ai's Open Items infrastructure and SmartPaper assessment system.

**Core AI Features (T1 only):**
- Adaptive item selection using Elo-rated difficulty calibration (from Open Items' 34K+ item bank)
- LLM-powered conversational tutoring in Hindi, English, and Rajasthani
- Real-time misconception detection and targeted remediation
- Spaced repetition scheduling based on individual mastery curves
- Voice-based interaction for low-literacy users (Cohorts C & D)

**Digital-Basic Features (T2):**
- Same content library, fixed difficulty sequence
- No personalization, no LLM interaction
- Standard progress tracking (completion-based, not mastery-based)

**Delivery Modes:**
- Cohorts A & B: Shared tablets in school computer labs (30-minute daily sessions)
- Cohorts C & D: Personal smartphones (BYOD) with data subsidy + community center access points

### Content by Cohort

| Cohort | Content Domain | Aligned Standards |
|--------|---------------|-------------------|
| A (6-10) | Foundational literacy (Hindi/English) + numeracy | NCF 2023, NIPUN Bharat targets |
| B (11-15) | Mathematics (Grades 6-10) + science | NCERT curriculum, mapped to Open Items |
| C (16-20) | Digital skills, basic English, financial literacy, trade-specific modules | NSQF Level 1-4 competencies |
| D (21-30) | Financial literacy, digital government services, vocational upskilling | NSQF + industry skill councils |

---

## 5. Outcome Measures

### Primary Outcomes

| Domain | Measure | Cohorts | Instrument | Timing |
|--------|---------|---------|------------|--------|
| **Learning** | Standardized test scores (math, literacy) | A, B | ASER-style + custom adaptive assessment via SmartPaper | Baseline, Midline, Endline, Follow-up |
| **Learning** | Skill mastery (vocational competencies) | C, D | NSQF-aligned practical assessments | Baseline, Endline, Follow-up |
| **Wellbeing** | Psychological wellbeing (self-efficacy, agency, life satisfaction) | All | Adapted Rosenberg Self-Esteem Scale, General Self-Efficacy Scale (Hindi-validated), WHO-5 | Baseline, Endline, Follow-up |
| **Economic** | Monthly income / household expenditure | C, D | Survey instrument + mobile money records where available | Baseline, Follow-up |
| **Economic** | Employment status and quality | C, D | ILO-standard employment module | Baseline, Follow-up |

### Secondary Outcomes

| Domain | Measure | Cohorts | Instrument |
|--------|---------|---------|------------|
| School attendance | Daily attendance records | A, B | School MIS + spot checks |
| Dropout rate | Enrollment persistence | A, B | School records |
| Time-on-task | Platform usage analytics | All (T1, T2) | Built-in telemetry |
| Learning behaviors | Self-regulated learning strategies | B, C, D | SRL questionnaire (adapted) |
| Digital literacy | ICDL-equivalent assessment | C, D | Custom assessment |
| Aspirations | Educational and career aspirations | B, C, D | Structured interview |
| Intra-household spillovers | Sibling/child learning outcomes | C, D | ASER-style assessment of household members |

### Heterogeneity Analysis (Pre-Specified)
- Gender (male vs. female)
- Baseline learning level (below grade vs. at/above grade)
- Socioeconomic status (BPL card status, parental education)
- Caste category (SC/ST/OBC/General)
- Urban vs. rural
- Prior device/internet exposure

---

## 6. Power Calculations

Based on Mindspark Delhi (0.37 SD in math) and Rajasthan (0.22 SD for personalization-specific effect) as benchmarks:

**Assumptions:**
- Minimum detectable effect size (MDES): 0.20 SD (conservative, based on personalization-specific effects)
- Significance level: α = 0.05
- Power: 0.80
- ICC for clustered cohorts (A, B): 0.15 (typical for Indian government schools)
- Attrition: 15%

**Required sample per arm:**
- Individual randomization (C, D): ~400 per arm → 500 with 20% buffer
- Cluster randomization (A, B): ~450 per arm with 10 clusters → 500 with buffer

**Total: 1,500 per cohort (500 × 3 arms) = 6,000 total**

This provides 80% power to detect a 0.20 SD effect within each cohort, and sufficient power for the primary cross-cohort comparison.

---

## 7. Implementation Plan

### Geography
**Rajasthan** — specifically Jaipur and Udaipur districts.

**Rationale:**
- SmartPaper has processed 5M+ assessments in Rajasthan government schools — existing relationships with SCERT, DEOs, and school administrators
- State government has demonstrated willingness to partner on education innovation (DIKSHA adoption, SmartPaper integration)
- Mix of urban and rural, Hindi-medium instruction, representative of North Indian demographic profile
- J-PAL South Asia has extensive research infrastructure in Rajasthan

### Timeline

| Phase | Duration | Activities |
|-------|----------|------------|
| **0. Setup** | Months 1-3 | IRB approval, government MOUs, platform localization, assessor training, school/site recruitment |
| **1. Baseline** | Month 4 | Baseline assessments (all cohorts), randomization |
| **2. Intervention** | Months 5-10 | 6 months of AI tool access (T1, T2), monthly monitoring visits, midline assessment at Month 7 |
| **3. Endline** | Month 11 | Endline assessments, qualitative interviews (subsample) |
| **4. Follow-up** | Month 18 | 12-month follow-up assessment (persistence, economic outcomes) |
| **5. Analysis & Dissemination** | Months 19-24 | Data analysis, working papers, journal submissions, policy briefs |

### Phasing Strategy (Pilot → Full RCT)

**Phase 0 — Proof of Concept (3 months, ~$100K)**
Gates Grand Challenges India track. Single cohort (Adolescents, N=300), two arms (T1 vs. C). Validates platform delivery, assessment instruments, and recruitment in Rajasthan schools. Produces pilot effect estimates and power calculation refinements for full RCT proposal.

**Phase 1 — Full RCT (24 months, ~$800K-$1.2M)**
J-PAL PAIE or DIV Fund. All four cohorts, full three-arm design, N=6,000.

---

## 8. Data Collection & Quality

### Assessment Infrastructure
- **SmartPaper** for Cohorts A & B: paper-based adaptive assessments with computer-vision scoring (proven at scale in Rajasthan, eliminates device dependency for assessment)
- **Digital assessment** for Cohorts C & D: administered on personal devices via Open Items platform
- **Survey data:** Collected via ODK/SurveyCTO on tablets by trained enumerators
- **Administrative data:** School attendance records, enrollment data from state MIS
- **Platform telemetry:** Automatic logging of all interactions, time-on-task, mastery progression

### Quality Assurance
- Independent enumerator teams (not involved in intervention delivery)
- Back-checks on 10% of surveys
- Audio recording of qualitative interviews
- Pre-registration on AEA RCT Registry and RIDIE
- Pre-analysis plan filed before endline

---

## 9. Ethical Considerations

### IRB Approval
- Primary: US institutional IRB (through university partner)
- Local: Indian institutional ethics committee
- Government: State-level approval from Rajasthan SCERT

### Informed Consent
- Written consent from adult participants (Cohorts C, D)
- Parental consent + child assent for minors (Cohorts A, B)
- Consent materials in Hindi, translated and back-translated
- Community information sessions before recruitment

### Equity Safeguards
- Control group receives delayed access to the AI platform after endline (waitlist design)
- No participant loses access to existing educational resources
- Data collected is de-identified; platform usage data stored on Indian servers
- Findings published openly regardless of results

### Data Protection
- Compliance with India's Digital Personal Data Protection Act (2023)
- Data minimization — collect only what's needed for research questions
- Parental data access rights clearly communicated
- Data retention policy: de-identified data retained for replication; personally identifiable data destroyed after follow-up

---

## 10. Budget Estimate

### Pilot Phase (3 months) — $100,000

| Category | Amount |
|----------|--------|
| Platform development & localization | $25,000 |
| Devices & connectivity | $15,000 |
| Field staff (enumerators, coordinators) | $20,000 |
| Assessments & data collection | $10,000 |
| Travel & logistics | $10,000 |
| PI & research team time | $15,000 |
| Overhead (10%) | $5,000 |

### Full RCT (24 months) — $1,100,000

| Category | Amount |
|----------|--------|
| Platform development, maintenance & hosting | $120,000 |
| Devices & connectivity (tablets, data plans) | $150,000 |
| Field team (project manager, 8 field coordinators, 20 enumerators) | $280,000 |
| Assessments & data collection (4 rounds × 6,000 participants) | $120,000 |
| PI & co-PI time | $100,000 |
| Research assistants (2 full-time) | $60,000 |
| Qualitative data collection & analysis | $40,000 |
| Travel (domestic & international) | $50,000 |
| IRB, registration, regulatory compliance | $15,000 |
| Data management & security | $25,000 |
| Dissemination (open access fees, convenings) | $20,000 |
| Indirect costs / overhead (10%) | $120,000 |

---

## 11. Team

### Core Team
- **Derek Lomas, PhD** (PI) — HCI, CMU. 15+ years in AI-powered education, intelligent tutoring systems. Founded Play Power Labs (15M+ students reached). SmartPaper creator (5M+ assessments in India).
- **Co-PI (India-based)** — [To be confirmed: senior faculty at IIM/IIT/TISS/Azim Premji University with J-PAL affiliation or education economics background]
- **Co-PI (Economist)** — [To be confirmed: J-PAL affiliate with India RCT experience for PAIE eligibility]

### Implementation Partners
- **SmartPaper / Play Power Labs** — Assessment infrastructure and platform development (arm's-length, governed by Wisdom Frontiers COI policy)
- **Rajasthan SCERT** — Government partner, school access, administrative data
- **[India-based research organization]** — Field operations, enumerator teams (e.g., JPAL-SA survey firm, Morsel Research)

### Advisory
- Ken Koedinger (CMU) — Intelligent tutoring systems
- [Education economist with India expertise]
- [Indian education policy expert]

---

## 12. Expected Contributions

### To Science
- First multi-cohort comparison of AI learning impact across the lifespan within a single context
- Mechanism evidence: what drives AI's impact at each developmental stage
- Cost-effectiveness ratios by age group, informing optimal investment allocation
- Open dataset of AI learning interactions across age groups in a low-resource setting

### To Policy
- Evidence-based guidance on where India's AI-education investment should be concentrated
- Input to National Education Policy (NEP 2020) implementation on technology integration
- Framework for state governments evaluating AI tool procurement

### To Practice
- Open-source AI learning platform validated in low-resource Indian schools
- Assessment instruments (Hindi-medium, SmartPaper-compatible) freely available
- Implementation playbook for deploying AI learning tools in government systems

---

## 13. Dissemination Plan

- Pre-registration: AEA RCT Registry + RIDIE
- Working papers: NBER, J-PAL Policy Insights
- Journal targets: American Economic Review, Journal of Development Economics, AIED
- Open data: De-identified datasets on Harvard Dataverse
- Policy briefs: Targeted at MHRD, NITI Aayog, state education departments
- Practitioner summaries: Published on Impact-Edu.ai, translated to Hindi
- Conference presentations: AIED, NEUIPS, L@S, CIES
- All publications: Gold open access (CC-BY)

---

## Appendix A: Comparison to Prior Studies

| Study | Age | N | Country | AI Component | Effect (SD) | Funder |
|-------|-----|---|---------|-------------|-------------|--------|
| Mindspark Delhi (Muralidharan 2019) | 11-15 | 619 | India | Adaptive math | +0.37 math | J-PAL |
| Mindspark Rajasthan (Muralidharan 2024) | 11-14 | 1,528 | India | Personalization isolate | +0.22 math (bottom quartile) | J-PAL |
| Pratham CAL (Banerjee 2007) | 8-10 | 2,700 | India | Computer-assisted | +0.35 math | J-PAL |
| MIT J-WEL Literacy (2025) | 6-18 | Large | India | AI multi-sensory | +20-40% literacy | MIT |
| **This study** | **6-30** | **6,000** | **India** | **LLM-adaptive** | **TBD** | **TBD** |

---

*Prepared by Impact-Edu.ai, a program of Wisdom Frontiers.*
*Contact: Derek Lomas, PhD — https://impact-edu.ai*
