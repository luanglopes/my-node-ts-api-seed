import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUpdateUserDTO from '../dtos/IUpdateUserDTO'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserEntity from '../entities/IUserEntity'
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider'

interface IRequest {
  id: number
  data: IUpdateUserDTO
}

@injectable()
export default class UpdateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute ({ id, data }: IRequest): Promise<IUserEntity> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User does not exists', 404)
    }

    if (user.email !== data.email) {
      const userWithEmail = await this.usersRepository.findByEmail(data.email)

      if (userWithEmail && userWithEmail.id !== id) {
        throw new AppError('Email already in use')
      }
    }

    if (user.phone !== data.phone) {
      const userWithPhone = await this.usersRepository.findByPhone(data.phone)

      if (userWithPhone && userWithPhone.id !== id) {
        throw new AppError('Phone already in use')
      }
    }

    if (data.password) {
      data.password = await this.hashProvider.generateHash(data.password)
    }

    const userData = { ...user, ...data, id }

    const updatedUser = await this.usersRepository.update(userData)

    return updatedUser
  }
}
