import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import UpdateUserService from '@modules/users/services/UpdateUserService'

export default class ProfileController {
  async index (req: Request, res: Response): Promise<void> {
    const { user: currentUser } = req

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(currentUser.id)

    delete user.password

    res.json(user)
  }

  async update (req: Request, res: Response): Promise<void> {
    const { user: currentUser } = req
    const data = req.body

    const updateUserService = container.resolve(UpdateUserService)

    const user = await updateUserService.execute({ id: currentUser.id, data })

    delete user.password

    res.json(user)
  }
}
