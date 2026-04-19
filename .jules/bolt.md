## 2024-05-24 - Convert Arrays to Sets for Array Filtering
**Learning:** Checking for elements inside arrays within a `.filter()` iteration is O(n*m) where n is dataset size and m is filter options size.
**Action:** When filtering large arrays based on a dynamic list of active filters, always convert the active filter arrays to `Set` objects first outside the filter callback to achieve O(1) lookups, changing time complexity to O(n+m).
