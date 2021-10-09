import { Worker } from 'worker_threads'

export class RobotWorker extends Worker {
  constructor (private absolutePathFIleInitRobot : string) {
    super(absolutePathFIleInitRobot)
  }

  public sendMessage (message : string) {
    this.postMessage(message)
  }

  public closeWorker () {
    this.sendMessage('close')
  }

  public listenMessagem () {
    return this.on('message', msg => msg)
  }
}
