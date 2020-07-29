import AppError from '@shared/errors/AppError'
import UpdateUserService from './UpdateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import EUserRoles from '../enums/EUserRoles'

describe('UpdateUserService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let fakeHashProvider: FakeHashProvider
  let updateUserService: UpdateUserService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  })

  it('should update a user with provided id and return updated user', async () => {
    const { id } = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      password: 'fake-password',
      phone: '99999999',
    })

    const data = {
      birthday: new Date(),
      email: 'jon.tre@email.com',
      name: 'Jon Doe Tre',
      phone: '99999998',
    }

    const result = await updateUserService.execute({ id, data })

    expect(result).toMatchObject(data)
  })

  it('should throw if no user with provided id is found', async () => {
    const data = {
      birthday: new Date(),
      email: 'jon.tre@email.com',
      name: 'Jon Doe Tre',
      phone: '99999998',
    }

    await expect(
      updateUserService.execute({ id: 1, data }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw if email provided on data was already used by another user', async () => {
    const { id } = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      password: 'fake-password',
      phone: '99999999',
    })

    await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon.tre@email.com',
      name: 'Jon Tre',
      password: 'fake-password',
      phone: '99999997',
    })

    const data = {
      birthday: new Date(),
      email: 'jon.tre@email.com',
      name: 'Jon Doe Tre',
      phone: '99999998',
    }

    await expect(
      updateUserService.execute({ id, data }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw if phone provided on data was already used by another user', async () => {
    const { id } = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      password: 'fake-password',
      phone: '99999999',
    })

    await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon.tre@email.com',
      name: 'Jon Tre',
      password: 'fake-password',
      phone: '99999998',
    })

    const data = {
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      phone: '99999998',
    }

    await expect(
      updateUserService.execute({ id, data }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should hash the password before update if it is provided on data', async () => {
    const generateHashSpy = jest.spyOn(fakeHashProvider, 'generateHash')
    const updateUserSpy = jest.spyOn(fakeUsersRepository, 'update')

    generateHashSpy.mockReturnValue(Promise.resolve('hashed-password'))

    const { id } = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      password: 'fake-password',
      phone: '99999999',
    })

    const data = {
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      password: 'new-password',
      phone: '99999999',
      role: EUserRoles.user,
    }

    const result = await updateUserService.execute({ id, data })

    expect(result.password).toEqual('hashed-password')
    expect(updateUserSpy).toHaveBeenCalledWith({
      ...data,
      id: 1,
      password: 'hashed-password',
    })
  })
})
