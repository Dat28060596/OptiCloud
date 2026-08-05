## 2025-03-04 - React.memo for Sidebar
**Learning:** The Sidebar component receives static/stable props (`currentView` string and `setCurrentView` which is stable from `useState`) but was re-rendering whenever sibling components triggered state changes in `App.tsx` (like cost data filtering or anomalies updating).
**Action:** Wrap the Sidebar export with `React.memo` to prevent unnecessary re-renders of the static navigation tree when unrelated main-content data changes, saving CPU cycles on frequent parent state updates.
