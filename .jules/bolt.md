## 2024-05-14 - Optimize sorting ISO date strings
**Learning:** Instantiating `Date` objects in a `sort` comparator for ISO 8601 formatted date strings is computationally expensive and causes unnecessary garbage collection overhead. Since ISO date formats ('YYYY-MM-DD') guarantee strict weak ordering when compared lexically, standard string comparison is much faster.
**Action:** Use lexical string comparison `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)` instead of `new Date(a.date).getTime() - new Date(b.date).getTime()` when sorting standard ISO date strings.
