import IUserEntity from '@modules/users/entities/IUserEntity'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import EUserRoles from '@modules/users/enums/EUserRoles'
import IUsersRepository from '../IUsersRepository'

export default class FakeUsersRepository implements IUsersRepository {
  private users: Array<IUserEntity> = []

  async findById (id: IUserEntity['id']): Promise<IUserEntity | undefined> {
    return this.users.find((user) => user.id === id)
  }

  async create (data: ICreateUserDTO): Promise<IUserEntity> {
    const newUser: IUserEntity = {
      role: EUserRoles.user,
      id: this.users.length + 1,
      ...data,
    }

    this.users.push(newUser)

    return newUser
  }

  async delete (id: IUserEntity['id']): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }

  async findByEmail (
    email: IUserEntity['email'],
  ): Promise<IUserEntity | undefined> {
    return this.users.find((user) => user.email === email)
  }

  async findByPhone (
    phone: IUserEntity['phone'],
  ): Promise<IUserEntity | undefined> {
    return this.users.find((user) => user.phone === phone)
  }

  async list (): Promise<Array<IUserEntity>> {
    return this.users
  }

  async update (data: IUserEntity): Promise<IUserEntity> {
    const { id } = data

    const userIndex = this.users.findIndex((user) => user.id === id)

    const user = this.users[userIndex]

    this.users[userIndex] = { ...user, ...data }

    return this.users[userIndex]
  }
}
