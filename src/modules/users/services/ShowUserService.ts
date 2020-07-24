import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUserEntity from '../domain/entities/IUserEntity'
import IUsersRepository from '../domain/repositories/IUsersRepository'

@injectable()
export default class ShowUserService {
  constructor (
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute (id: number): Promise<IUserEntity> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  }
}
