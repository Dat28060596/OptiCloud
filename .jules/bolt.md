## 2023-10-27 - Code Splitting Large Route Components
**Learning:** Heavy route components loaded synchronously cause unnecessary initial bundle bloat, blocking the main thread and slowing down perceived load times.
**Action:** Implemented code splitting using React.lazy() and Suspense for non-critical/conditional route components (Dashboard, CostExplorer, etc.) while keeping persistent layout components (Sidebar) synchronous to avoid rendering waterfalls.
