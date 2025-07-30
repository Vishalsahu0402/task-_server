import User from '../models/User.js';
import { generateVerificationToken } from '../utils/generateverification.js';
import { sendVerificationEmail } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


export const createUser = async (request, response, next) => {
    try {
        const { username, email, password, role, gender } = request.body;

        const verificationToken = generateVerificationToken();
        const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry

        const user = await User.create({
            username,
            email,
            password,
            role,
            gender,
            isVerified: false,
            verificationToken,
            verificationTokenExpires,
        });

        if (role == "admin") {
            await sendVerificationEmail("VishalSahu1230@gmail.com", verificationToken);
        }
        else {
            await sendVerificationEmail(email, verificationToken);
        }

        response.status(201).json({ message: "User registered. Check your email to verify your account.", user });
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
};


export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔍 Find user by email and include password
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check email verification
        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email before logging in.' });
        }

        // Role-based secret
        const secret = user.role === 'admin' ? 'tercesnimda' : 'tercesresu';

        // Create JWT
        const token = jwt.sign({ id: user._id, role: user.role }, secret, {
            expiresIn: '6h',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role,
        });
    } catch (err) {
        console.error('=======error', err);
        res.status(500).json({ error: err.message });
    }
};


export const verifyUser = async (request, response, next) => {
    try {
        const { token } = request.query;

        // ✅ Mongoose version (no `where`)
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return response.status(400).json({ message: "Invalid or expired verification token." });
        }

        if (user.verificationTokenExpires < Date.now()) {
            return response.status(400).json({ message: "Verification token has expired." });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;

        await user.save();

        response.status(200).json({ message: "Account verified successfully!" });
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
};