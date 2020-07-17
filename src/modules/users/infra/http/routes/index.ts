import { Router } from 'express'

import usersRouter from './users.router'
import authRouter from './auth.router'

const router = Router()

router.use('/users', usersRouter)
router.use('/auth', authRouter)

export default router
