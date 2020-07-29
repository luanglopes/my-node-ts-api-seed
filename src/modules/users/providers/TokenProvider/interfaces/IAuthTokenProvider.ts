import IUserEntity from '@modules/users/entities/IUserEntity'
import ITokenPayload from './ITokenPayload'

export default interface IAuthTokenProvider {
  generateToken(user: IUserEntity): Promise<string>

  verifyToken(token: string): Promise<ITokenPayload | undefined>
}
