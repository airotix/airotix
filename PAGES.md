# AIROTIX Web — Page Guide

This document describes each route in the app, what appears on the page, and the main content blocks. Routing is defined in `src/App.jsx` using React Router.

| Route | Component | Browser title |
|-------|-----------|---------------|
| `/` | `Home` | AIROTIX \| AI Solutions & Automation |
| `/about` | `About` | AIROTIX \| About Us |
| `/services` | `Services` | AIROTIX \| Services |
| `/industries` | `Industries` | AIROTIX \| Industries |
| `/insights` | `Insights` | AIROTIX \| Insights |
| `/case-studies` | `CaseStudies` | AIROTIX \| Case Studies |

On every navigation, the app scrolls to the top (`ScrollToTop` in `App.jsx`).

---

## Home (`/`)

The main marketing landing page (`src/pages/Home.jsx`, styles in `src/styles/home.css`). Includes a full site nav (desktop + hamburger mobile menu) linking to all other pages, `#contact`, and a primary “Get Started” CTA.

### Sections (in order)

1. **Hero** (`#hero`)  
   - Badge: “Enterprise AI Solutions — Now Available”  
   - Headline: transforming businesses with AI, computer vision, and automation  
   - Subcopy on production-grade AI for enterprises  
   - CTAs: “Book a Demo” → `#contact`, “Explore Solutions” → `/services`  
   - Stats: 50+ enterprise clients, 98% model accuracy, 3× efficiency gain, 24/7 AI operations  
   - Scroll indicator

2. **Trusted by** (`#trusted`)  
   - Label: trusted by innovative companies  
   - Infinite horizontal ticker of placeholder client names (e.g. Nexora Tech, Veridian AI, …)

3. **Process** (`#process`)  
   - “How We Work” / “Our Development Process”  
   - Six steps with descriptions and bullet “branches”:  
     Discovery & Genesis → Data Collection & Curation → Model Development → Testing & Optimization → Deployment → Scaling & Continuous Learning

4. **Live AI demo** (`#ai-demo`)  
   - Intro to “AIROTIX Intelligence” with feature bullets (domain-aware reasoning, real-time inference, enterprise security, contextual precision)  
   - **Chat UI**: greets as enterprise AI advisor; optional prompt chips (manufacturing CV, retail ROI, LLM fine-tuning, CV deployment timeline); user can type and send messages  
   - Messages are sent to the Anthropic Messages API (`claude-sonnet-4-20250514`) with a fixed system prompt defining AIROTIX’s advisor persona; replies are typed out character-by-character  
   - **Note:** The fetch has no API key in this codebase; production use requires a secure backend or env-based key handling.

5. **CTA banner** (`#cta-banner`)  
   - “Built for Performance. Designed for Impact.”  
   - CTAs: “Book a Free Demo” → `#contact`, “See Case Studies” → `/case-studies`

6. **Contact** (`#contact`)  
   - Headline and copy for getting in touch  
   - **Discovery call** block: static “Calendly-style” time slots (PKT) — informational only, not embedded scheduling  
   - **Contact form**: name, company, work email, service interest (AI/ML, Computer Vision, Web & App, General), message; submit shows a toast (“Message sent! We’ll be in touch…”) and resets the form — **no backend submission** in code

7. **Footer** (`#footer`)  
   - Brand, tagline, social placeholders (LinkedIn, Twitter, GitHub — `href="#"`)  
   - Columns: Company, Services, Legal (Privacy, Terms, Cookies, Security — placeholders)  
   - Copyright © 2025 AIROTIX

**Hash links:** Visiting `/#section-id` (e.g. from another page) smooth-scrolls to that section after load.

---

## About Us (`/about`)

Subpage layout: top bar with logo → home and “Back to Home” (`src/pages/About.jsx`, `aboutPage.css`).

### Content

- **Eyebrow:** About AIROTIX  
- **Title:** “Computer Vision. Real-World Impact.”  
- **Intro:** Company focus on computer vision, teaching machines to see and decide from visual data  

