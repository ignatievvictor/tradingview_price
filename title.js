const browser = await puppeteer.launch();

const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('https://www.tradingview.com/chart/?symbol=UKOIL');
//open dataframe dialog
 await page.waitForSelector('title');
  
  const title = await page.title();
  console.info(`The title is: ${title}`);



