// index.js
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './Routes/userRoutes.js';
import trainRoutes from './Routes/trainRoutes.js';
import { authenticateUser, authenticateAdmin } from './Middleware/authMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/trains', authenticateUser, trainRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
