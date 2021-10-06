import puppeteer, { Browser, Page } from 'puppeteer-core'
import { config } from 'dotenv'
config({ path: `${process.cwd()}/src/CreateBrowser/config/.env` })

export default class CreateBrowser {
  private browser: Browser
  private page: Page

  async init () {
    const CONFIG = this.setConfig()
    this.browser = await puppeteer.launch(CONFIG)
    this.page = await this.browser.newPage()

    this.page.setDefaultTimeout(80000)
    this.page.setDefaultNavigationTimeout(80000)

    await this.page.setViewport(CONFIG.defaultViewport)

    this.page.on('dialog', async (dialog) => {
      await dialog.accept()
    })

    this.page = await this.setLocalDownloadFiles(this.page, CONFIG.pathDownload)
    return { browser: this.browser, page: this.page }
  }

  public async setLocalDownloadFiles (page: Page, localDownload: string) {
    // @ts-ignore
    await page._client.send('Page.setDownloadBehavior', {
      downloadPath: localDownload,
      behavior: 'allow'
    })

    return page
  }

  public async closeAll (browser: Browser) {
    const pages = await browser.pages()
    pages.map(async p => p.close())
    await browser.close()
  }

  private setConfig () {
    return {
      pathDownload: process.env.pathDownload,
      executablePath: process.env.executablePath,
      userDataDir: process.env.userDataDir,
      slowMo: parseInt(process.env.slowMo, 10),
      args: process.env.args.split(','),
      defaultViewport: JSON.parse(process.env.defaultViewport),
      ignoreDefaultArgs: process.env.ignoreDefaultArgs.split(','),
      ignoreHTTPSErrors: this.strToBoolean(process.env.ignoreHTTPSErrors),
      headless: this.strToBoolean(process.env.headless)
    }
  }

  private strToBoolean (str: string) {
    return str === 'true'
  }
}
