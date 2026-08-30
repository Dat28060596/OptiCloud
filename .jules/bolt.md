## 2024-05-24 - Lexical String Comparison for ISO 8601 Dates
**Learning:** Instantiating `Date` objects inside sort comparators (e.g., `new Date(a.date)`) introduces significant garbage collection overhead and degrades execution speed in hot paths. ISO 8601 strings can be safely sorted lexically.
**Action:** Use lexical string comparison (`a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`) when sorting arrays of objects by ISO 8601 formatted date strings to avoid `Date` instantiation overhead while maintaining strict weak ordering.
