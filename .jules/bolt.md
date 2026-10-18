## 2024-05-18 - Route-level code splitting missing in CostOptima

**Learning:** Discovered a codebase-specific architectural pattern where all major route views (Dashboard, CostExplorer, OptimizationHub, Anomalies, Settings) were statically imported in the root App.tsx. This caused a monolithic initial JavaScript bundle, penalizing load time for all users regardless of the initial view.

**Action:** Implemented React.lazy and Suspense to dynamically load these heavy components only when navigated to. I will look out for similar monolithic import structures in other React/Vite codebases going forward.
