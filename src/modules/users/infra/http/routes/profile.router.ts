import { Router } from 'express'

import ensureValidation from '@shared/infra/http/middlewares/ensureValidation'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ProfileController from '../controllers/ProfileController'
import profileValidators from '../validators/profile.validator'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.get('/', profileController.index)

profileRouter.put(
  '/',
  ensureValidation(profileValidators.update),
  ensureAuthenticated,
  profileController.update,
)

export default profileRouter
