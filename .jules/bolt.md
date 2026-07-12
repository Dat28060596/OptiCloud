## 2025-03-05 - Bolt: Optimize data grouping loop
**Learning:** Found that chaining multiple array methods (`filter`, `forEach`) combined with creating and accessing ES6 `Map` elements is surprisingly slow when grouping and aggregating a large dataset on the frontend.
**Action:** Replace chained methods and `Map` combinations with a single `for` loop that accumulates data into a plain JavaScript Object (`Record<string, ...>`). This ensures O(n) performance and significantly speeds up rendering filters for large data tables, making filtering operations feel instantaneous.
