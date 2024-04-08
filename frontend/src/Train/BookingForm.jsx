import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const params = useParams();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    seatCount: '' // Define seatCount in formData state
  });

  const [trainDetails, setTrainDetails] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: ''
  })

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trains/admin/train/getOne/${params.id}`,
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`
            }
          });
        console.log(response.data)
        setTrainDetails(response.data);
      } catch (error) {
        console.error('Error fetching train:', error);
      }
    };
    fetchTrain();
  }, [params.id]);

  const { name, age, seatCount } = formData; // Destructure seatCount from formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/trains/book/${params.id}`, formData, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      });

      console.log('Booking successful:');

      setFormData({
        name: '',
        age: '',
        seatCount: '' // Reset seatCount after booking
      });
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const { trainNumber, trainName, source, destination } = trainDetails;
  const filename = `booking_receipt_${trainNumber}_${new Date().toISOString()}.txt`;
  // Generate the content of the receipt
  const receiptContent = `
      Train Number: ${trainNumber}
      Train Name: ${trainName}
      Source: ${source}
      Destination: ${destination}
      Passenger Name: ${name}
      Passenger Age: ${age}
      Booking Date: ${new Date().toLocaleDateString()}
    `;

  // Function to handle receipt download
  const downloadReceipt = () => {
    const element = document.createElement('a');
    const file = new Blob([receiptContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for Firefox
    element.click();
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <p>Train Number: {trainDetails.trainNumber}</p>
      <p>Train Name: {trainDetails.trainName}</p>
      <p>Source: {trainDetails.source}</p>
      <p>Destination: {trainDetails.destination}</p>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
        <input type="number" placeholder="Age" name="age" value={age} onChange={onChange} required />
        <input type="number" placeholder="Seat Count" name="seatCount" value={seatCount} onChange={onChange} required /> {/* Update input field for seatCount */}
        <button type="submit">Book Now</button>
        <button onClick={downloadReceipt}>Download Receipt</button>
      </form>
    </div>
  );
};

export default BookingForm;
