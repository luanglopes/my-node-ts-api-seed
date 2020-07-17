import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'

import VerifyAuthTokenService from '@modules/users/services/VerifyAuthTokenService'

export default async function ensureAuthenticated (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = req.headers

  const verifyAuthTokenService = container.resolve(VerifyAuthTokenService)

  const user = await verifyAuthTokenService.execute({
    authorizationHeader: authorization,
  })

  req.user = {
    id: user.id,
  }

  next()
}
