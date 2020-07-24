import { Request, Response, NextFunction } from 'express'

import EUserRoles from '@modules/users/domain/enums/EUserRoles'
import AppError from '@shared/errors/AppError'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

export default (...roles: Array<EUserRoles>) =>
  async function ensureHasRole (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user } = req

    if (!user) {
      throw new AppError('Not Authenticated', 401)
    }

    const usersRepository = new UsersRepository()

    const userData = await usersRepository.findById(user.id)

    if (!userData) {
      throw new AppError('User does not exists', 401)
    }

    const isAuthorized = roles.includes(userData.role)

    if (!isAuthorized) {
      throw new AppError('You are not authorized to access this route', 403)
    }

    next()
  }
