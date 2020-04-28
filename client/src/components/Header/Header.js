import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [clicked, setClicked] = useState(false)

  const handleClickInput = () => {
    setClicked(true)
  }

  const handleClickOut = (e) => {
    if (e.target.id !== 'search') setClicked(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOut)
  }, [])

  return (
    <div className="header-container">
      <div className="search-wrapper" style={clicked ? {border: '#1DA1F2 1px solid'} : {}}>
        <span className="material-icons" id="search-icon" style={clicked ? {color:'#1DA1F2'} : {}}>search</span>
        <input type="text" placeholder="Search Ticket" id="search" onClick={handleClickInput}/>
      </div>
      <button>Log In</button>
      <button>Sign Up</button>
    </div>
  )
}