- **Split section**  
  - **Our Mission:** Bridge research and business; stack mentions (YOLOv8, TensorFlow, PyTorch, OpenCV); goals around efficiency and decision-making  
  - **Our Values** (sidebar list): real-time detection, quality control, industrial automation, security analytics — each with a short explanation  

- **Our Story:** Narrative cards on founding vision, specialties (defect detection, quality control, automation, security analytics), supporting services (web/mobile, consulting, enterprise software), and concrete use cases on lines and monitoring  

No footer duplicate of the home page; navigation is only the subpage header.

---

## Services (`/services`)

Top bar same pattern as About (`servicesPage.css`).

### Content

- **Hero image:** Single image at top (`HERO_IMG` in code — path under `/assets/…`) with alt “Core service offerings overview”  
- **Label / title / sub:** “What We Build” / “Core Service Offerings” / blurb from concept to deployment  

- **Three cards** (each with icon, title, paragraph, “Learn More” → `/#contact`):  
  1. **AI / ML Automation** — pipelines, LLM agents, predictive systems, workflows  
  2. **Computer Vision Solutions** — detection, inspection, recognition, video analytics, edge/cloud  
  3. **Web & App Development** — SaaS, AI dashboards, enterprise web apps  

---

## Industries (`/industries`)

Top bar + “Back to Home” (`industriesPage.css`).

### Content

- **Label / title / sub:** “Sectors We Serve” / “Industries We Transform” / tailored AI per industry  

- **Four industry cards** (emoji, name, description, tag pills):  
  1. **Retail & E-Commerce** — inventory, forecasting, recommendations, checkout; tags e.g. Visual Search, Demand Forecasting  
  2. **Healthcare & Life Sciences** — imaging, diagnostics, patient flow, drug discovery, HIPAA; tags e.g. Medical Imaging, Diagnostic AI  
  3. **Public Sector & Government** — surveillance, document intelligence, traffic, fraud/compliance; tags e.g. Smart Surveillance, Doc Intelligence  
  4. **Manufacturing & Industry** — defect inspection, predictive maintenance, robotics vision, supply chain; tags e.g. Defect Detection, Predictive Maintenance  

---

## Insights (`/insights`)

Top bar with “Back to Home” (`insightsPage.css`).

### Content

- **Label / title:** “Knowledge Hub” / “Insights & Innovations”  
- **Three static article cards** (no individual article routes):  
  1. **LLMs** — “Fine-Tuning LLMs for Enterprise Domain Adaptation” (LoRA/QLoRA), Mar 28, 2025 — “Read” links to `#`  
  2. **Computer Vision** — “Vision Transformers vs CNNs…”, Mar 14, 2025  
  3. **MLOps** — “Building Production-Grade ML Pipelines…”, Feb 22, 2025  

Each card has a thumb emoji, category, title, excerpt, date, and placeholder read link.

---

## Case Studies (`/case-studies`)

Top bar with “Back to Home” (`caseStudiesPage.css`).

### Content

- **Label / title / sub:** “Proven Results” / “Case Studies” / real-world deployments  

- **Three case cards** (Problem / Solution / Results):  
  1. **CASE — 001** — Retail chain inventory automation (vision + ML + ERP; discrepancy and savings metrics)  
  2. **CASE — 002** — Hospital diagnostic imaging assistant (HIPAA, PACS, turnaround and workload metrics)  
  3. **CASE — 003** — Manufacturing defect detection (inline vision, FPS, escape rate metrics)  

---

## Shared UI patterns

- **Home** is the only page with the full global nav, footer, ticker, chat, and multi-section scroll experience.  
- **About, Services, Industries, Insights, Case Studies** share a minimal **subpage header**: logo home link + back to home.  
- **Legal and social links** on the home footer and insight “Read” links are placeholders (`#`) unless you wire them to real URLs or routes.
