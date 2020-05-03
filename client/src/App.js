import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header.js';
import Ticket from './components/Ticket/Ticket.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import Home from './components/Home/Home.js';

export default function App() {
  const [tickets, setTickets] = useState([])

  const [userID, setUserID] = useState(null)

  const [userAvatar, setUserAvatar] = useState(null)

  const [view, setView] = useState('home')

  const handleSetToken = (token) => {
    window.localStorage.setItem('jwt', `Token ${token}`)
  }

  const handleSetUser = ([id, avatar]) => {
    window.localStorage.setItem('userID', id)
    setUserID(id)
    setUserAvatar(avatar)
    updateTicket()
  }

  const getAuthStatus = () => {
    let id = window.localStorage.getItem('userID')
    let avatar = window.localStorage.getItem('userAvatar')
    if (id) setUserID(parseInt(id))
    if (avatar) setUserAvatar(avatar)
  }

  const updateTicket = () => {
    axios.get('http://localhost:8000/api/v1/tickets/')
    .then(res => {
      setTickets(res.data.reverse())  
    })
  }

  const handleSetView = (selected) => {
    setView(selected)
  }

  useEffect(() => {
    getAuthStatus()
    updateTicket()
  }, [userID])

  return (
    <div className="App">
      <div className="header">
        <Header handleSetToken={handleSetToken} handleSetUser={handleSetUser}  />
      </div>
      <div className="body">
        <div className="left-body">
          {userID && <Sidebar handleSetView={handleSetView} view={view} />}
        </div>
          <div className="board">
            {userID && view === 'home' && <Home userAvatar={userAvatar} handleAddTicket={updateTicket} tickets={tickets.filter(ticket => ticket.author.id === userID)} userID={userID} updateTicket={updateTicket} />}
            {(!userID || view === 'explore') && 
              <>
                {tickets.map((ticket, index) => (<Ticket key={index} ticket={ticket} userID={userID} />))}
              </>
            }
          </div>
      </div>
    </div>
  );
}

