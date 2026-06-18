
## 2024-05-18 - ISO Date String Sorting
**Learning:** Parsing dates with `new Date().getTime()` within `.sort()` operations is an expensive overhead, especially for larger arrays. When ISO 8601 formatted strings (e.g. `YYYY-MM-DD`) are used, simple lexicographical string comparison accomplishes the same sort natively in V8 without the cost of object instantiation.
**Action:** Replace `new Date(a).getTime() - new Date(b).getTime()` with `a < b ? -1 : a > b ? 1 : 0` for sorting standard date strings in performance-critical paths.
