import React, { useState, useEffect }from 'react';
import './Login.css';

export default function Login({ handleExitLogin }) {
  const[emailHighlight, setEmailHighlight] = useState(false)
  const[passwordHighlight, setPasswordHighlight] = useState(false)

  const handleHighlight = (e) => {
    if (e.target.name === 'email') setEmailHighlight(true)
    if (e.target.name === 'password') setPasswordHighlight(true)
  }

  const handleUnhighlight = (e) => {
    if (e.target.name !== 'email') setEmailHighlight(false)
    if (e.target.name !== 'password') setPasswordHighlight(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleUnhighlight)
  }, [])

  return (
    <div className='login-modal'>
      <div className="login-modal-content">
        <div className="login-modal-header">
          <span className="material-icons" id="login-logo">whatshot</span>
          <span className="material-icons" id="login-exit" onClick={handleExitLogin}>cancel</span>
          <h2>Log in to Make A Diff</h2>
        </div>
        <div className="login-modal-body">
          <form>
            <input onClick={handleHighlight} style={emailHighlight ? {borderBottom: '#1DA1F2 1px solid'} : {borderBottom: '#757575 1px solid'}} type="email" name="email" placeholder="Email" autoComplete="off" required />
            <input onClick={handleHighlight} style={passwordHighlight ? {borderBottom: '#1DA1F2 1px solid'} : {borderBottom: '#757575 1px solid'}} type="password" name="password" placeholder="Password" autoComplete="off" required/>
            <button type="submit" id="login-submit"><strong>Log in</strong></button>
          </form>
        </div>
        <div className="modal-footer">
          <span>Forgot password?</span>
          <span>Sign up For Make A Diff</span>
        </div>
      </div>
    </div>
  )
}