import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IAuthTokenProvider from '../providers/TokenProvider/interfaces/IAuthTokenProvider'
import IUsersRepository from '../domain/repositories/IUsersRepository'
import IUserEntity from '../domain/entities/IUserEntity'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

interface IRequest {
  token: string
}

@injectable()
export default class VerifyAuthTokenService {
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

    const { sub: id } = decoded as ITokenPayload

    const user = await this.usersRepository.findById(+id)

    if (!user) {
      throw new AppError('Invalid token', 401)
    }

    return user
  }
}
