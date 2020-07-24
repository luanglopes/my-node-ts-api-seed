import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ShowUserService from '@modules/users/services/ShowUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import CreateUserService from '@modules/users/services/CreateUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

export default class UserController {
  async index (req: Request, res: Response): Promise<Response> {
    const { page, size } = req.query
    const parsedSize = size ? +size : undefined
    const parsedPage = page ? +page : undefined

    const usersRepository = new UsersRepository()

    const users = await usersRepository.list({
      page: parsedPage,
      size: parsedSize,
    })

    return res.json(
      users.map((user) => {
        delete user.password

        return user
      }),
    )
  }

  async getOne (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const showBookService = container.resolve(ShowUserService)

    const user = await showBookService.execute(+id)

    delete user.password

    return res.json(user)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const data = req.body

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute(data)

    delete user.password

    return res.status(201).json(user)
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const data = req.body

    const updateBookService = container.resolve(UpdateUserService)

    const user = await updateBookService.execute({ id: +id, data })

    delete user.password

    return res.json(user)
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const usersRepository = new UsersRepository()

    await usersRepository.delete(+id)

    return res.sendStatus(204)
  }
}
