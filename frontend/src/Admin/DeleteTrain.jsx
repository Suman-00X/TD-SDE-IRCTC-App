import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteTrain = () => {

  const params = useParams();

  const [formData, setFormData] = useState({
    id: `${params.id}`,
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    totalSeats: ''
  });

  useEffect(() => {
    const fetchTrain= async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trains/admin/train/getOne/${params.id}`,{
          headers: {
            Authorization: `${localStorage.getItem('token')}` 
          }
        });

        console.log(response.data)
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };
    fetchTrain();
  }, [params.id]);

  const onDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/trains/admin/train/delete/${params.id}`,
      {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
        }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div> 
      <p>{formData.trainNumber}</p>
      <p>{formData.trainName}</p>
      <p>{formData.source} to {formData.destination}</p>
      <p>Available Seats : {formData.totalSeats}</p>
    <button onClick={onDelete}>Delete Train</button>
    </div>
  );
};

export default DeleteTrain;
