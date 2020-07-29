import IUserEntity from '@modules/users/entities/IUserEntity'

export default interface IAuthTokenProvider {
  generateToken(user: IUserEntity): Promise<string>

  verifyToken(token: string): Promise<unknown | undefined>
}
