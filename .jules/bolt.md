## 2024-05-20 - Add code splitting for large route components
**Learning:** Heavy charting libraries like `recharts` significantly inflate the initial bundle size when large route components are statically imported in a Vite single-page application.
**Action:** Implemented code splitting using `React.lazy` and `Suspense` for the main route components (`Dashboard`, `CostExplorer`, etc.) to defer loading these heavy dependencies until the specific view is accessed.
