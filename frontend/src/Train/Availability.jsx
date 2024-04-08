import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm'; 

const Availability = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);

  const fetchAvailability = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/trains/availability', { source, destination });
      setTrains(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    if (source && destination) {
      fetchAvailability();
    }
  }, [source, destination]);

  const handleBookSeat = (trainNumber) => {
    const selected = trains.find(train => train.trainNumber === trainNumber);
    setSelectedTrain(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (source && destination) {
      fetchAvailability();
    } else {
      console.error('Please enter both source and destination');
    }
  };

  return (
    <div>
      <h2>Find Trains</h2>
      <form onSubmit={handleSubmit}>
        <label>Source:</label>
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} required />
        <label>Destination:</label>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        <button type="submit">Search Trains</button>
      </form>
      <h2>Train Availability</h2>
      <ul>
        {trains.map(train => (
          <li key={train.trainNumber}>
            <p>Train Number: {train.trainNumber}</p>
            <p>Train Name: {train.trainName}</p>
            <p>Source: {train.source}</p>
            <p>Destination: {train.destination}</p>
            <p>Total Seats: {train.totalSeats}</p>
            <p>Available Seats: {train.availableSeats}</p>
            <button onClick={() => handleBookSeat(train.trainNumber)}>Book Seat</button>
          </li>
        ))}
      </ul>
      {selectedTrain && <BookingForm trainDetails={selectedTrain} />}
    </div>
  );
};

export default Availability;
