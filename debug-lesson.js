const puppeteer = require('puppeteer');
const path = require('path');

async function test() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  const filePath = 'file://' + path.resolve('genrok-app/public/lessons/forty-forty-twenty-rule/lesson.html');
  console.log('Loading:', filePath);

  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const container = await page.$('.h-screen');
  console.log('Container found:', !!container);

  const html = await page.content();
  console.log('Body has content:', html.length > 1000);

  const root = await page.evaluate(() => document.getElementById('root').innerHTML);
  console.log('Root innerHTML length:', root.length);
  console.log('Root content preview:', root.substring(0, 500));

  await browser.close();
}

test().catch(e => console.log('Error:', e.message));
