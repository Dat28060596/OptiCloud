## 2024-05-01 - Date Sorting Optimization
**Learning:** In V8/JavaScript, sorting arrays by creating `Date` objects inside the `sort` callback (e.g., `new Date(a.date).getTime() - new Date(b.date).getTime()`) is significantly slower (roughly ~6x-7x slower in local benchmark) than using direct string comparison when the dates are already in an ISO 8601 compatible format like `YYYY-MM-DD`.
**Action:** Always use lexicographical string comparison operators (`<`, `>`) to sort ISO date strings instead of parsing them into Date objects.
