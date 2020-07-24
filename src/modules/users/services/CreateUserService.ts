import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ICreateUserDTO from '../domain/dtos/ICreateUserDTO'
import IUsersRepository from '../domain/repositories/IUsersRepository'
import IUserEntity from '../domain/entities/IUserEntity'
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider'

@injectable()
export default class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute (data: ICreateUserDTO): Promise<IUserEntity> {
    const [userWithEmail, userWithPhone] = await Promise.all([
      this.usersRepository.findByEmail(data.email),
      this.usersRepository.findByPhone(data.phone),
    ])

    if (userWithEmail) {
      throw new AppError('Email already in use')
    }

    if (userWithPhone) {
      throw new AppError('Phone already in use')
    }

    data.password = await this.hashProvider.generateHash(data.password)

    const user = await this.usersRepository.create(data)

    return user
  }
}
