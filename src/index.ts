import CreateBrowser from './CreateBrowser/CreateBrowser'

(async () => {
  const newBrowser = new CreateBrowser()
  const { browser, page } = await newBrowser.init()
  // await makeLogin(page)
  // browser.userAgent()
  await page.goto('https://google.com.br', { waitUntil: 'networkidle0' })
  await browser.close()
})()
