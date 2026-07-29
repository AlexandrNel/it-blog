import { initServer } from './app.js'
import { initCron } from './shared/cron/client.js'
import { initRedis } from './shared/redis/client.js'

initServer()
initRedis()
initCron()
