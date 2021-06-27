import CreateBrowser from './CreateBrowser/CreateBrowser'

(async () => {
  const newBrowser = new CreateBrowser()
  const { browser, page } = await newBrowser.init()
  await page.goto('http://google.com.br')
  await page.waitForTimeout(10000)
  await browser.close()
})()
