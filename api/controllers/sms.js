import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import thaibulksmsApi from 'thaibulksms-api';

dotenv.config();

const options = {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
};

const sms = thaibulksmsApi.sms(options);

// Define the SMS sending function
export const sendSmsHandler = [
    body('phone_number').isMobilePhone('th-TH'),
    body('message').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let phoneNumber = req.body.phone_number;
            let message = req.body.message;
            let body = {
                msisdn: phoneNumber,
                message: message,
            };
            const response = await sms.sendSMS(body);
            res.json(response);
        } catch (error) {
            return res.status(500).json({ errors: error });
        }
    }
];
