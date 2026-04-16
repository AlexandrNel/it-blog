import { initServer } from './app.js'
import { initRedis } from './shared/redis/client.js'

initServer()
initRedis()
