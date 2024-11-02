import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import getUser from './controllers/getUser.js'
import morgan from 'morgan';

import AuthRoutes from './routes/Auth.routes.js';


dotenv.config();
const app = express();
const PORT = 3001;

app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hacker know stack
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());



app.use('/auth',AuthRoutes)
app.use('/user',getUser)





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
