import React, { useState, useEffect } from 'react';
import './Header.css';
import Login from '../Login/Login.js';

export default function Header({ handleSetToken, handleSetUser }) {
  const [searchHighlight, setSearchHighlight] = useState(false)

  const [showLogin, setShowLogin] = useState(false)
  
  const [signedIn, setSignedIn] = useState(false)

  const [search, setSearch] = useState('')

  const handleHighlightSearch = () => {
    setSearchHighlight(true)
  }

  const handleSearchInput = (e) => {
    setSearch(e.target.value)
  }

  const handleClickWindow = (e) => {
    if (e.target.id !== 'search') setSearchHighlight(false)
    if (e.target.className === 'login-modal') setShowLogin(false)
  }

  const handleClickLogin = () => {
    setShowLogin(true)
  }

  const handleClickSignup = () => {
    alert('Sign Up function is under construction. Please stay tuned and check back soon!')
  }

  const handleExitLogin = () => {
    setShowLogin(false)
  }

  const handleSignedIn = () => {
    setSignedIn(true)
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      alert('Sign Up function is under construction. Please stay tuned and check back soon!')
      setSearch('')
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('jwt')) handleSignedIn()
    document.addEventListener('click', handleClickWindow)
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
          <input type="text" placeholder="Search Ticket" id="search" onClick={handleHighlightSearch} onChange={handleSearchInput} onKeyDown={handleSearch} value={search} />
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