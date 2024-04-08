import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import './Models/connection.js'
import userRoutes from './Routes/userRoutes.js';
import trainRoutes from './Routes/trainRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

// Routes
app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
