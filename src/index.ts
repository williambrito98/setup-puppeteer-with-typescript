import CreateBrowser from './CreateBrowser/CreateBrowser'
(async () => {
  const newBrowser = new CreateBrowser()
  const { browser, page } = await newBrowser.init()
  await page.goto('https://google.com.br', { waitUntil: 'networkidle0' })
  await newBrowser.closeAll(browser)
})()
