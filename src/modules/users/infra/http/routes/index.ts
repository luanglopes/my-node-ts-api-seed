import { Router } from 'express'

import usersRouter from './users.router'
import authRouter from './auth.router'
import profileRouter from './profile.router'

const router = Router()

router.use('/users', usersRouter)
router.use('/auth', authRouter)
router.use('/profile', profileRouter)

export default router
