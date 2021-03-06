import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import appRouter from './app-router';
import config from './config';
import yaml from 'yamljs';
import  swaggerUi from 'swagger-ui-express';

const app = express();
const DATABASE_URI = config.DATABASE_URI; 

// connect to database
mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true, useCreateIndex: true }) 
  .then(() => console.info('APP: Connected to database'));

// register app-wide middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/v1', appRouter);

// api docs 
const swaggerDocument = yaml.load('docs/swagger.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// handle all unfound routes
app.use('*', (req, res) => (
  res.status(404).json({
    message: 'Not found', 
    app: 'population management system',
  })
));

export default app;
