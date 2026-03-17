import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the React Router demo powered by Vite.</p>
      <p>
        <Link to="/users">Go to Users</Link>
      </p>
    </div>
  );
};

export default Home;
