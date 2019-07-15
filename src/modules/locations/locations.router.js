import { Router } from 'express';
import LocationController from './locations.controller';
import { RequestValidator } from '../../shared/middleware';

const locationRouter = new Router();
const { validateFullLocationBody, validateRequestParamsObjectId } = RequestValidator;

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
    validateRequestParamsObjectId,
    LocationController.updateLocation
  )

locationRouter
  .route('/:id')
  .delete(
    validateRequestParamsObjectId,
    LocationController.deleteLocation,
  )

export default locationRouter;
