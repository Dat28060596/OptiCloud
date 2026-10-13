## 2024-05-24 - Extracted Inline Component
**Learning:** Defining inline React components within a parent component's render method causes the inner component to unmount and remount on every single parent render, degrading performance and destroying local DOM state.
**Action:** Always extract these components to the top level outside the parent and optionally use React.memo.
