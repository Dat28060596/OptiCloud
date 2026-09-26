## 2024-05-20 - [Code Splitting Route Components]
**Learning:** In a multi-view Vite/React application, importing all heavy route components (like Dashboard which includes Recharts) eagerly causes a large initial JavaScript bundle size, negatively impacting load time.
**Action:** Implemented React.lazy() and Suspense for route components in App.tsx. This defers the loading of heavy dependencies until the specific view is active.
