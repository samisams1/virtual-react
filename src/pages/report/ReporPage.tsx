import NavBar from '@/components/NavBar/NavBar'
import React from 'react'

const ReporPage = () => {
  return (
    <div>
    <NavBar />
    <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
      <section className="px-4 md:px-8">
        <h1 className="font-bold leading-8 font-inter text-color3 text-2xl">
          Dashboard
        </h1>
        <p className="font-normal text-base leading-6 font-inter mt-1 text-color4">
          Manage your team and preferences here.
        </p>
      </section>
      </div>
      </div>
  )
}

export default ReporPage