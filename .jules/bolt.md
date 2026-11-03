## 2024-05-19 - Use React.lazy for large route components
**Learning:** Using React.lazy for the large route components in App.tsx can significantly reduce the initial bundle size, allowing the dashboard to load faster.
**Action:** Implement code splitting in App.tsx by replacing static imports of large route components with React.lazy and wrapping the view render function in a Suspense boundary.
