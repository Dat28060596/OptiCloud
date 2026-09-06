## 2025-02-27 - Avoid Date instantiations in sort comparators
**Learning:** Instantiating `Date` objects inside array sort comparators for ISO 8601 date strings causes significant garbage collection overhead and reduces performance in hot paths.
**Action:** When sorting arrays of objects by an ISO 8601 formatted date string (e.g., 'YYYY-MM-DD'), prefer lexical string comparison over instantiating `Date` objects.
