import { Router } from 'express';
import LocationController from './locations.controller';
import { RequestValidator } from '../../shared/middleware';

const locationRouter = new Router();
const { validateCreateLocationBody } = RequestValidator;

locationRouter
  .route('')
  .post(
    validateCreateLocationBody,
    LocationController.createLocation,
  )

export default locationRouter;
