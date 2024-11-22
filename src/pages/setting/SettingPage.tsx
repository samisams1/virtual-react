import NavBar from '@/components/NavBar/NavBar';
import React, { useState, ChangeEvent, FormEvent } from 'react';

const SettingPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [companyEmail, setCompanyEmail] = useState<string>('');
  const [companyPhone, setCompanyPhone] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setLogo(event.target.files[0]);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ username, password, companyName, companyEmail, companyPhone, logo });
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
          <h1 className="font-bold text-gray-800 text-3xl text-center mb-6">Settings</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Company Name</label>
              <input 
                type="text" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input 
                type="email" 
                value={companyEmail} 
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input 
                type="tel" 
                value={companyPhone} 
                onChange={(e) => setCompanyPhone(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Company Logo</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded mt-4 hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;