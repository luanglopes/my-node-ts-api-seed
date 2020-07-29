import IUserEntity from '@modules/users/entities/IUserEntity'
import IAuthTokenProvider from '../interfaces/IAuthTokenProvider'
import ITokenPayload from '../interfaces/ITokenPayload'

export default class FakeTokenProvider implements IAuthTokenProvider {
  async generateToken (user: IUserEntity): Promise<string> {
    return `fake-token-for-user-id-${user.id}`
  }

  async verifyToken (token: string): Promise<ITokenPayload | undefined> {
    const parts = token.split('-')
    return { sub: parts[parts.length - 1], iat: 123, exp: Date.now() }
  }
}
