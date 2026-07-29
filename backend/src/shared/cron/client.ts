import cron from 'node-cron'
import { checkDemoUsers } from './tasks/checkDemoUsers.js'

export const initCron = () => {
  const task = cron.schedule('0 0 * * *', checkDemoUsers, {
    timezone: 'Etc/GMT+3',
    name: 'Delete-demo-users',
  })

  task.on('execution:finished', (ctx) => {
    console.log(
      `[${new Date().toISOString()}] ${ctx.task?.name}: выполнено успешно`
    )
  })

  task.on('execution:failed', (ctx) => {
    console.log(
      `[${new Date().toISOString()}] ${ctx.task?.name}, ': ошибка.', ctx.error?.message`
    )
  })
  task.execute()
}
