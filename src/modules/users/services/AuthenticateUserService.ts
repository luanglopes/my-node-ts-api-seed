import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../domain/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider'
import IAuthTokenProvider from '../providers/TokenProvider/interfaces/IAuthTokenProvider'
import IAuthenticationDTO from '../domain/dtos/IAuthenticationDTO'

interface IRequest {
  email: string
  password: string
}

@injectable()
export default class AuthenticateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('AuthTokenProvider')
    private authTokenProvider: IAuthTokenProvider,
  ) {}

  async execute ({ email, password }: IRequest): Promise<IAuthenticationDTO> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password are incorrect')
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new AppError('Email or password are incorrect')
    }

    const token = await this.authTokenProvider.generateToken(user)

    return { token, user }
  }
}
