import React, { useState, useEffect } from 'react';
import './Header.css';
import Login from '../Login/Login.js';

export default function Header() {
  const [searchHighlight, setSearchHighlight] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const handleHighlightSearch = () => {
    setSearchHighlight(true)
  }

  const handleClickWindow = (e) => {
    if (e.target.id !== 'search') setSearchHighlight(false)
    if (showLogin && e.target.className !== 'login-modal-content' && e.target.id !== 'login-btn') setShowLogin(false)
  }

  const handleClickLogin = () => {
    setShowLogin(true)
  }

  const handleClickSignup = () => {
    console.log('signup')
  }

  const handleExitLogin = () => {
    setShowLogin(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleClickWindow)
  })

  return (
    <>
    {showLogin && <Login handleExitLogin={handleExitLogin}/>}
    <div className="top-wrapper">
      <span className="material-icons">whatshot</span>
      <div className="search-wrapper" style={searchHighlight ? {border: '#1DA1F2 1px solid'} : {}}>
        <span className="material-icons" id="search-icon" style={searchHighlight ? {color:'#1DA1F2'} : {}}>search</span>
        <input type="text" placeholder="Search Ticket" id="search" onClick={handleHighlightSearch}/>
      </div>
      <div className="button-wrapper">
        <div id="login-btn" onClick={handleClickLogin}><strong>Log In</strong></div>
        <div id="signup-btn" onClick={handleClickSignup}>Sign Up</div>
      </div>
    </div>
    </>
  )
}