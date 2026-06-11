## 2024-05-24 - Vite Dependency Optimization Reloads
**Learning:** Even when using `wait_until="networkidle"` with Playwright on a Vite dev server, Vite may still force a page reload shortly after initial load to optimize dependencies on the fly. This causes injected scripts (`page.evaluate()`) to crash with "Execution context was destroyed".
**Action:** When running Playwright scripts against a cold Vite dev server, add a short explicit delay (e.g., `await asyncio.sleep(2)`) after `page.goto` before injecting scripts or running assertions to allow Vite's client-side hot reload to complete.
