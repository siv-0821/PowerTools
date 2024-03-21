import React from 'react'
import './Dashboard.css'

import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
function Dashboard() {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard