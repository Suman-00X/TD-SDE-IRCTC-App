// trainRoutes.js
import express from 'express';
import { addTrain, deleteTrain, updateTrain, getAllTrains, getTrainAvailability, bookSeat, getOneTrain } from '../Controllers/trainController.js';
import { authenticateUser } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/trains', getAllTrains);
router.post('/availability', getTrainAvailability);

// Protected routes (Protecteed by JWT)
router.post('/book/:id', authenticateUser, bookSeat);
router.post('/admin/train/add', authenticateUser, addTrain);
router.delete('/admin/train/delete/:id', authenticateUser, deleteTrain);
router.get('/admin/train/getOne/:id', authenticateUser, getOneTrain);
router.put('/admin/train/update/:id', authenticateUser, updateTrain);

export default router;
