## 2024-05-18 - Code Splitting Route Components
**Learning:** React applications with multiple heavy route components (like Dashboard, CostExplorer, Settings) can suffer from large initial bundle sizes and slow load times.
**Action:** Use `React.lazy()` and `Suspense` for top-level route components to enable code splitting, reducing the initial JS payload.
