import { Segments, Joi } from 'celebrate'
import EUserRoles from '@modules/users/enums/EUserRoles'

const usersValidators = {
  index: {
    [Segments.QUERY]: {
      page: Joi.number().min(1),
      size: Joi.number().min(1),
    },
  },
  getOne: {
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  },
  create: {
    [Segments.BODY]: {
      name: Joi.string().required(),
      birthday: Joi.date().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid(...Object.values(EUserRoles)),
    },
  },
  update: {
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      birthday: Joi.date().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6),
      role: Joi.string().allow(...Object.values(EUserRoles)),
    },
  },
  delete: {
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  },
}

export default usersValidators
