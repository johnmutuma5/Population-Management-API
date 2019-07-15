import Joi from '@hapi/joi';
Joi.objectId = require('joi-objectid')(Joi);

// full location
export const fullLocationBodySchema = {
  name: Joi.string().required(),
  maleCount: Joi.number().required(),
  femaleCount: Joi.number().integer().required(),
  parentLocationId: Joi.objectId(),
};

export const requestParamsObjectIdSchema = {
  id: Joi.objectId(),
}
