// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Challan from './Challan';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state for API call

  // Redirect user to login page
  const redirectToLogin = () => {
    navigate('/');
  };

  // Effect to fetch dashboard data
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:4000/api/auth', {
        headers: {
          Authorization: `Bearer ${token}`,  // Include Bearer prefix for token
        }
      })
      .then((response) => {
        setDashboardData(response.data);
        setLoading(false);  // Stop loading when data is received
      })
      .catch((err) => {
        setError('You are not authorized to access this page');
        setLoading(false);  // Stop loading on error
      });
    } else {
      setError('No token found. Please login first.');
      setLoading(false);  // Stop loading when no token is found
    }
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader color={'#3498db'} loading={true} size={50} />
      </div>
    );
  }

  // If there's an error, show login prompt
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700 mb-4">{error}</p>
        <button 
          onClick={redirectToLogin}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </div>
    );
  }

  // Render dashboard data when it's available
  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Challan and Activity Log */}
      <div className="container mx-auto py-6">
        <Challan activities={[
          { date: '2024-09-20', description: 'Speeding - 85 km/h in a 60 km/h zone' },
          { date: '2024-09-18', description: 'Smooth driving - No harsh acceleration or braking' },
          { date: '2024-09-15', description: 'Traffic Violation - Red light jump, challan issued' },
          { date: '2024-09-10', description: 'Safe driving - Maintained lane discipline' }
        ]} />
      </div>

      

      {/* Toaster for notification messages */}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
