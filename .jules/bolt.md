## 2024-05-18 - [Code Splitting Route Components]
**Learning:** The application renders several complex views (e.g. Dashboard with charts) based on a simple string state (`currentView`). Without standard routing libraries handling code splitting automatically, all these heavy dependencies were bundled into the initial payload.
**Action:** Manually implemented `React.lazy` and `Suspense` for large, conditionally rendered components directly in `App.tsx` to split the Vite bundle and improve initial load time.
