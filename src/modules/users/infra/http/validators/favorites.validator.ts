import { Segments, Joi } from 'celebrate'

const favoritesValidators = {
  create: {
    [Segments.BODY]: {
      bookId: Joi.number().required(),
    },
  },
  delete: {
    [Segments.PARAMS]: {
      bookId: Joi.number().required(),
    },
  },
}

export default favoritesValidators
