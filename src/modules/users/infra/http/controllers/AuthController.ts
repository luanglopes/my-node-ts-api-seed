import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

export default class AuthController {
  async login (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    const authenticateUserService = container.resolve(AuthenticateUserService)

    const authData = await authenticateUserService.execute({ email, password })

    delete authData.user.password

    res.json(authData)
  }
}
