## 2026-08-03 - Optimize Cost Explorer Data Processing
**Learning:** Chaining array methods like `filter`, `forEach` (with `Map` structures), and `reduce` inside React components can create significant memory overhead and unnecessary intermediate iterations on hot paths like UI data filtering.
**Action:** When filtering, grouping, and aggregating large datasets on the frontend, combine these operations into a single-pass `for` loop using a plain JavaScript object (`Record<string, ...>`) to accumulate values, improving performance by reducing memory allocations and iterations.
