## 2024-05-14 - Optimized filtering arrays

**Learning:** When using data tables/grids where filtering relies on array includes checks (e.g. `['us-east-1'].includes('us-east-1')`), iterating over thousands of items causes O(n*m) complexity for `m` items and `n` filter options. Converting the array filters to `Set`s inside `useMemo` immediately before iterating reduces lookups to O(1) without requiring changes to the React component's serializable array state.

**Action:** Before looping over large datasets (`.filter`, `.map`, `.reduce`), check if array lookups (`.includes()`) are being used in the loop and convert them to `Set` lookups.
