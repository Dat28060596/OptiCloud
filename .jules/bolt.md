## 2025-01-01 - Code Splitting for Large Dependencies
**Learning:** Statically importing heavy route components (like Dashboard which uses recharts) forces clients to download the entire JS bundle upfront, significantly degrading initial load performance.
**Action:** Always implement code splitting using React.lazy() and Suspense for heavy, conditionally rendered route components while keeping shared persistent components (like Sidebar) statically imported.
