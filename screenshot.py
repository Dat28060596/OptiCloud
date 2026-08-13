import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await asyncio.sleep(5)

        await page.evaluate('''() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const exp = btns.find(b => b.textContent.trim() === 'Cost Explorer');
            if(exp) exp.click();
        }''')
        await asyncio.sleep(2)
        await page.screenshot(path="explorer.png")
        await browser.close()

asyncio.run(run())
