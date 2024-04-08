// train.model.js
import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true
  },
  trainName: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  bookedSeats: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Train = mongoose.model('Train', trainSchema);

export default Train;
