import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import getUser from './controllers/getUser.js'
dotenv.config();

const app = express();
const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const Host = '0.0.0.0';



app.use('/user',getUser)





 app.listen(PORT, Host, () => {
  console.log(`Server running on http://${Host}:${PORT}`);
});

export default app;
