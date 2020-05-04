import React, { useState } from 'react';
import axios from '../../utils/API';
import './Login.css';

export default function Login({ handleExitLogin, handleSetToken, handleSignedIn, handleSetUser }) {
  const [username, setUsername] = useState('')
  
  const [password, setPassword] = useState('')
  
  const handleInputChange = (e) => {
    if (e.target.name === 'username') setUsername(e.target.value)
    if (e.target.name === 'password') setPassword(e.target.value)
  }
  
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    if (username.length && password.length) {
      axios.post('api/v1/auth/token/', {username, password})
        .then(res => {
          handleSetToken(res.data.token)
        })
        .then(() => {
          axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('jwt');
          axios.get('api/v1/user/')
            .then((res)=> handleSetUser(res.data))
            .catch(err => console.log(err))
        })
        .then(() => handleSignedIn())
        .catch(err => console.log(err))
    }
  }

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
            <input onChange={handleInputChange} type="text" name="username" placeholder="Username" autoComplete="off" required />
            <input onChange={handleInputChange} type="password" name="password" placeholder="Password" autoComplete="off" required/>
            <button onClick={handleSubmitLogin} id="login-submit"><strong>Log in</strong></button>
          </form>
        </div>
      </div>
    </div>
  )
}