## 2024-07-09 - [ISO Date Sorting Performance]
**Learning:** In V8/JavaScript, comparing ISO date strings via parsing them with `new Date().getTime()` is ~10-15x slower than direct string comparison (`a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)`). This is because `new Date()` allocates objects and parses date formats, whereas ISO formats ('YYYY-MM-DD') are specifically designed to be naturally sortable lexicographically.
**Action:** When sorting arrays of strictly formatted ISO date strings, always use simple string comparison instead of `new Date()` conversion or `localeCompare`.
