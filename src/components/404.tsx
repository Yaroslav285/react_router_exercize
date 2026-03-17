import React from 'react';
import { Link } from 'react-router-dom';

const Lost: React.FC = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for does not exist. Return to{' '}
        <Link to="/">Home</Link>.
      </p>
    </div>
  );
};

export default Lost;
