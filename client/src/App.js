import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header.js';
import Ticket from './components/Ticket/Ticket.js';

export default function App() {
  const [tickets, setTickets] = useState([])
  const [token, setToken] = useState('')

  const handleSetToken = (token) => {
    setToken(`Token ${token}`)
    console.log(token)
  }

  useEffect(() => {
    // fetch tickets from server and setState
    axios.get('http://localhost:8000/api/v1/tickets/')
      .then(res => {
        setTickets(res.data)
      })
  }, [tickets])


  return (
    <div className="App">
      <div className='header'>
        <Header handleSetToken={handleSetToken} />
      </div>
      <div className="board">
        {tickets.map((ticket, index) => (<Ticket key={index} ticket={ticket} />))}
      </div>
    </div>
  );
}

