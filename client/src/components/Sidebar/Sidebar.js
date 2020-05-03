import React from 'react';
import './Sidebar.css'

export default function Sidebar({ handleSetView, view }) {

  const handleSetSelected = (e) => {
    handleSetView(e.target.id || e.target.parentElement.id)
  }

  return (
    <div className="sidebar-wrapper">
      <div className="directory-container" onClick={handleSetSelected} id="home" style={view === 'home' ? {color: '#4D9FEC'} : {}}>
        <span className="material-icons sidebar-icon">home</span>
        <span className="directory">Home</span>
      </div>
      <div className="directory-container" onClick={handleSetSelected} id="explore" style={view === 'explore' ? {color: '#4D9FEC'} : {}}>
        <span className="material-icons sidebar-icon" >label</span>
        <span className="directory">Explore</span>
      </div>
      <div className="directory-container"  onClick={handleSetSelected} id="notifications" style={view === 'notifications' ? {color: '#4D9FEC'} : {}}>
        <span className="material-icons sidebar-icon">notifications_none</span>
        <span className="directory">Notifications</span>
      </div>
      <div className="directory-container" onClick={handleSetSelected} id="messages" style={view === 'messages' ? {color: '#4D9FEC'} : {}}>
        <span className="material-icons sidebar-icon">email</span>
        <span className="directory">Messages</span>
      </div>
      <div className="directory-container" onClick={handleSetSelected} id="profile" style={view === 'profile' ? {color: '#4D9FEC'} : {}}>
        <span className="material-icons sidebar-icon">account_box</span>
        <span className="directory">Profile</span>
      </div>
    </div>
  )
}