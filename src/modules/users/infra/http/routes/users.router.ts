import { Router } from 'express'

import EUserRoles from '@modules/users/domain/enums/EUserRoles'
import ensureValidation from '@shared/infra/http/middlewares/ensureValidation'
import UserController from '../controllers/UserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureHasRole from '../middlewares/ensureHasRole'
import usersValidators from '../validators/users.validator'

const usersRouter = Router()
const userController = new UserController()

usersRouter.get(
  '/',
  ensureValidation(usersValidators.index),
  userController.index,
)

usersRouter.get(
  '/:id',
  ensureValidation(usersValidators.getOne),
  userController.getOne,
)

usersRouter.post(
  '/',
  ensureValidation(usersValidators.create),
  userController.create,
)

usersRouter.put(
  '/:id',
  ensureValidation(usersValidators.update),
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin),
  userController.update,
)

usersRouter.delete(
  '/:id',
  ensureValidation(usersValidators.delete),
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin),
  userController.delete,
)

export default usersRouter
