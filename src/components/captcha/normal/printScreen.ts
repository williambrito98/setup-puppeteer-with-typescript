import { Page } from 'puppeteer-core'
import { resolve } from 'path'
export async function printCaptcha (page: Page, selectorImg: string) {
  await page.waitForTimeout(2500)
  const imageCaptcha = await page.$(selectorImg)
  const imageProprieties = await imageCaptcha.boundingBox()
  await page.waitForTimeout(2500)
  await page.screenshot({
    path: resolve('./src/components/captcha/normal/images/captcha.png'),
    type: 'png',
    clip: {
      x: imageProprieties.x,
      y: imageProprieties.y,
      width: imageProprieties.width,
      height: imageProprieties.height
    }
  })
}
