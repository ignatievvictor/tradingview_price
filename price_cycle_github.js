const puppeteer = require('puppeteer');

var tv_login ='ignatiev_victor';
var tv_pass ='Popka123#';

(async() => {
const browser = await puppeteer.launch();
//const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
console.log("Connecting to TradingView...");
await page.goto('https://www.tradingview.com');

console.log("Click to Sign In");
await page.click('div.tv-header.tv-header__top.tv-header--sticky > div > div.tv-header__area.tv-header__area--device > div.tv-header__right-elements > a');
await page.waitFor(1000);
console.log("Click to Email login");
await page.click('#overlap-manager-root > div > div.tv-dialog__modal-wrap > div > div > div > div > div > div.tv-signin-dialog__area.tv-signin-dialog__area--auth > div.js-pages-wrap > div > div.i-clearfix.active > div > span');
await page.focus('#signin-form > div.tv-control-error > div.tv-control-material-input__wrap > input');
console.log("Typing login...");
await page.keyboard.type(tv_login, { delay: 100 });
await page.focus('#signin-form > div:nth-child(3) > div > div.tv-control-material-input__wrap > input')
console.log("Typing password");
await page.keyboard.type(tv_pass, { delay: 100 });
await page.click('#signin-form > div.tv-signin-dialog__footer.tv-signin-dialog__footer--login > div.tv-signin-dialog__footer-item.tv-signin-dialog__footer-item--login > button > span.tv-button__loader');
console.log("Submittin auth...");
await page.waitFor(1000);

    
const page2 = await browser.newPage();
console.log("Connecting to UKOIL graph...");
await page2.setViewport({ width: 1920, height: 1080 });
await page2.exposeFunction('onCustomEvent', text => console.log(text));
await page2.goto('https://www.tradingview.com/chart/?symbol=UKOIL', {waitUntil: 'networkidle0'});
console.log("UKOIL opened");

//open dataframe dialog
console.log("Open timeframe droplist...");
await page2.waitForSelector('#header-toolbar-intervals > div');
await page2.click('#header-toolbar-intervals > div');

//select 1m
console.log("Selecting 1m...");
await page2.click('#overlap-manager-root > div > span > div.menuWrap-1gEtmoET > div > div > div > div:nth-child(8) > div');
//turn off sidebar
console.log("Turning off sidebar");
//await page2.waitForSelector('body > div.js-rootresizer__contents > div.layout__area--right > div > div.widgetbar-tabs > div > div > div > div > div.button-3SuA46Ww.isTab-1dbyVeUX.isActive-1D4aU96I.isGrayed-3O5VgbN4.apply-common-tooltip.common-tooltip-vertical');
//await page2.click('body > div.js-rootresizer__contents > div.layout__area--right > div > div.widgetbar-tabs > div > div > div > div > div.button-3SuA46Ww.isTab-1dbyVeUX.isActive-1D4aU96I.isGrayed-3O5VgbN4.apply-common-tooltip.common-tooltip-vertical');

const element = await page2.$("body > div.js-rootresizer__contents > div.layout__area--center > div.chart-container.single-visible.active > div.chart-container-border > div > table > tr:nth-child(1) > td.chart-markup-table.pane > div > div.noWrap-ODIQgNap.legend-29zvAld0.newCollapser-1F6pNRDi > div:nth-child(1) > div.item-3eXPhOmy.series-12hzsxbp > div.valuesWrapper-1ukbb5SP > div > div:nth-child(5) > div.valueValue-3kA0oJs5");
const text = await page2.evaluate(element => element.innerText, element);
console.log("Current price:");
console.log(text);

  await page2.evaluate(() => {
    $('body > div.js-rootresizer__contents > div.layout__area--center > div.chart-container.single-visible.active > div.chart-container-border > div > table > tr:nth-child(1) > td.chart-markup-table.pane > div > div.noWrap-ODIQgNap.legend-29zvAld0.newCollapser-1F6pNRDi > div:nth-child(1) > div.item-3eXPhOmy.series-12hzsxbp > div.valuesWrapper-1ukbb5SP > div > div:nth-child(5) > div.valueValue-3kA0oJs5').bind("DOMSubtreeModified", function(e) {
      window.onCustomEvent(e.currentTarget.textContent.trim());
    });
  });
  await page2.waitFor(1000);
  console.log("Making noda.png");
  await page2.screenshot({path: 'noda.png'});
})();


