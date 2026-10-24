## 2024-05-18 - Strategic Code Splitting for React Apps

**Learning:** When dealing with heavy client-side rendered React apps, especially those with rich data visualization (like Recharts), statically importing all route components causes severe bundle bloat and blocks initial TTI.

**Action:** Strategically implement `React.lazy()` and `<Suspense>` for top-level, conditionally rendered route components (like Dashboard, CostExplorer, etc.). Do *not* lazy-load persistent layout components (like Sidebar or Navigation) to avoid layout shifts or network waterfalls.
