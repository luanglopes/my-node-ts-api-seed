import { container } from 'tsyringe'

import IHashProvider from './HashProvider/interfaces/IHashProvider'
import BcryptHashProvider from './HashProvider/implementations/BcryptHashProvider'

import IAuthTokenProvider from './TokenProvider/interfaces/IAuthTokenProvider'
import JWTTokenProvider from './TokenProvider/implementations/JWTTokenProvider'

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider)
container.registerSingleton<IAuthTokenProvider>(
  'AuthTokenProvider',
  JWTTokenProvider,
)
