// trainRoutes.js
import express from 'express';
import { addTrain, deleteTrain, updateTrain, getAllTrains, getTrainAvailability, bookSeat } from '../Controllers/trainController.js';
import { authenticateUser, authenticateAdmin } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/trains', getAllTrains);
router.post('/availability', getTrainAvailability);

// Protected routes (Protecteed by JWT)
router.post('/book', authenticateUser, bookSeat);

// Admin routes (Protected by API key)
router.post('/admin/train/add', authenticateAdmin, addTrain);
router.delete('/admin/train/delete/:trainId', authenticateAdmin, deleteTrain);
router.put('/admin/train/update/:trainId', authenticateAdmin, updateTrain);

export default router;
