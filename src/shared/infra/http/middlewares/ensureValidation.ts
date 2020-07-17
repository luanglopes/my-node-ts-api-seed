import { RequestHandler } from 'express'
import { celebrate, SchemaOptions } from 'celebrate'

export default (validator: SchemaOptions): RequestHandler =>
  celebrate(validator, { abortEarly: false })
