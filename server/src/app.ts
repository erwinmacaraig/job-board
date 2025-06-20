import express from 'express';
import BaseRoute from './routes/BaseRoute';
import XMLProcessorRoutes from './routes/XMLProcessorRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/jobs', BaseRoute);
app.use('/xml-processor', XMLProcessorRoutes);

export default app;
