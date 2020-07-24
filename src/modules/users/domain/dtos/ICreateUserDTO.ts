import IUserEntity from '../entities/IUserEntity'

export default interface ICreateUserDTO {
  name: IUserEntity['name']
  birthday: IUserEntity['birthday']
  phone: IUserEntity['phone']
  email: IUserEntity['email']
  password: IUserEntity['password']
  role?: IUserEntity['role']
}
