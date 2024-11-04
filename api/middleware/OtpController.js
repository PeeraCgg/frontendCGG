import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const generateOtp = async (email) => {
  // สร้างรหัส OTP แบบสุ่ม 6 หลัก
  const otp = crypto.randomInt(100000, 999999).toString();

  // ตั้งเวลาหมดอายุ OTP (เช่น หมดอายุภายใน 10 นาที)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const newOtp = await prisma.otp.upsert({
    where: {
      email: email,
    },
    update: {
      otp,
      expiresAt,
      createdAt: new Date(), // Optional: Update the createdAt timestamp if needed
    },
    create: {
      email,
      otp,
      expiresAt,
    },
  });

  // คืนค่า OTP ที่สร้างขึ้นมา
  return newOtp.otp;
};
