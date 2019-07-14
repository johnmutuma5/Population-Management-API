import Joi from '@hapi/joi';
Joi.objectId = require('joi-objectid')(Joi);

// create location
export const createLocationBodySchema = {
  name: Joi.string().required(),
  maleCount: Joi.number().required(),
  femaleCount: Joi.number().integer().required(),
  parentLocationId: Joi.objectId(),
};

