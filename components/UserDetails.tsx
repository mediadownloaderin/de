// // File path: /components/UserDetails.tsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ErrorData } from '@/pages/api/details';

// interface User {
//   photo: string;
//   name: string;
//   email: string;
//   phone: string;
//   // Add more fields as needed
// }

// const UserDetails: React.FC = () => {
//   const [userData, setUserData] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [notAccessible, setNotAccessible] = useState(false);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get<User| ErrorData>('/api/details');
//       setUserData(response.data);
//       setError(null);
//       setNotAccessible(false);
//     } catch (error: any) {
//       if (error.response && error.response.status === 403 && error.response.data.notAccessible) {
//         setError('User has already entered within the last 5 minutes. Not accessible now');
//         setNotAccessible(true);
//       } else {
//         setError('Failed to fetch user data');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(() => {
//       fetchData();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <div className="text-center mt-8">Loading...</div>;
//   if (error) {
//     if (notAccessible) {
//       return (
//         <div className="text-center mt-8 text-red-500">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 10-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd" />
//           </svg>
//           <div>{error}</div>
//         </div>
//       );
//     } else {
//       return <div className="text-center mt-8">Error: {error}</div>;
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
//       <div className="p-4">
//         <div className="flex items-center">
//           <img src={userData?.photo} alt="User Photo" className="h-16 w-16 rounded-full mr-4" />
//           <div>
//             <h2 className="text-lg font-semibold">{userData?.name}</h2>
//             <p className="text-gray-600">{userData?.email}</p>
//           </div>
//         </div>
//         <div className="mt-4">
//           <p className="text-gray-700"><strong>Phone:</strong> {userData?.phone}</p>
//           {/* Add more fields as needed */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;
// File path: /components/UserDetails.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ErrorData } from '@/pages/api/details';

interface User {
  photo: string;
  name: string;
  email: string;
  phone: string;
  // Add more fields as needed
}

const UserDetails: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notAccessible, setNotAccessible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get<User | ErrorData>('/api/details');
      setUserData(response.data as User);
      setError(null);
      setNotAccessible(false);
    } catch (error: any) {
      if (error.response) {
        const { message, notAccessible } = error.response.data;
        if (message === 'User has already entered within the last 5 minutes. Not accessible now') {
          setError(message);
          setNotAccessible(true);
        } else if (message === 'User data not valid') {
          setError(message);
          setNotAccessible(true);
        } else {
          setError('Failed to fetch user data');
        }
      } else {
        setError('Failed to fetch user data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) {
    if (notAccessible) {
      return (
        <div className="text-center mt-8 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 10-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd" />
          </svg>
          <div>{error}</div>
        </div>
      );
    } else {
      return <div className="text-center mt-8">Error: {error}</div>;
    }
  }

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
