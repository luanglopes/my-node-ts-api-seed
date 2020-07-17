import bcrypt from 'bcrypt'

import IHashProvider from '../interfaces/IHashProvider'

export default class BcryptHashProvider implements IHashProvider {
  async generateHash (raw: string): Promise<string> {
    return bcrypt.hash(raw, 10)
  }

  async compareHash (raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed)
  }
}
