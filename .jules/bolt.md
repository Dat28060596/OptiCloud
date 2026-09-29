## 2025-05-18 - React Code Splitting
**Learning:** In standard React apps with multiple large route components, importing all components eagerly increases the initial JavaScript bundle significantly, hurting time-to-interactive.
**Action:** Implemented React.lazy and Suspense to lazy load route components to optimize bundle size and speed up the initial load time.
