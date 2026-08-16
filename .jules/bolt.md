## 2023-10-25 - Date sorting performance
**Learning:** When sorting arrays of objects by an ISO 8601 formatted date string (e.g., 'YYYY-MM-DD'), lexical string comparison avoids significant garbage collection overhead and improves execution speed in hot paths compared to instantiating Date objects.
**Action:** Always prefer lexical string comparison for strictly formatted date strings when sorting.
