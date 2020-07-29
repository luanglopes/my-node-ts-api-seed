import jwt from 'jsonwebtoken'

import IUserEntity from '@modules/users/entities/IUserEntity'
import authConfig from '@config/auth'
import IAuthTokenProvider from '../interfaces/IAuthTokenProvider'

export default class JWTTokenProvider implements IAuthTokenProvider {
  async generateToken (user: IUserEntity): Promise<string> {
    return new Promise((resolve, reject) => {
      const { secret, expiresIn } = authConfig.jwt
      jwt.sign(
        {},
        secret,
        {
          subject: String(user.id),
          expiresIn,
        },
        (err, token) => {
          if (err) {
            reject(err)
          } else if (token) {
            resolve(token)
          }
        },
      )
    })
  }

  async verifyToken (token: string): Promise<unknown | undefined> {
    const decoded = await new Promise((resolve) => {
      const { secret } = authConfig.jwt
      jwt.verify(token, secret, (err, data) => {
        if (err) {
          resolve()
        } else if (data) {
          resolve(data)
        }
      })
    })

    return (decoded as Record<string, unknown>) || undefined
  }
}
