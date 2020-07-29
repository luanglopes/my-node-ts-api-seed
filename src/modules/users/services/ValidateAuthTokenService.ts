import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IAuthTokenProvider from '../providers/TokenProvider/interfaces/IAuthTokenProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserEntity from '../entities/IUserEntity'

interface IRequest {
  token: string
}

@injectable()
export default class ValidateAuthTokenService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AuthTokenProvider')
    private authTokenProvider: IAuthTokenProvider,
  ) {}

  async execute ({ token }: IRequest): Promise<IUserEntity> {
    const decoded = await this.authTokenProvider.verifyToken(token)

    if (!decoded) {
      throw new AppError('Invalid token', 401)
    }

    const { sub: id } = decoded

    const user = await this.usersRepository.findById(+id)

    if (!user) {
      throw new AppError('Invalid token', 401)
    }

    return user
  }
}
