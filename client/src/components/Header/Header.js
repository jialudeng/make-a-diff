import React, { useState, useEffect } from 'react';
import './Header.css';
import Login from '../Login/Login.js';

export default function Header({ handleSetToken, handleSetUser }) {
  const [searchHighlight, setSearchHighlight] = useState(false)

  const [showLogin, setShowLogin] = useState(false)
  
  const [signedIn, setSignedIn] = useState(false)

  const handleHighlightSearch = () => {
    setSearchHighlight(true)
  }

  const handleClickWindow = (e) => {
    if (e.target.id !== 'search') setSearchHighlight(false)
    if (e.target.className === 'login-modal') setShowLogin(false)
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

  const handleSignedIn = () => {
    setSignedIn(true)
  }

  useEffect(() => {
    if (window.localStorage.getItem('jwt')) handleSignedIn()
    window.addEventListener('click', handleClickWindow)

  }, [searchHighlight, showLogin])

  return (
    <>
    {showLogin && !signedIn && <Login handleExitLogin={handleExitLogin} handleSetToken={handleSetToken} handleSignedIn={handleSignedIn} handleSetUser={handleSetUser} />}
    <div className="top-wrapper">
      <div className="empty-header-space"></div>
      <div className="logo-search">
        <span className="material-icons" id="header-logo">whatshot</span>
        <div className="search-wrapper" style={searchHighlight ? {border: '#1DA1F2 1px solid'} : {}}>
          <span className="material-icons" id="search-icon" style={searchHighlight ? {color:'#1DA1F2'} : {}}>search</span>
          <input type="text" placeholder="Search Ticket" id="search" onClick={handleHighlightSearch}/>
        </div>
      </div>
      {signedIn 
        ?
        <div className="empty-header-space"></div>
        :
        <div className="button-wrapper">
          <div id="login-btn" onClick={handleClickLogin}><strong>Log In</strong></div>
          <div id="signup-btn" onClick={handleClickSignup}>Sign Up</div>
        </div>
      }

    </div>
    </>
  )
}