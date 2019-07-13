import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import appRouter from './app-router';

const app = express();
const DATABASE_URI = process.env.DATABASE_URI

// connect to database
mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true, useCreateIndex: true }) 
  .then(() => console.info('APP: Connected to database'));

// register app-wide middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/v1', appRouter);

// handle all unfound routes
app.use('*', (req, res) => (
  res.status(404).json({
    message: 'Not found', 
    app: 'population management system',
  })
));

export default app;
