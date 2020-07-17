import AppError from '@shared/errors/AppError'
import ShowUserService from './ShowUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

describe('ShowUserService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let showUserService: ShowUserService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showUserService = new ShowUserService(fakeUsersRepository)
  })

  it('should return a user with provided id using users repository', async () => {
    const findByIdSpy = jest.spyOn(fakeUsersRepository, 'findById')

    const user = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      password: 'fake-password',
      phone: '99999999',
    })

    const result = await showUserService.execute(user.id)

    expect(result).toMatchObject(user)
    expect(findByIdSpy).toHaveBeenCalledWith(user.id)
  })

  it('should thorw if no user is found provided id', async () => {
    await expect(showUserService.execute(1)).rejects.toBeInstanceOf(AppError)
  })
})
