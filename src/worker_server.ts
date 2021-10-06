import { Worker } from 'worker_threads'

export async function run (pathIndexRobot) {
  return new Worker(pathIndexRobot)
}
