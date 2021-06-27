import { Viewport } from 'puppeteer-core'

export type ConfigUser = {
    pathChrome: string
    pathDownload?: string
    headless: boolean
    userDataDir: string
    slowMo: number
    args: Array<string>
    defaultViewport: Viewport
    ignoreDefaultArgs: Array<string>
}
