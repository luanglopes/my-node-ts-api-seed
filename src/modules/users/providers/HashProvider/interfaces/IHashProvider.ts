export default interface IHashProvider {
  generateHash(raw: string): Promise<string>
  compareHash(raw: string, hashed: string): Promise<boolean>
}
