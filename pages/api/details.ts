// File path: /pages/api/details.ts

import { NextApiRequest, NextApiResponse } from 'next';

interface User {
  photo: string;
  name: string;
  email: string;
  phone: string;
  // Add more fields as needed
}

let cachedUserData: User | null = null; // Cached variable to store user data

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle POST request to update cached user data
    const userData: User = req.body; // Assuming req.body contains the user data
    cachedUserData = userData;
    res.status(200).json({ message: 'User details stored successfully' });
  } else if (req.method === 'GET') {
    // Handle GET request to retrieve cached user data
    if (cachedUserData) {
      res.status(200).json(cachedUserData);
    } else {
      res.status(404).json({ message: 'User data not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
