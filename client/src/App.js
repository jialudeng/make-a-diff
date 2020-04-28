import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Ticket from './components/Ticket/Ticket.js';

export default function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // fetch tickets from server and setState
    axios.get('http://localhost:8000/api/v1/tickets/')
      .then(res => {
        setTickets(res.data)
      })
  }, [])


  return (
    <div className="App">
      <div className="Board">
        {tickets.map((ticket, index) => (<Ticket key={index} ticket={ticket} />))}
      </div>
    </div>
  );
}

