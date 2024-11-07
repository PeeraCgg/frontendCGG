import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import getUser from './controllers/getUser.js'
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import AuthRoutes from './routes/Auth.routes.js';


dotenv.config();
const app = express();
const PORT = 3001;
// กำหนด __dirname ใน ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// middleware
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hacker know stack
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cors
app.use(cors());


//api way
app.use('/auth',AuthRoutes)
app.use('/user',getUser)

// เสิร์ฟไฟล์ React ที่ build ไว้จากโฟลเดอร์ main/app/build
app.use(express.static(path.join(__dirname, '../Main/app/build')));

// จัดการเส้นทางอื่น ๆ ให้ส่งไปที่ index.html ของ React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Main/app/build', 'index.html'));
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



export default app;
