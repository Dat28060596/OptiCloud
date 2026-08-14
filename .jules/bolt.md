
## 2023-10-24 - Lexical String Comparison for Dates
**Learning:** In V8, sorting dates stored in ISO 8601 format (`YYYY-MM-DD`) by instantiating `new Date(a).getTime() - new Date(b).getTime()` introduces significant overhead inside hot loops, particularly array `sort()` comparators. String lexical comparison (`a < b ? -1 : a > b ? 1 : 0`) is up to 6-8x faster and achieves the exact same result since ISO strings sort correctly alphabetically.
**Action:** Always prefer lexical string comparison for dates formatted as ISO 8601 when sorting in hot paths, avoiding unnecessary `Date` object allocation.
