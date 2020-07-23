import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'

import ValidateAuthTokenService from '@modules/users/services/ValidateAuthTokenService'
import AppError from '@shared/errors/AppError'

export default async function ensureAuthenticated (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = req.headers

  if (!authorization) {
    throw new AppError('Token not provided', 401)
  }

  const [, token] = authorization.split(' ')

  if (!token) {
    throw new AppError('Token not provided', 401)
  }

  const validateAuthTokenService = container.resolve(ValidateAuthTokenService)

  const user = await validateAuthTokenService.execute({ token })

  req.user = {
    id: user.id,
  }

  next()
}
