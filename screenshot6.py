import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        page.on("console", lambda msg: print(msg.text))
        page.on("pageerror", lambda exc: print(exc))
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await asyncio.sleep(5)

        print("Clicking Menu")
        await page.evaluate('''() => {
            const btns = Array.from(document.querySelectorAll('button, a, div'));
            const exp = btns.find(b => b.textContent.trim() === 'Cost Explorer');
            if(exp) exp.click();
        }''')
        await asyncio.sleep(2)

        print("Clicking Filter Service")
        await page.evaluate('''() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const srv = btns.find(b => b.textContent.includes('Service') && b.querySelector('svg'));
            if(srv) srv.click();
        }''')
        await asyncio.sleep(2)
        await page.screenshot(path="explorer7.png")

        await browser.close()

asyncio.run(run())
