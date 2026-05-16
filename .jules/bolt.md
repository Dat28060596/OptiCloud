## 2024-05-16 - CostExplorer Filter Rendering Bottleneck
**Learning:** React component definitions inside parent render functions completely destroy memoization and cause full unmount/remounts of DOM elements.
**Action:** Always extract helper components (like `FilterDropdown`) to module scope and pass state variables explicitly as props.
