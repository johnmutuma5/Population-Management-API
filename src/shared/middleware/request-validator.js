import Joi from '@hapi/joi';
import { createLocationBodySchema } from './request-schemas';

export default class RequestValidator {
  static validateCreateLocationBody(req, res, next) {
    const { body: { name, femaleCount, maleCount, parentLocationId } } = req;
    const data = { name, femaleCount, maleCount, parentLocationId };

    const { error, value } = Joi.validate(data, createLocationBodySchema);
    if (error && error.isJoi) {
      const { details: [ details ] } = error;
      const { path: [ field ] } = details;

      return res.status(400).json({
        status: 'fail',
        errorCode: 'INVALIDBODY',
        message: 'Missing or invalid value in request body',
        error: { path: field },
      });
    }
    // proceed to process the request
    return next();
  }
}
