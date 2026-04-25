## 2026-04-25 - Optimize Date Sorting in Dashboard

**Learning:** When sorting dates represented as ISO strings ('YYYY-MM-DD'), `new Date(string).getTime()` is computationally expensive because it creates new Date objects for every comparison. The codebase memory explicitly states: "When sorting ISO date strings ('YYYY-MM-DD'), use direct string comparison (`a.date < b.date ? -1 : 1`) instead of parsing with `new Date().getTime()` to optimize performance and avoid expensive object creation."
**Action:** Replace `new Date(a.date).getTime() - new Date(b.date).getTime()` with `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)` when sorting strings in ISO date format.
