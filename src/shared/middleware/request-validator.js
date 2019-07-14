import Joi from '@hapi/joi';
import { 
  fullLocationBodySchema,
  updateLocationParamsSchema,
} from './request-schemas';

export default class RequestValidator {
  static validateFullLocationBody(req, res, next) {
    const { body: { name, femaleCount, maleCount, parentLocationId } } = req;
    const data = { name, femaleCount, maleCount, parentLocationId };

    const { error, value } = Joi.validate(data, fullLocationBodySchema);
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

  static validateUpdateRequestParams (req, res, next) {
    const { params } = req;

    const { error, value } = Joi.validate(params, updateLocationParamsSchema);
    if (error && error.isJoi) {
      const { details: [ details ] } = error;
      const { path: [ field ] } = details;

      return res.status(400).json({
        status: 'fail',
        errorCode: 'INVALIDPARAMS',
        message: 'Invalid value in request params',
        error: { path: field },
      });
    }

    return next();
  }
}
