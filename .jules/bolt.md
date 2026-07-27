## 2024-05-24 - Optimizing Large Array Manipulations in React

**Learning:** When performing chained array methods (`.filter().forEach()`) coupled with `Map` data structures on large mock or frontend datasets during a React render cycle (`useMemo`), the overhead of multiple array passes, closures, and Map object creation can create a noticeable bottleneck on the main thread.
**Action:** Replace chained array operations with a single `for` loop that accumulates data directly into a plain JavaScript Object (`Record<string, ...>`). Also, convert array inclusion filters (`activeFilters.includes(value)`) into `Set` lookups (`Set.has(value)`) to drop O(N) lookup overhead to O(1).
