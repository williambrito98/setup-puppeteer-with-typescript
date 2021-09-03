import axios from 'axios'
import CONFIG from '../config.json'
import { resolve as res } from 'path'
import { readFileSync } from 'fs'
export async function resolveCaptcha () {
  async function submitCaptcha () {
    return new Promise((resolve, reject) => {
      axios.post(CONFIG.submit.url,
        {
          method: CONFIG.submit.method,
          key: CONFIG.key,
          body: readFileSync(res('./src/components/captcha/normal/images/captcha.png'), { encoding: 'base64' })
        }).then(response => resolve(response.data.replace('OK|', '').trim()))
        .catch(error => reject(error))
    })
  }
  async function getCaptchaSolution (id: Number) {
    return new Promise((resolve, reject) => {
      axios.get(CONFIG.solution.url, {
        params: {
          action: CONFIG.solution.action,
          key: CONFIG.key,
          id: id
        }
      }).then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  }

  const idSubmitImage = await submitCaptcha().catch(e => 'error')
  if (idSubmitImage === 'error') {
    console.log('erro ao enviar imagem')
    return false
  }

  const solutionCaptha = await getCaptchaSolution(Number(idSubmitImage)) as string
  if (!solutionCaptha.includes('OK|')) {
    console.log('erro ao resolver captcha ' + solutionCaptha)
    return false
  }

  return solutionCaptha.replace('OK|', '')
}
