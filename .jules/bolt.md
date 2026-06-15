## 2024-06-15 - Fast Date Sort
**Learning:** Parsing dates with `new Date(string).getTime()` in a `sort` comparator function creates many intermediate objects and is very slow for large arrays.
**Action:** Use direct string comparison for ISO dates (`YYYY-MM-DD`). e.g., `a.date < b.date ? -1 : a.date > b.date ? 1 : 0`.

## 2024-06-15 - Fast Array Grouping
**Learning:** Chaining `.filter()` and `.forEach()` and using a `Map` is ~4x slower than a single `for` loop accumulating into a plain Object (`Record<string, ...>`).
**Action:** When filtering and grouping large datasets on the frontend, combine filter and aggregation into one loop and use a plain JS object instead of a Map when keys are simple strings.
