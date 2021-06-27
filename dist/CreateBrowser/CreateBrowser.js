'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

const _puppeteerCore = require('puppeteer-core')

const _fs = _interopRequireDefault(require('fs'))

const _path = _interopRequireDefault(require('path'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

class CreateBrowser {
  async init () {
    const pathConfigJson = _path.default.join(_path.default.resolve(), 'src', 'CreateBrowser', 'config', 'UserBrowserConfig.json')

    const json = JSON.parse(_fs.default.readFileSync(pathConfigJson, {
      encoding: 'utf-8'
    }))
    this.browser = await (0, _puppeteerCore.launch(json))
    this.page = await this.browser.newPage()
    this.page.setDefaultTimeout(80000)
    this.page.setDefaultNavigationTimeout(80000)
    await this.page.setViewport(json.defaultViewport)
    this.page.on('dialog', async dialog => {
      await dialog.accept()
    })
    this.page = await this.setLocalDownloadFiles(this.page, json.pathDownload)
    return {
      browser: this.browser,
      page: this.page
    }
  }

  async setLocalDownloadFiles (page, localDownlod) {
    // @ts-ignore
    await page._client.send('Page.setDownloadBehavior', {
      downloadPath: localDownlod,
      behavior: 'allow'
    })
    return page
  }
}

exports.default = CreateBrowser
