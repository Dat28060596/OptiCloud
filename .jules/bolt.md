## 2024-05-24 - Fast Date Sorting
**Learning:** When sorting ISO date strings ('YYYY-MM-DD'), string comparison (`a.date < b.date ? -1 : a.date > b.date ? 1 : 0`) is significantly faster than parsing to date (`new Date().getTime()`).
**Action:** Use direct string comparison for sorting ISO date strings.
