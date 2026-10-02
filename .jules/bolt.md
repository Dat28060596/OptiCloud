## 2024-05-24 - Code Splitting Routes
**Learning:** Initial bundle size was >900kB primarily due to large charting dependencies (Recharts) loaded upfront.
**Action:** Always use React.lazy() and Suspense for route-level components in React SPAs to defer loading heavy dependencies until needed, reducing initial bundle size and time-to-interactive.
