## 2024-04-17 - Avoid Pre-mature Array to Set Conversion for Small Arrays
**Learning:** In benchmarks, converting small arrays (e.g. active filters of 1-4 items) to `Set` inside `Array.filter` iterations or immediately outside of them for lookup actually degraded performance compared to just using `Array.includes()`. The instantiation overhead of `new Set()` outweighed the O(1) lookup benefit for such small sizes.
**Action:** Always benchmark algorithmic optimizations. Don't blindly apply `Set` for lookups unless the array size is proven to be large enough to offset instantiation costs. Stick to `Array.includes()` for small collections.

## 2024-04-17 - Extracted Sub-Components Avoid DOM Teardown
**Learning:** Defining a component (like `FilterDropdown`) inside the render function of another component (like `CostExplorer`) causes React to unmount and remount it on every render, which is a significant performance anti-pattern leading to unnecessary DOM operations and lost state.
**Action:** Always declare sub-components at the module scope. Pass necessary state and callbacks as props, and wrap them in `React.memo` if they depend on referentially stable or primitive props to optimize rendering.
