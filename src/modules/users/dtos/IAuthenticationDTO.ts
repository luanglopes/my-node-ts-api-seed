import IUserEntity from '../entities/IUserEntity'

export default interface IAUthenticationDTO {
  token: string
  user: IUserEntity
}
