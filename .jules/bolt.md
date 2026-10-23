## 2024-05-24 - Add Code Splitting to Routes
**Learning:** Synchronous imports of chart-heavy route components like CostExplorer and Dashboard cause a heavy initial bundle size specific to this architecture.
**Action:** Implemented React.lazy to lazy load route components to reduce initial JS load, while avoiding code-splitting persistent layout components like Sidebar to prevent network waterfalls.
