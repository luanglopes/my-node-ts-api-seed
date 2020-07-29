import IUserEntity from '@modules/users/entities/IUserEntity'
import IAuthTokenProvider from '../interfaces/IAuthTokenProvider'

export default class FakeTokenProvider implements IAuthTokenProvider {
  async generateToken (user: IUserEntity): Promise<string> {
    return `fake-token-for-user-id-${user.id}`
  }

  async verifyToken (token: string): Promise<unknown | undefined> {
    const parts = token.split('-')
    return { sub: parts[parts.length - 1] }
  }
}
