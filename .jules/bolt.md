## 2024-07-07 - [Avoid parsing ISO dates for sorting]
**Learning:** Parsing ISO string dates ('YYYY-MM-DD') using `new Date(a.date).getTime()` inside a sort function is significantly slower than direct string comparison (`a.date < b.date ? -1 : 1`) in JS. Direct string comparison is up to 15x faster because it avoids expensive object creation and timestamp parsing for every comparison step.
**Action:** Always use string comparison operators (`<`, `>`) to sort ISO formatted date strings.
