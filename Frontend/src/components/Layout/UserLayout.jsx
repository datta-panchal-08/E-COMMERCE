import React from 'react'
import Header from '../Common/Header.jsx'
import Footer from '../Common/Footer.jsx'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
        {/* Header Section  */}
        <Header/>
        {/* Main Content */}
        <main>
          <Outlet/>
        </main>
        {/* Footer Section */}
        <Footer/>
    </div>
  )
}

export default UserLayout