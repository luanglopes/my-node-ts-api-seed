import { Router } from 'express'

import ensureValidation from '@shared/infra/http/middlewares/ensureValidation'
import AuthController from '../controllers/AuthController'
import authValidators from '../validators/auth.validator'

const authRouter = Router()
const authController = new AuthController()

authRouter.post(
  '/',
  ensureValidation(authValidators.login),
  authController.login,
)

export default authRouter
