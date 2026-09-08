## 2025-03-08 - Optimize date sorting with lexical string comparison
**Learning:** Instantiating `Date` objects inside array sort comparators (`new Date(a).getTime() - new Date(b).getTime()`) for ISO 8601 strings (YYYY-MM-DD) incurs significant garbage collection overhead and slows down hot paths. Lexical string comparison is both safe for this format and significantly faster.
**Action:** When sorting arrays by ISO 8601 formatted date strings, prefer lexical comparison: `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)` instead of date instantiation.
