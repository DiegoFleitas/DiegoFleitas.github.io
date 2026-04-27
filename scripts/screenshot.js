import { chromium } from 'playwright';

;(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/');
  await page.waitForSelector('figure');
  const el = await page.$('figure');
  if (!el) {
    console.error('Figure element not found');
    await browser.close();
    process.exit(2);
  }
  await el.screenshot({ path: 'screenshot.png' });
  console.log('screenshot saved to screenshot.png');
  await browser.close();
})();
