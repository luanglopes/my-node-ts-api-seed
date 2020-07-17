import IHashProvider from '../interfaces/IHashProvider'

export default class FakeHashProvider implements IHashProvider {
  async generateHash (raw: string): Promise<string> {
    return raw
  }

  async compareHash (raw: string, hashed: string): Promise<boolean> {
    return raw === hashed
  }
}
