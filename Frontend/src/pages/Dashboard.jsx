import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar />

      <div className="flex-1 md:ml-[250px] overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard