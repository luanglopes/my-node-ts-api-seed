import { container } from 'tsyringe'

// users module providers
import '@modules/users/providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

// users module
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
