import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import Book from './Train/BookingForm'; 
import DeleteTrain from './Admin/DeleteTrain'; 
import UpdateTrain from './Admin/UpdateTrain';

const Home = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/trains/trains');
        setTrains(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchTrains();
  }, []);

  const handleDelete = async (id) => {
    console.log("Delete had been called")
    try {
      console.log("List before deletion", trains)
      await axios.delete(`http://localhost:5000/api/trains/admin/train/delete/${id}`);
      const updatedTrains = trains.filter((train) => train._id !== id);
      setTrains(updatedTrains);
      console.log("List after deletion", trains)
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div>
      <h2>Train Schedule</h2>
      <ul>
        {trains.map(train => (
          <li key={train._id}>
            <p>Train Number: {train.trainNumber}</p>
            <p>Train Name: {train.trainName}</p>
            <p>Source: {train.source}</p>
            <p>Destination: {train.destination}</p>
            <p>Total Seats: {train.totalSeats}</p>
            <button className="modify">
                    <Link to={`/book/${train._id}`}>Book</Link>
                  </button>
                  <button className="delete" onClick={() => handleDelete(train._id)}>Delete</button>
                  <button className="modify">
                    <Link to={`/update/${train._id}`}>Update</Link>
                  </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
