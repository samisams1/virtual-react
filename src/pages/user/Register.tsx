import React from 'react'
import PageHeader from '@/components/Header/PageHeader'
import NavBar from '@/components/NavBar/NavBar'
import UserIcon from '@/assets/user.svg'; // Adjust the path based on where you save the SVG
import Register from '@/components/Register/Register'
const RegisterPage = () => {
  return (
    <div>
    <NavBar />
    <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
      <section className="px-4 md:px-8">
      <PageHeader
          title="Users"
          icon={<img src={UserIcon} alt="Icon" className="h-6 w-6" />}
        />
        <Register />
      </section>
      </div>
      </div>
  )
}
export default RegisterPage