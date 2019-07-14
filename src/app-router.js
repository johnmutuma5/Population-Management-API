import { Router } from 'express';
import { locationRouter } from './modules/locations';
const appRouter = new Router();

// register all modules' routes here
appRouter.use('/locations', locationRouter);

export default appRouter;
