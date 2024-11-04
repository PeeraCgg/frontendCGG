
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import thaibulksmsApi from 'thaibulksms-api';

dotenv.config();
const prisma = new PrismaClient();
const app = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const options = {
    apiKey: process.env.API_KEY_I,
    apiSecret: process.env.API_SECRET_I,
};

const otp = thaibulksmsApi.otp(options);




// Endpoint to get user by mobile number
app.post('/getuser', async (req, res) => {
    const { mobile, email } = req.body; 

    try {
        // Find user by mobile number
        const user = await prisma.usermain.findUnique({
            where: email ? { email } : { mobile, email },
            include: { otps: true },

    });

        // Check if user exists and respond accordingly
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        // Log the error and respond with a server error message
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Endpoint to get all users
app.get('/all', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await prisma.usermain.findMany();

        // Respond with users data
        res.json({ success: true, users });
    } catch (error) {
        // Log the error and respond with a server error message
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
app.post('/add-or-update', async (req, res) => {
    const { name, surname, mobile, birthdate, email } = req.body;

    try {
        // ตรวจสอบว่ามีผู้ใช้ที่ใช้อีเมลหรือเบอร์โทรนี้หรือไม่
        let user = await prisma.usermain.findFirst({
            where: {
                OR: [
                    { mobile },
                    { email }
                ]
            }
        });

        if (user) {
            // ถ้ามีผู้ใช้ที่มี email หรือ mobile นี้อยู่ ให้ทำการอัปเดตข้อมูล
            user = await prisma.usermain.update({
                where: { id: user.id },
                data: {
                    name,
                    surname,
                    mobile,
                    birthdate: birthdate ? new Date(birthdate) : null, // ตรวจสอบวันที่ให้เป็นค่าว่างถ้าไม่มี
                    email,
                },
            });
            res.json({ success: true, message: 'User updated successfully', user });
        } else {
            // ถ้าไม่มีผู้ใช้อยู่แล้ว ให้สร้างข้อมูลใหม่
            user = await prisma.usermain.create({
                data: {
                    name,
                    surname,
                    mobile,
                    birthdate: birthdate ? new Date(birthdate) : null,
                    email,
                },
            });
            res.json({ success: true, message: 'User added successfully', user });
        }
    } catch (error) {
        console.error('Error adding/updating user:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.put('/update', async (req, res) => {
    const { name, surname, mobile, birthdate, email } = req.body;

    try {
        // Find and update user by mobile number
        const user = await prisma.usermain.update({
            where: { mobile },
            data: {
                name,
                surname,
                birthdate: new Date(birthdate),
                email,
            },
        });

        res.json({ success: true, message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Error updating user' });
    }
});
app.post('/saveConsent', async (req, res) => {
    const {mobile,email, checkbox1, checkbox2 } = req.body;
    console.log("Received data:", { mobile, email, checkbox1, checkbox2 }); 
    // ฟังก์ชันตรวจสอบรูปแบบเบอร์โทรศัพท์
    // const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

    try {
         // ตรวจสอบว่า mobile หรือ email ต้องมีอย่างน้อยหนึ่งค่า
         if (!mobile && !email) {
            return res.status(400).json({ success: false, message: 'Mobile or email is required' });
        }
            // ตรวจสอบรูปแบบเบอร์โทรศัพท์เฉพาะกรณีที่มีการส่ง mobile เข้ามา
        // if (mobile && !validateMobile(mobile)) {
        //     return res.status(400).json({ success: false, message: 'Invalid mobile number format' });
        //     }

             // ค้นหาผู้ใช้โดยใช้ mobile หรือ email
            const user = await prisma.usermain.findFirst({
                where: {
                    OR: [
                        { mobile },
                        { email },
                    ],
                },
            });
            console.log("User found:", user); // ตรวจสอบว่าพบผู้ใช้หรือไม่

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Upsert the consent data for the user
        const pdpa = await prisma.checkPDPA.upsert({
            where: { userId: user.id },
            update: {
                checkbox1,
                checkbox2,
            },
            create: {
                userId: user.id,
                checkbox1,
                checkbox2,
            },
        });
        console.log("Consent saved successfully:", pdpa); // ตรวจสอบว่าบันทึกข้อมูลสำเร็จหรือไม่
        res.status(201).json({ success: true, message: 'Consent saved successfully!', pdpa });
    } catch (error) {
        console.error('Error saving consent:', error); // แสดงข้อผิดพลาดโดยละเอียด
        res.status(500).json({ success: false, message: 'Failed to save consent. Please try again.' });
    }
});

app.post('/request-otp', body('phone_number').isMobilePhone('th-TH'), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let phoneNumber = req.body.phone_number
        const response = await otp.request(phoneNumber)
        res.json(response.data)

    } catch (error) {
        return res.status(500).json({ errors: error });
    }

})

app.post('/verify-otp', body('token').notEmpty(), body('otp_code').notEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let token = req.body.token
        let otpCode = req.body.otp_code
        const response = await otp.verify(token, otpCode)
        res.json(response.data)

    } catch (error) {
        return res.status(500).json({ errors: error });
    }
})


app.get('/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`GET /user/${userId} request received`);
    res.json({ message: `User with ID ${userId} fetched` });
});
app.get('/', (req, res) => {
    console.log('GET /user request received');
    res.json({ message: 'User data fetched successfully' });
});
app.get('/', (req, res) => {
    console.log('Request received at /user');
    res.json({ message: 'User data' });
});





export default app;
