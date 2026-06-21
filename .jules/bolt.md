## 2024-06-21 - [Date string sorting]
**Learning:** Using direct string comparison (`a.date < b.date ? -1 : a.date > b.date ? 1 : 0`) is significantly faster than parsing dates with `new Date().getTime()` or using `String.prototype.localeCompare()`. My benchmark showed a ~3x performance improvement in Node/Bun.
**Action:** When sorting ISO date strings ('YYYY-MM-DD'), use string comparison instead of date parsing to avoid expensive object creation.

## 2024-06-21 - [Grouping and Aggregating Data]
**Learning:** Accumulating data using plain JavaScript Objects (`Record<string, ...>`) and a basic `for` loop is about 3x faster than using a `Map` and `forEach` chain, because it avoids iterator overhead and map method calls for small-to-medium sized objects.
**Action:** Use plain JS Objects with `for` loops when grouping and aggregating data structures on the frontend.
