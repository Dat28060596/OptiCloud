## YYYY-MM-DD - [Extract Inner Component to Avoid Re-renders]
**Learning:** Defining inline React components within a parent component's render method causes the inner component to unmount and remount on every single parent render, degrading performance and destroying local DOM state.
**Action:** Always extract these components to the top level outside the parent.
