## 2025-03-01 - Route-Level Code Splitting
**Learning:** Significant performance gains in React application load time can be achieved by utilizing code splitting for large route components, rather than loading everything upfront. This defers the load of heavy dependencies (such as Recharts within Dashboard) until the user navigates to the associated view.
**Action:** When working with large components or routes that aren't visible on initial load, implement `React.lazy` and `Suspense` to reduce the initial JavaScript bundle size.
