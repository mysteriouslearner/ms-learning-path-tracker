# Microsoft Learning Path Tracker (PathFinder)
### Stage 2 Recruitment Project — 1st Year (Freshers) Task: Option A (Frontend Only)

A web application designed to track free Microsoft certifications and learning paths across multiple domains (Cloud, AI/Data, Cybersecurity, Power Platform, Modern Work, DevOps). Features deterministic DAG prerequisite locking, interactive visual roadmap progression, and an AI mentor (Google Gemini API + resilient local fallback engine) that explains why each unlocked step comes next.

---

## 🌟 Live Features & Highlights

- **🎯 6 Career Learning Domains**:
  - **Cloud & Infrastructure**: Azure Fundamentals (AZ-900) $\to$ Administrator (AZ-104) $\to$ Solutions Architect (AZ-305) / DevOps (AZ-400).
  - **AI & Data Science**: AI Fundamentals (AI-900) & Data Fundamentals (DP-900) $\to$ Data Scientist (DP-100) & AI Engineer (AI-102) $\to$ Data Engineer (DP-203).
  - **Cybersecurity & Compliance**: Security Fundamentals (SC-900) $\to$ SecOps (SC-200) $\to$ Identity (SC-300) $\to$ Cybersecurity Architect (SC-100).
  - **Power Platform & Low-Code**: Power Platform Fundamentals (PL-900) $\to$ App Maker (PL-100) $\to$ Functional Consultant (PL-200) $\to$ Developer (PL-400) / BI Analyst (PL-300).
  - **Modern Work & M365**: M365 Fundamentals (MS-900) $\to$ Endpoint Admin (MD-102) $\to$ Teams Admin (MS-700) $\to$ Enterprise Admin (MS-102).
  - **DevOps & GitHub**: GitHub Foundations $\to$ Azure Fundamentals $\to$ GitHub Actions $\to$ DevOps Engineer (AZ-400).

- **🔒 Deterministic Prerequisite DAG Engine**:
  - Clear visual states: **🟢 Completed**, **🔵 Available (Current Step)**, **🔒 Locked (Prerequisites Not Met)**.
  - Client-side DAG dependency computation guarantees zero race conditions or hallucinations.
  - Interactive badges showing required prerequisites with 1-click navigation.

- **🤖 AI Next-Step Explanation (Gemini API + Offline Resilient Engine)**:
  - **Separation of Concerns**: Your code decides the next certification based on prerequisites; AI solely generates a punchy, encouraging 1–2 sentence explanation of *why* this step comes next based on past achievements.
  - **Visual Loading Indicator**: Pulsating skeleton animation during generation.
  - **Zero-Crash Fallback**: If offline, rate-limited, or no API key is provided, the smart local fallback engine generates instant contextual guidance.
  - **Custom Key Input**: Users can enter their personal Google Gemini API key via the in-app Settings modal.

- **🗺️ Visual Roadmap Flow**:
  - Connected step-by-step nodes with vertical progress indicator lines.
  - Real-time progress bar, hours tracker, and filter by certification level (Fundamentals, Associate, Expert).
  - Direct 1-click links to free official Microsoft Learn modules and study guides.
  - LocalStorage persistence and celebration animations (confetti) on completing learning tracks.

- **🎓 Built-in Interview Walkthrough Guide**:
  - In-app modal with top interview questions and model architectural explanations.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: React 18 (TypeScript) with Vite
- **Styling**: Tailwind CSS (with custom Microsoft Fluent palette & dark/light mode)
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, custom CSS keyframe glows & shimmers
- **AI Integration**: Google Gemini REST API (`gemini-1.5-flash`) + Intelligent Contextual Fallback Engine

---

## 🚀 Quickstart Guide

### 1. Clone & Navigate to Project
```bash
cd ms-learning-path-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 📐 Architecture & Key Design Decisions (Interview Prep)

### Q1: Why shouldn't the AI decide which certification comes next?
> **Answer**: Determining prerequisites is a deterministic graph dependency problem (Directed Acyclic Graph). Large Language Models are probabilistic and prone to hallucinations, which could recommend non-existent certs or violate strict prerequisite rules. By computing prerequisites deterministically in TypeScript (`prerequisiteEngine.ts`), our business logic is 100% reliable and reproducible. The AI is utilized exclusively for what it does best: natural language explanation, career mentorship, and encouragement.

### Q2: How is resilience and offline capability handled for the AI feature?
> **Answer**: The application uses a multi-layered resilience strategy:
> 1. **AbortController with 8-second timeout**: Prevents hanging requests if the API is slow.
> 2. **Client-side Caching (`useAiExplanation.ts`)**: Caches AI responses per domain/certification combination so navigating between domains does not trigger redundant calls.
> 3. **Intelligent Domain-Aware Fallback Engine (`aiService.ts`)**: If the API call fails, times out, or has no key, the fallback engine constructs a tailored 1-2 sentence explanation using the target cert's skills, completed history, and domain goals. The UI never crashes or displays a blank screen.

### Q3: How does the prerequisite state machine evaluate multi-prerequisites?
> **Answer**: Each certification definition includes an array `prerequisites: string[]`. When evaluating a domain:
> - If `completedCerts[certId]` is `true` $\implies$ **Completed**.
> - If `missingPrerequisites.length === 0` $\implies$ **Available**.
> - Otherwise $\implies$ **Locked**, with `missingPrerequisites` populated so the UI can explicitly inform the user which certs must be finished first.

---

## 📁 Project Structure

```
ms-learning-path-tracker/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── src/
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces for Domains, Certs, Statuses
│   ├── data/
│   │   └── certsData.ts             # Curated dataset of 25+ Microsoft Certifications & Learn Paths
│   ├── services/
│   │   ├── prerequisiteEngine.ts    # Deterministic DAG prerequisite evaluation engine
│   │   └── aiService.ts             # Gemini API client & intelligent fallback explanation generator
│   ├── hooks/
│   │   ├── useTrackerState.ts       # Main state management with LocalStorage sync & filter logic
│   │   └── useAiExplanation.ts      # React hook for AI explanations, caching, and loading state
│   ├── components/
│   │   ├── Navbar.tsx               # Header with global progress, theme toggle, and modal buttons
│   │   ├── DomainPicker.tsx         # 6 interactive domain cards with progress tracking
│   │   ├── StatsOverview.tsx        # Track statistics, search bar, and level filters
│   │   ├── AiExplanationBox.tsx     # AI mentor box with loading skeleton and source badge
│   │   ├── RoadmapView.tsx          # Connected roadmap timeline view with step connectors
│   │   ├── CertCard.tsx             # Card showing visual states, skills, and MS Learn links
│   │   ├── SettingsModal.tsx        # Gemini API Key configuration modal
│   │   └── InterviewGuideModal.tsx  # Interactive interview walkthrough guide
│   ├── App.tsx                      # App root component
│   ├── main.tsx                     # React entry point
│   └── index.css                    # Tailwind CSS directives and custom animations
```
