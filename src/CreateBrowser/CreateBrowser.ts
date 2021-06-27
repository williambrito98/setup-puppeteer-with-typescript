import { Browser, launch, Page } from 'puppeteer-core'
import fs from 'fs'
import path from 'path'
import { ConfigUser } from './types/UserBrowserConfig'

export default class CreateBrowser {
  private browser: Browser
  private page: Page

  async init () {
    const pathConfigJson = path.join(path.resolve(), 'src', 'CreateBrowser', 'config', 'UserBrowserConfig.json')
    const json = JSON.parse(fs.readFileSync(pathConfigJson, { encoding: 'utf-8' })) as ConfigUser
    this.browser = await launch(json)
    this.page = await this.browser.newPage()

    this.page.setDefaultTimeout(80000)
    this.page.setDefaultNavigationTimeout(80000)

    await this.page.setViewport(json.defaultViewport)

    this.page.on('dialog', async (dialog) => {
      await dialog.accept()
    })

    this.page = await this.setLocalDownloadFiles(this.page, json.pathDownload)
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
