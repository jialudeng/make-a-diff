import React, { useState, useEffect } from 'react';
import './Sidebar.css'

export default function Sidebar() {
  const [home, setHome] = useState(false)

  const handleHome = () => {
    setHome(true)
  }

  return (
    <div className="sidebar-wrapper">
      <div className="directory-container" onClick={handleHome} id="home" style={home ? {color: '#4D9FEC'} : {}}>
        <span className="material-icons sidebar-icon">home</span>
        <span className="directory">Home</span>
      </div>
      <div className="directory-container" id="explore">
        <span className="material-icons sidebar-icon" >label</span>
        <span className="directory">Explore</span>
      </div>
      <div className="directory-container" id="notifications">
        <span className="material-icons sidebar-icon">notifications_none</span>
        <span className="directory">Notifications</span>
      </div>
      <div className="directory-container" id="messages">
        <span className="material-icons sidebar-icon">email</span>
        <span className="directory">Messages</span>
      </div>
      <div className="directory-container" id="profile">
        <span className="material-icons sidebar-icon">account_box</span>
        <span className="directory">Profile</span>
      </div>
    </div>
  )
}