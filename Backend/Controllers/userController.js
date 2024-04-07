import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../Models/UserModel.js';


// Register a new user
export const registerUser = async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user 
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Finding the user
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      // passwords validity
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      //JWT token
      const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1h' });
      
      res.status(200).json({ token });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Update User's profile
export const updateProfile = async (req, res) => {
  try {
      const userId = req.user._id;
      const { name, email } = req.body;

      // Find the user
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update user's name and email
      user.name = name || user.name;
      user.email = email || user.email;

      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all users (for admin)
export const getAllUsers = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        // Fetch all users
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
