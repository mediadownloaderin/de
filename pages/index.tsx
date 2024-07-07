// Example usage in a page component
import UserDetails from '../components/UserDetails';

const HomePage = () => {
  // Assuming userId and deviceId are obtained from NFC scanning or other source
  const userId = '123'; // Replace with actual user ID
  const deviceId = '1'; // Replace with actual device ID

  return (
    <div className="container mx-auto my-8">
      <UserDetails />
    </div>
  );
};

export default HomePage;
