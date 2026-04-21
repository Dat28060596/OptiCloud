
## 2023-10-27 - ISO Date String Sorting Optimization
**Learning:** Instantiating `Date` objects in a tight loop for sorting array data via `.getTime()` is incredibly inefficient. `MOCK_COST_DATA` uses ISO 8601 strings (YYYY-MM-DD), which are natively sortable using lexicographical string comparison. A benchmark confirmed that `a.date < b.date ? -1 : 1` is ~5x faster than parsing date strings.
**Action:** When sorting ISO 8601 string dates, always use direct string comparison rather than `new Date(string).getTime()` to avoid expensive and unnecessary object instantiation.
