import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import 'express-async-errors'

import AppError from '@shared/errors/AppError'
import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.use(async () => {
  throw new AppError('Endpoint Not Found', 404)
})

app.use(errorHandler)

export { app }
