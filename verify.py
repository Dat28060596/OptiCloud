import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await asyncio.sleep(15)

        await page.evaluate('''() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const exp = btns.find(b => b.textContent.trim() === 'Cost Explorer');
            if(exp) exp.click();
        }''')
        await asyncio.sleep(2)

        await page.evaluate('''() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const srv = btns.find(b => b.textContent.trim() === 'Service');
            if(srv) srv.click();
        }''')
        await asyncio.sleep(1)

        items = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('.animate-in')).length;
        }''')
        assert items > 0, "Dropdown did not render!"

        print("Verification passed!")
        await browser.close()

asyncio.run(run())
