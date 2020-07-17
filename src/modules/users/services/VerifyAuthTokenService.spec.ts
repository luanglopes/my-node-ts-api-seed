import AppError from '@shared/errors/AppError'
import VerifyAuthTokenService from './VerifyAuthTokenService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider'
import EUserRoles from '../enums/EUserRoles'

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

  it('should return a user if valid authotizationHeader is provided', async () => {
    const user = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      password: 'fake-password',
      phone: '99999999',
    })
    const token = await fakeTokenProvider.generateToken(user)

    const result = await verifyAuthTokenService.execute({
      authorizationHeader: `Bearer ${token}`,
    })

    expect(result).toEqual(user)
  })

  it('should throw an error if empty authorizationHeader is provided', async () => {
    await expect(
      verifyAuthTokenService.execute({
        authorizationHeader: '',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw an error if no token is provided on authorizationHeader', async () => {
    await expect(
      verifyAuthTokenService.execute({
        authorizationHeader: 'Bearer ',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw an error if invalid token is provided on authorizationHeader', async () => {
    const verifyTokenSpy = jest.spyOn(fakeTokenProvider, 'verifyToken')

    verifyTokenSpy.mockReturnValue(Promise.resolve(undefined))

    await expect(
      verifyAuthTokenService.execute({
        authorizationHeader: 'Bearer invalid',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw an error if a token for an invalid user provided on authorizationHeader', async () => {
    const token = await fakeTokenProvider.generateToken({
      id: 1,
      password: '',
      name: '',
      birthday: new Date(),
      email: '',
      phone: '',
      role: EUserRoles.user,
    })

    await expect(
      verifyAuthTokenService.execute({
        authorizationHeader: `Bearer ${token}`,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
