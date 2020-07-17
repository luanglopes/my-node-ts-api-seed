interface IDetails {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

class AppError {
  public readonly message: string

  public readonly statusCode: number

  public readonly details?: IDetails

  constructor (message: string, statusCode = 400, details?: IDetails) {
    this.message = message
    this.statusCode = statusCode
    this.details = details
  }
}

export default AppError
