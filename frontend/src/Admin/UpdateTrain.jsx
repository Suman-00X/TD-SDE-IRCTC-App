import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTrain = () => {

  const params = useParams();

  const [formData, setFormData] = useState({
    id: `${params.id}`,
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    totalSeats: ''
  });

  const { trainNumber, trainName, source, destination, totalSeats } = formData;

  useEffect(() => {
    const fetchTrain= async () => {
      try {
        const response = await axios.get(`ttp://localhost:5000/api/trains/admin/train/update/${params.id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}` 
          }
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };
    fetchTrain();
  }, [params.id]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/trains/admin/train/update/${params.id}`, formData, 
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}` 
        }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Update Form</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Train Number" name="trainNumber" value={formData.trainNumber} onChange={onChange} required />
        <input type="text" placeholder="Train Name" name="trainName" value={formData.trainName} onChange={onChange} required />
        <input type="text" placeholder="Source" name="source" value={formData.source} onChange={onChange} required />
        <input type="text" placeholder="Destination" name="destination" value={formData.destination} onChange={onChange} required />
        <input type="number" placeholder="Total Seats" name="totalSeats" value={formData.totalSeats} onChange={onChange} required />
        <button type="submit">Update Train</button>
      </form>
    </div>
  );
};

export default UpdateTrain;
