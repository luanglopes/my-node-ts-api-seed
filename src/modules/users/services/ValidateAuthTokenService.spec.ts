import AppError from '@shared/errors/AppError'
import VerifyAuthTokenService from './ValidateAuthTokenService'
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository'
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider'
import EUserRoles from '../domain/enums/EUserRoles'

describe('VerifyAuthTokenService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let fakeTokenProvider: FakeTokenProvider
  let verifyAuthTokenService: VerifyAuthTokenService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeTokenProvider = new FakeTokenProvider()

    verifyAuthTokenService = new VerifyAuthTokenService(
      fakeUsersRepository,
      fakeTokenProvider,
    )
  })

  it('should return a user if valid token is provided', async () => {
    const user = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      password: 'fake-password',
      phone: '99999999',
    })
    const token = await fakeTokenProvider.generateToken(user)

    const result = await verifyAuthTokenService.execute({ token })

    expect(result).toEqual(user)
  })

  it('should throw an error if empty token is provided', async () => {
    await expect(
      verifyAuthTokenService.execute({ token: '' }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw an error if invalid token is provided', async () => {
    const verifyTokenSpy = jest.spyOn(fakeTokenProvider, 'verifyToken')

    verifyTokenSpy.mockReturnValue(Promise.resolve(undefined))

    await expect(verifyAuthTokenService.execute({ token: 'invalid-token' })).rejects.toBeInstanceOf(AppError)
  })

  it('should throw an error if a token for an invalid user is provided', async () => {
    const token = await fakeTokenProvider.generateToken({
      id: 1,
      password: '',
      name: '',
      birthday: new Date(),
      email: '',
      phone: '',
      role: EUserRoles.user,
    })

    await expect(verifyAuthTokenService.execute({ token })).rejects.toBeInstanceOf(AppError)
  })
})
