## 2026-09-12 - Extract inline components for performance
**Learning:** Defining inline React components inside a parent component's render method causes the inner component to unmount and remount on every parent render, leading to poor performance and lost state.
**Action:** Always extract components to the top level outside the parent and use React.memo with useCallback for event handlers passed as props.
