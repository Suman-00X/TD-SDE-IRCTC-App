import Train from '../Models/TrainModel.js'

// Get all trains
export const getAllTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//get one train
export const getOneTrain = async (req, res) => {
    const { id } = req.params;
    try {
      const OneTrain = await Train.findById(id);
      if (!OneTrain) {
        return res.status(404).json({ error: 'Train not found' });
      }
      res.json(OneTrain);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Add a new train
export const addTrain = async (req, res) => {
    try {
        const { 
          trainNumber, 
          trainName, 
          source, 
          destination, 
          totalSeats } = req.body;

          console.log(res.body)

        // Consistency Check
        const existingTrain = await Train.findOne({ trainNumber });
        if (existingTrain) {
            return res.status(400).json({ message: 'Train with the same number already exists' });
        }

        const newTrain = new Train({ 
          trainNumber, 
          trainName, 
          source, 
          destination, 
          totalSeats });

      // Creating a new train
        await newTrain.save();
        res.status(201).json({ message: 'Train added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a train
export const deleteTrain = async (req, res) => {
    try {
        const { trainId } = req.params;
        await Train.findByIdAndDelete(trainId);
        res.status(200).json({ message: 'Train deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a train
export const updateTrain = async (req, res) => {
    try {
        const { id } = req.params;
        const {trainName, trainNumber, source, destination, totalSeats} = req.body;
        await Train.findByIdAndUpdate(id,
            {trainName, trainNumber, source, destination, totalSeats}
            ),
            { new: true };
        res.status(200).json({ message: 'Train updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get train availability
export const getTrainAvailability = async (req, res) => {
    try {
        const { source, destination } = req.body;
        const trains = await Train.find({ source, destination });
        const availability = trains.map(train => ({
            trainNumber: train.trainNumber,
            availableSeats: train.totalSeats - train.bookedSeats
        }));
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Book a seat
export const bookSeat = async (req, res) => {

    console.log("Booking Started")
    const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      const { seatCount } = req.body;
      const train = await Train.findById(id).session(session);

      if (!train) {
          await session.abortTransaction();
          session.endSession();
          return res.status(404).json({ message: 'Train not found' });
      }

      if (seatCount === 0) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({ message: 'No seats requested' });
      }

      if (seatCount > (train.totalSeats - train.bookedSeats)) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({ message: 'Not enough seats available' });
      }

      train.bookedSeats += seatCount;
      await train.save({ session });
      
      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: 'Seat(s) booked successfully' });
  } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
