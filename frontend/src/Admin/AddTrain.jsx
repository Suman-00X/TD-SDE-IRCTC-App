import React, { useState } from 'react';
import axios from 'axios';

const AddTrain = () => {
  const [formData, setFormData] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    totalSeats: ''
  });

  const { trainNumber, trainName, source, destination, totalSeats } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    console.log("add train data", formData)
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      };
      const res = await axios.post('http://localhost:5000/api/trains/admin/train/add', formData, config);
      console.log(res.data);
      
      setFormData({
        trainNumber: '',
        trainName: '',
        source: '',
        destination: '',
        totalSeats: ''
      })
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Train Number" name="trainNumber" value={trainNumber} onChange={onChange} required />
      <input type="text" placeholder="Train Name" name="trainName" value={trainName} onChange={onChange} required />
      <input type="text" placeholder="Source" name="source" value={source} onChange={onChange} required />
      <input type="text" placeholder="Destination" name="destination" value={destination} onChange={onChange} required />
      <input type="number" placeholder="Total Seats" name="totalSeats" value={totalSeats} onChange={onChange} required />
      <button type="submit">Add Train</button>
    </form>
  );
};

export default AddTrain;
