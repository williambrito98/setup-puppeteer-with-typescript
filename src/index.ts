import CreateBrowser from './CreateBrowser/CreateBrowser'
import { config } from 'dotenv'
import { parse, join } from 'path'

(async () => {
  try {
    config({ path: join(parse(__dirname).dir, '.env') })
    const newBrowser = new CreateBrowser()
    const { browser, page } = await newBrowser.init()
    await page.goto('https://google.com.br', { waitUntil: 'networkidle0' })
    await page.waitForTimeout(10000)
    await newBrowser.closeAll(browser)
  } catch (error) {
    console.log(error)
  }
})()
