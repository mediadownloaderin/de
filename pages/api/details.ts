// File path: /pages/api/details.ts

let cachedUserData = null; // Cached variable to store user data

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST request to update cached user data
    cachedUserData = req.body; // Assuming req.body contains the user data
    res.status(200).json({ message: 'User details stored successfully' });
  } else if (req.method === 'GET') {
    // Handle GET request to retrieve cached user data
    if (cachedUserData) {
      res.status(200).json(cachedUserData);
    } else {
      res.status(404).json({ message: 'User data not found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
