import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS
import DCSGauge from './Slider';
import Instructions from './Scoring';

const Challan = ({ activities }) => {
  const navigate = useNavigate();
  const [challanData, setChallanData] = useState([]); // State to store fetched data

  // Function to fetch challan data from the backend
  const fetchChallanData = async () => {
    try {
      const uid = localStorage.getItem('userid');
      const response = await fetch('http://localhost:4000/api/dashboard/challan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid }),
      });
      const result = await response.json();
      if (result.ok) {
        const data = result.data.map(item => ({
          name: item.name,
          lastDrive: item['Last Drive'],
          challan: item.Challan,
          amount: item.Amount,
          dcsChange: item.DCS_Charge
        }));
        setChallanData(data);
        toast.success('Data fetched successfully!', { position: "top-center" });
      } else {
        toast.error(`Failed to fetch data: ${result.message}`, { position: "top-center" });
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`, { position: "top-center" });
    }
  };

  // Fetch challan data when the component mounts
  useEffect(() => {
    fetchChallanData();
  }, []);

  // Function to handle the 'Pay Dues' button click
  const handlePayDuesClick = () => {
    navigate('/pay-dues');
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4 p-6 mt-20">
      <ToastContainer />

      <div className="lg:w-2/3 space-y-6">
        {/* Challan History Section */}
        <div className="bg-white rounded-md shadow-md p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Challan History</h1>
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-800 text-white text-left">Name</th>
                <th className="py-3 px-6 bg-gray-800 text-white text-left">Last Drive</th>
                <th className="py-3 px-6 bg-gray-800 text-white text-left">Challan</th>
                <th className="py-3 px-6 bg-gray-800 text-white text-left">Amount</th>
                <th className="py-3 px-6 bg-gray-800 text-white text-left">DCS Change</th>
              </tr>
            </thead>
            <tbody>
              {challanData.map((entry, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-6">{entry.name}</td>
                  <td className="py-3 px-6">{entry.lastDrive}</td>
                  <td className={`py-3 px-6 ${entry.challan ? 'text-red-500' : 'text-green-500'}`}>{entry.challan}</td>
                  <td className="py-3 px-6">{entry.amount > 0 ? `₹${entry.amount}` : '-'}</td>
                  <td className="py-3 px-6">{entry.dcsChange}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col items-center">
            <button onClick={handlePayDuesClick} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
              Pay Dues
            </button>
          </div>
        </div>

        {/* Recent Driving Activity Section */}
        <div className="bg-white rounded-md shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 pb-2 text-gray-800 text-center">Recent Driving Activity</h2>
          {activities.length === 0 ? (
            <p className="text-gray-500">No recent activities to display.</p>
          ) : (
            <ul>
              {activities.map((activity, index) => (
                <li key={index} className="mb-2">
                  <strong>{activity.date}</strong> - {activity.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Column for DCS Gauge and Instructions */}
      <div className="lg:w-1/3 space-y-6">
        <DCSGauge />
        <Instructions />
      </div>
    </div>
  );
};

export default Challan;
