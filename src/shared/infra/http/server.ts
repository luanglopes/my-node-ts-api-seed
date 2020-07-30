/* eslint-disable no-console */
import 'reflect-metadata'

import '@shared/infra/typeorm'
import '@shared/container'

import { app } from './app'

const port = process.env.PORT || '3000'

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`)
})
