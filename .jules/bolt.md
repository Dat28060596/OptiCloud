## 2025-03-09 - Faster Data Grouping with Plain Objects

**Learning:** When writing aggregation logic using JavaScript Maps for performance gains, relying on single pass loop using Plain Object mappings is far superior than using chaining array maps, `.forEach()` loops, and Map operations.
**Action:** Replace `Array.prototype.reduce()`, `.filter()`, and `.map()` loops and JavaScript Map structures with direct loop access via `for (let i = 0...` and Plain Object key associations (`Record<string, ...>`).
