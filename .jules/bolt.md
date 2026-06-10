## 2024-06-10 - Fast data accumulation in CostExplorer
**Learning:** Using a single loop and a plain object accumulation `Record<string, ...>` is significantly faster than using multiple chained methods and a Map when filtering and grouping large datasets on the frontend.
**Action:** When working on complex frontend aggregations of array data, prefer single-pass object accumulation.
