import { Router } from 'express';
import LocationController from './locations.controller';
import { RequestValidator } from '../../shared/middleware';

const locationRouter = new Router();
const { validateFullLocationBody, validateUpdateRequestParams } = RequestValidator;

locationRouter
  .route('')
  .post(
    validateFullLocationBody,
    LocationController.createLocation,
  )

locationRouter
  .route('')
  .get(LocationController.listLocations)

locationRouter
  .route('/:id')
  .put(
    validateFullLocationBody,
    validateUpdateRequestParams,
    LocationController.updateLocation
  )

export default locationRouter;
