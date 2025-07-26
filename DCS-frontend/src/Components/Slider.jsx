import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DCSGauge = () => {
  const [dcsValue, setDCSValue] = useState(0); // Initialize with a default value
  const [loading, setLoading] = useState(true); // Loading state to handle API call
  const [error, setError] = useState(null); // Error state to handle errors

  // Fetch DCS value from the backend
  useEffect(() => {
    const fetchDCSValue = async () => {
      try {
        const uid=localStorage.getItem('userid')
        const response = await fetch('http://localhost:4000/api/dcs-value',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid
          }),
        }); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch DCS value');
        }
        const data = await response.json();
        setDCSValue(data?.dcsValue); // Assuming the response is in the form { dcsValue: 500 }
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setDCSValue(400);
        // toast.error('Error fetching DCS value');
        setLoading(false);
      }
    };

    fetchDCSValue();
  }, []);

  const getDCSGrade = (dcsValue) => {
    if (dcsValue >= 700) return "Excellent";
    if (dcsValue >= 500) return "Good";
    if (dcsValue >= 300) return "Average";
    if (dcsValue >= 100) return "Poor";
    return "Danger Zone"; // Less than 60
  };
  const grade = getDCSGrade(dcsValue);

  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Driver's Credit Score</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <ToastContainer />
      ) : (
        <></>
      )}
        <>
          <GaugeChart
            id="dcs-gauge"
            nrOfLevels={30}
            colors={["#FF5F6D", "#FFC371", "#00C49F"]}
            arcWidth={0.3}
            needleColor="#000000"
            textColor="#000000"
            animate={true}
            formatTextValue={(value) => `${(dcsValue )}`}
          />
          <div className="mt-4 text-center">
            <span className="text-lg font-semibold">{`Score Grade: ${grade}`}</span>
          </div>
        </>
    </div>
  );
};

export default DCSGauge;
