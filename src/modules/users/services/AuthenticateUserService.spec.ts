import AppError from '@shared/errors/AppError'
import AuthenticateUserService from './AuthenticateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider'
import IUserEntity from '../entities/IUserEntity'

describe('AuthenticateUserService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let fakeHashProvider: FakeHashProvider
  let fakeTokenProvider: FakeTokenProvider
  let authenticateUserService: AuthenticateUserService
  let testUser: IUserEntity

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeTokenProvider = new FakeTokenProvider()

    testUser = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@emial.com',
      name: 'Jon Doe',
      password: await fakeHashProvider.generateHash('password'),
      phone: '999999999',
    })

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    )
  })

  it('should authenticate user if valid email and password is provided', async () => {
    const result = await authenticateUserService.execute({
      email: testUser.email,
      password: testUser.password,
    })

    expect(result).toHaveProperty('token')
    expect(result).toHaveProperty('user', testUser)
  })

  it('should not authenticate user if invalid email is provided', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'invalid@email.com',
        password: testUser.password,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not authenticate user if invalid password is provided', async () => {
    await expect(
      authenticateUserService.execute({
        email: testUser.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
