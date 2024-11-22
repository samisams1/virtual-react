import { useCurrentUser } from '@/services/user/useCurrentUser';
import React from 'react';

const DisplayProfile: React.FC = () => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <h1>Profile</h1>
      {/* Display user information */}
      <p>Name: {currentUser.name}</p>
      <p>Email: {currentUser.email}</p>
      {/* Add other user information as needed */}
    </div>
  );
};

export default DisplayProfile;