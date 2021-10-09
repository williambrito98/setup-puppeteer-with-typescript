import CreateBrowser from './CreateBrowser/CreateBrowser'
import { sendMessage } from './Worker/listenWorker'

(async () => {
  try {
    const newBrowser = new CreateBrowser()
    const { browser, page } = await newBrowser.init()
    await page.goto('https://google.com.br', { waitUntil: 'networkidle0' })
    sendMessage('MENSAGEM')
    await page.waitForTimeout(10000)
    await newBrowser.closeAll(browser)
  } catch (error) {
    console.log('error APP')
  }
})()
