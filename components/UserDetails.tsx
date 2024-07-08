import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Assuming your API endpoint for details is /api/details
      const response = await axios.get('/api/details');
      setUserData(response.data);
      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data when component mounts
    fetchData();

    // Set interval to fetch data every 5 seconds (adjust as needed)
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Fetch data every 5 seconds (5000 milliseconds)

    // Cleanup function to clear interval when component unmounts or dependencies change
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures it runs only on mount and unmount

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8">Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <img src={userData?.photo} alt="User Photo" className="h-16 w-16 rounded-full mr-4" />
          <div>
            <h2 className="text-lg font-semibold">{userData?.name}</h2>
            <p className="text-gray-600">{userData?.email}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-700"><strong>Phone:</strong> {userData?.phone}</p>
          {/* Add more fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
