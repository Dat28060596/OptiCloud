## 2024-10-05 - Implement Code Splitting for Routes
**Learning:** The application bundles all large route components (Dashboard, CostExplorer, OptimizationHub, Anomalies, Settings) and their heavy dependencies like Recharts into the initial JS bundle, which degrades the initial load performance.
**Action:** Used `React.lazy()` and `Suspense` in the main routing component (`App.tsx`) to code-split routes, ensuring that heavy dependencies are only loaded when the specific view is active.
