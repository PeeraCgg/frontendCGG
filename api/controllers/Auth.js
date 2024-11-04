import { generateOtp } from '../middleware/OtpController.js';// ฟังก์ชันสร้าง OTP และบันทึกลงใน DB
import { sendOtpEmail } from '../middleware/EmailService.js';  // ฟังก์ชันส่งอีเมล OTP
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send('Email is required');
    }
     // ตรวจสอบว่ามีผู้ใช้ที่ใช้อีเมลนี้หรือยัง
     let user = await prisma.usermain.findUnique({
      where: { email },
    });
      // ถ้าไม่มีผู้ใช้ที่ใช้อีเมลนี้ ให้สร้างผู้ใช้ใหม่ที่มีเฉพาะอีเมลนี้
      if (!user) {
        user = await prisma.usermain.create({
          data: {
            email,
           },
        });
      }

    // สร้างและบันทึก OTP
    const otp = await generateOtp(email);

    // ส่งอีเมล OTP
    await sendOtpEmail(email, otp);

    // ส่งการตอบกลับว่า OTP ถูกส่งแล้ว
    res.status(200).send('OTP has been sent to your email');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const otpRecord = await prisma.otp.findFirst({
        where: {
          email,
          otp,
          expiresAt: {
            gt: new Date(),
          },
        },
      });
  
      if (!otpRecord) {
        return res.status(400).send('Invalid or expired OTP');
      }
  
      await prisma.otp.delete({
        where: { id: otpRecord.id },
      });
  
      res.status(200).send('OTP verified successfully');
    } catch (error) {
      res.status(500).send('Error verifying OTP');
    }
  };




  export { requestOtp, verifyOtp };