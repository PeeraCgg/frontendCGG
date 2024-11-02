import express from 'express';
import { requestOtp, verifyOtp } from "../controllers/Auth.js";

const AuthRoutes =express.Router();



AuthRoutes.post('/request-otp-e',requestOtp); // สำหรับขอ OTP
AuthRoutes.post('/verify-otp-e', verifyOtp); // สำหรับยืนยัน OTP

export default AuthRoutes