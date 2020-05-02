import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header.js';
import Ticket from './components/Ticket/Ticket.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import TicketForm from './components/TicketForm/TicketForm';

export default function App() {
  const [tickets, setTickets] = useState([])

  const [userID, setUserID] = useState(null)

  const [userAvatar, setUserAvatar] = useState(null)

  const handleSetToken = (token) => {
    window.localStorage.setItem('jwt', `Token ${token}`)
  }

  const handleSetUser = ([id, avatar]) => {
    window.localStorage.setItem('userID', id)
    setUserID(id)
    console.log(id)
    setUserAvatar(avatar)
    updateTicket()
  }

  const getAuthStatus = () => {
    let id = window.localStorage.getItem('userID')
    if (id) setUserID(id)
  }

  const updateTicket = () => {
    axios.get('http://localhost:8000/api/v1/tickets/')
    .then(res => {
      setTickets(res.data.reverse())  
    })
  }

  useEffect(() => {
    getAuthStatus()
    updateTicket()
  }, [userID])

  return (
    <div className="App">
      <div className="header">
        <Header handleSetToken={handleSetToken} handleSetUser={handleSetUser} handleAddTicket={updateTicket} />
      </div>
      <div className="body">
        <div className="left-body">
          {userID && <Sidebar />}
        </div>
        {userID
        ? 
        <div className="form">
          <TicketForm userAvatar={userAvatar} />
        </div>
        :
        <div className="board">
          {tickets.map((ticket, index) => (<Ticket key={index} ticket={ticket} userID={userID} />))}
        </div>
        }
      </div>
    </div>
  );
}

