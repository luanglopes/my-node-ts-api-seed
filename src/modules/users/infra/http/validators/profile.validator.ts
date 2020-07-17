import { Segments, Joi } from 'celebrate'

const profileValidators = {
  update: {
    [Segments.BODY]: {
      name: Joi.string().required(),
      birthday: Joi.date().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6),
    },
  },
}

export default profileValidators
