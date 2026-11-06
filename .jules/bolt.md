## 2024-11-06 - Missing JS Entry Point in Index
**Learning:** Some project templates may omit the module script tag for the entry point (`<script type="module" src="/index.tsx"></script>`) in `index.html`. If the Vite server serves a blank page with no errors, check `index.html` first.
**Action:** When working on new frontend repositories, always verify `index.html` has the proper script entry point before writing extensive Playwright tests, or debugging blank pages.
