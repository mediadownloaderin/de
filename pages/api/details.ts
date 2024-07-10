import { NextApiRequest, NextApiResponse } from 'next';

interface User {
  photo: string;
  name: string;
  email: string;
  phone: string;
  // Add more fields as needed
}

export interface ErrorData {
  message: string;
  // Add more fields as needed
}

let cachedUserData: User | ErrorData | null = null; // Cached variable to store user data

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  console.log(req.method);

  if (req.method === 'POST') {
    const userData = req.body;

    if (userData.id) {
      // Assuming req.body contains the user data with an id field
      cachedUserData = userData;
      res.status(200).json({ message: 'User details stored successfully' });
    } else {
      // Assuming req.body contains error data if id field is not present
      const errorData: ErrorData = req.body;
      cachedUserData = errorData;
      res.status(200).json({ message: 'User details stored successfully' });
    }
  } else if (req.method === 'GET') {
    if (cachedUserData) {
      if ('name' in cachedUserData) {
        res.status(200).json(cachedUserData as User);
      } else {
        res.status(404).json({ message: 'User data not valid' });
      }
    } else {
      res.status(404).json({ message: 'User data not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export function handleResponse(message: string, res: NextApiResponse) {
  console.log(message);
  if (message.includes('User has already entered within the last 5 minutes. Not accessible now')) {
    cachedUserData = null; // Reset cached user data
    res.status(403).json({ message: '❌ User has already entered within the last 5 minutes. Not accessible now', notAccessible: true });
  } else {
    res.status(200).json({ message });
  }
}
