import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import { CelebrateInternalError, isCelebrate } from 'celebrate'

import AppError from '@shared/errors/AppError'

const compileCelebrateErrors = (
  details: CelebrateInternalError['joi']['details'],
) => {
  const fieldsObj = {}

  details.forEach((detail) => {
    const {
      type,
      context: { key, ...validationCtx },
    } = detail

    delete validationCtx.label
    delete validationCtx.value

    if (fieldsObj[detail.context.key]) {
      fieldsObj[detail.context.key].errors.push({ type, ...validationCtx })
    } else {
      fieldsObj[detail.context.key] = {
        name: key,
        errors: [{ type, ...validationCtx }],
      }
    }
  })

  return Object.values(fieldsObj)
}

const errorHandler: ErrorRequestHandler = (
  err: Error | CelebrateInternalError,
  _req: Request,
  res: Response,
  _: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      error: 'AppError',
      message: err.message,
      details: err.details,
    })
  }

  if (isCelebrate(err)) {
    const {
      joi: { details },
    } = err as CelebrateInternalError
    const errors = compileCelebrateErrors(details)

    return res.status(400).json({
      status: 'error',
      error: 'ValidationError',
      message:
        'Some fields have errors, make sure you are providing valid values',
      fields: errors,
    })
  }

  // eslint-disable-next-line no-console
  console.error(err)

  return res.status(500).json({
    status: 'error',
    error: 'UnknownError',
    message: 'Internal Server Error',
  })
}

export default errorHandler
