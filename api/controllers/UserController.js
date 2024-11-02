import express from 'express';
import { PrismaClient } from '@prisma/client'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const prisma = new PrismaClient(); // เป็นการสร้างตัวแปร เพื่อใช้ 
const app = express.Router();


function checkSingIn (req,res, next){
try{
    const secret = process.env.TOKEN_SECRET;
    const token = req.headers['authorization'];
    const result = jwt.verify(token, secret); // ฟังชันเช็คsign in
    if(result != undefined){
        next();
    }

} catch(e){

    res.status(500).send({error: e.message});

}
function getUserId(req ,res) {
    try{
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization'];
        const result = jwt.verify(token, secret); // ฟังชันเช็คsign in
        if(result != undefined){
            return result.id;
        }
    
    } catch(e){
    
        res.status(500).send({error: e.message});
}

}
 app.post('/signIn',async (req, res) => { 
try{
if(req.body.user == undefined || req.body.pass == undefined ){
        return res.status(401).send('unauthorized');
    }
 const user = await prisma.user.findFirst({
 select:{
 id: true,
 name: true,
},
where:{
user: req.body.user,
pass: req.body.pass,
status: 'use'
}
})
if(user != null){
 const secret = process.env.TOKEN_SECRET;
 const token = jwt.sign(user, secret, { expiresIn: '15d'});
 return res.send({ token :token});

}
res.status(401).send({error : 'unauthorized'});


}catch(e){
    res.status(500).send({error: e.message});
}

});
app.get('/info', checkSingIn, async (req,res,next)=>{
try{
 const userId = getUserId(req,res);
 const user = await prisma.user.findFirst({
    select :{
      name: true
    },
    where:{
        id:userId
    }
 }) // นำไปใช้เวลาสร้าง หลัง verify มาเช็คว่ามี user อยู่ไหมถ้ามีให้โชว์
}catch(e){
    res.status(500).send({error: e.message});
    
}

});
}




export default app;