## 2023-11-04 - Code Splitting App.tsx components
**Learning:** React.lazy requires `<Suspense>` which may be missing in large generic layouts. When string replacing around a view renderer, be careful not to introduce whitespace that breaks string matching. Also some Vite projects missing `<script>` tags in their `index.html` require them injected explicitly before dev tests work.
**Action:** Always visually check string replacement boundaries for whitespace and ensure `index.html` loads correctly.
