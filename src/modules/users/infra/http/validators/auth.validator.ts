import { Segments, Joi } from 'celebrate'

const authValidators = {
  login: {
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  },
}

export default authValidators
