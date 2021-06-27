"use strict";

var _CreateBrowser = _interopRequireDefault(require("./CreateBrowser/CreateBrowser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  const newBrowser = new _CreateBrowser.default();
  const {
    browser,
    page
  } = await newBrowser.init();
  await page.goto('http://google.com.br');
  await page.waitForTimeout(10000);
  await browser.close();
})();