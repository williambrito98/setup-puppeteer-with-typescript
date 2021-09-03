import { Browser, launch, Page } from 'puppeteer-core'
import CONFIG from './config/UserBrowserConfig.json'

export default class CreateBrowser {
  private browser: Browser
  private page: Page

  async init () {
    this.browser = await launch(CONFIG)
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

  public async setLocalDownloadFiles (page : Page, localDownlod: string) {
    // @ts-ignore
    await page._client.send('Page.setDownloadBehavior', {
      downloadPath: localDownlod,
      behavior: 'allow'
    })

    return page
  }
}
