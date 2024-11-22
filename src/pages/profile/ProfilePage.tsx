import PageHeader from '@/components/Header/PageHeader';
import NavBar from '@/components/NavBar/NavBar';
import DisplayProfile from '@/components/Profile/DisplayProfile';
import React from 'react';

interface User {
  name: string;
  email: string;
  profileImage: string;
  isAdmin: boolean;
  adminAddress?: string;
}

const ProfilePage: React.FC = () => {
  const user: User = {
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "https://via.placeholder.com/150", // Placeholder image
    isAdmin: true,
    adminAddress: "123 Admin St, Admin City, Admin Country",
  };

  return (
    <div>
      <NavBar />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-screen md:ml-[17.5rem] py-8 flex items-center justify-center">
        <section className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          <div className="flex flex-col items-center">
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
            />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.isAdmin && (
              <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">Admin Address</h2>
                <p className="text-gray-600">{user.adminAddress}</p>
              </div>
            )}
          </div>
          <DisplayProfile/>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;