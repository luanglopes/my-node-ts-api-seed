import IUserEntity from '../entities/IUserEntity'

export default interface IUpdateUserDTO {
  name: IUserEntity['name']
  birthday: IUserEntity['birthday']
  phone: IUserEntity['phone']
  email: IUserEntity['email']
  password?: IUserEntity['password']
  role?: IUserEntity['role']
}
