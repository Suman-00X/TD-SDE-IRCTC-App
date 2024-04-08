import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Users/Register';
import Login from './Users/Login';
import Profile from './Users/Profile';
import Availability from './Train/Availability';
import AllUsers from './Train/AllUsers';
import Header from './Common/Header'
import DeleteTrain from './Admin/DeleteTrain';
import UpdateTrain from './Admin/UpdateTrain';
import AddTrain from './Admin/AddTrain';
import BookingForm from './Train/BookingForm';


const App = () => {
  return (
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/add" element={<AddTrain />} />
        <Route path="/delete/:id" element={< DeleteTrain/>} />
        <Route path="/update/:id" element={<UpdateTrain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
