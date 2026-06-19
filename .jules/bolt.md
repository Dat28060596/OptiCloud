## 2025-06-19 - Fast Date Sorting over Object Instantiation
**Learning:** Lexicographical string comparison on ISO formatted strings (`YYYY-MM-DD`) achieves correct chronological ordering significantly faster than parsing strings into `Date` objects inside array sort callbacks, avoiding expensive V8 object instantiation.
**Action:** Use direct relational string comparison (`<`, `>`) instead of `new Date().getTime()` or `localeCompare` when sorting pre-formatted ISO timestamp strings in the frontend.
