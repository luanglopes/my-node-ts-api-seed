import AppError from '@shared/errors/AppError'
import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import EUserRoles from '../enums/EUserRoles'

describe('CreateUserService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let fakeHashProvider: FakeHashProvider
  let createUserService: CreateUserService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  })

  it('should hash password before create user', async () => {
    const generateHashSpy = jest.spyOn(fakeHashProvider, 'generateHash')
    const createUserSpy = jest.spyOn(fakeUsersRepository, 'create')

    generateHashSpy.mockReturnValue(Promise.resolve('hashed-password'))

    const data = {
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      phone: '99999999',
      password: 'password',
    }

    const result = await createUserService.execute(data)

    expect(result.password).toEqual('hashed-password')
    expect(createUserSpy).toHaveBeenCalledWith({
      ...data,
      password: 'hashed-password',
    })
  })

  it('should throw if provided email is already in use by another user', async () => {
    const fakeUser = {
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Tre',
      phone: '99999998',
      password: 'password',
    }

    await fakeUsersRepository.create(fakeUser)

    const data = {
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      phone: '99999999',
      password: 'password',
    }

    await expect(createUserService.execute(data)).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should throw if provided phone is already in use by another user', async () => {
    const fakeUser = {
      birthday: new Date(),
      email: 'jon.tre@email.com',
      name: 'Jon Tre',
      phone: '99999999',
      password: 'password',
    }

    await fakeUsersRepository.create(fakeUser)

    const data = {
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      phone: '99999999',
      password: 'password',
    }

    await expect(createUserService.execute(data)).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should set user role to "user" by default if it id not provided on data', async () => {
    const data = {
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      phone: '99999999',
      password: 'password',
    }

    const result = await createUserService.execute(data)

    expect(result.role).toEqual(EUserRoles.user)
  })

  it('should use role provided on data to create user', async () => {
    const data = {
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      phone: '99999999',
      password: 'password',
      role: EUserRoles.admin,
    }

    const result = await createUserService.execute(data)

    expect(result.role).toEqual(EUserRoles.admin)
  })
})
