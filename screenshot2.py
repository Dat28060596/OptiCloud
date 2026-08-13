import asyncio
from playwright.async_api import async_playwright
import json

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        page.on("console", lambda msg: print(msg.text))
        page.on("pageerror", lambda exc: print(exc))
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await asyncio.sleep(5)

        await page.screenshot(path="explorer2.png")
        await browser.close()

asyncio.run(run())
