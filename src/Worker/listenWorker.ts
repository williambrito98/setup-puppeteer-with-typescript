import { parentPort } from 'worker_threads'

export function listenClose () {
  parentPort.on('message', msg => {
    console.log(msg)
    if (msg === 'close') { process.exit(0) }
  })
}

export function sendMessage (message) {
  parentPort.postMessage(message)
}
