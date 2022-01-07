import puppeteer, { Browser, Page } from 'puppeteer-core'

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
    await this.closeAllPages(pages)
    await browser.close()
  }

  private async closeAllPages (pages : Array<Page>) {
    if (pages.length === 0) {
      return true
    }
    await pages.pop().close()
    return await this.closeAllPages(pages)
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
