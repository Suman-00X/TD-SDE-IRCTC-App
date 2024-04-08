import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../Models/UserModel.js';


// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;
        console.log("1", req.body)

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        console.log("2", existingUser)
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("3", hashedPassword)
        // Create a new user 
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType
        });

        console.log("4")
        await newUser.save();
        console.log("5")

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password, key } = req.body;
        console.log("1", req.body)

        // Finding the user
        const user = await User.findOne({ email });
        console.log("2", user)

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.userType === 'Admin') {
            if (key !== process.env.API_KEY) {
                return res.status(401).json({ message: 'Invalid Admin' });
            }
        }

        // passwords validity
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("3", isPasswordValid)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //JWT token
        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1h' });

        console.log("4", token)

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        console.log("1111", req.user)
        const userId = req.user._id;
        console.log("1", userId)
        const user = await User.findById(userId);
        console.log("2", user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all users (for admin)
export const getAllUsers = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.userType !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }
        // Fetch all users
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
