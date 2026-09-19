## 2023-10-24 - [Date Sorting Optimization]
**Learning:** Instantiating `Date` objects inside array sort comparators causes significant garbage collection overhead and slows down hot paths, especially since ISO date strings can be accurately compared using standard lexical string comparison.
**Action:** Always prefer lexical string comparison `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)` over `Date` instantiation when sorting arrays by ISO formatted date strings.
