import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header.js';
import Ticket from './components/Ticket/Ticket.js';

export default function App() {
  const [tickets, setTickets] = useState([])

  const [userID, setUserID] = useState(null)

  const handleSetToken = (token) => {
    window.localStorage.setItem('jwt', `Token ${token}`)
  }

  const handleSetUserID = (id) => {
    window.localStorage.setItem('userID', id)
    setUserID(id)
    updateTicket()
  }

  const updateTicket = () => {
    axios.get('http://localhost:8000/api/v1/tickets/')
    .then(res => {
      setTickets(res.data.reverse())  
    })
  }

  useEffect(() => {
    updateTicket()
  }, [userID])

  return (
    <div className="App">
      <div className='header'>
        <Header handleSetToken={handleSetToken} handleSetUserID={handleSetUserID} handleAddTicket={updateTicket} />
      </div>
      <div className="board">
        {tickets.map((ticket, index) => (<Ticket key={index} ticket={ticket} userID={userID} />))}
      </div>
    </div>
  );
}

