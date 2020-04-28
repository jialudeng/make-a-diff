import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';

import './Ticket.css';
import Tooltip from './Tooltip.js';


export default function Ticket({ ticket }) {
  const claimIcon = useRef(null)

  const[tooltipTop, setTooltipTop] = useState(0)

  const[tooltipLeft, setTooltipLeft] = useState(0)

  const [upvoted, setUpvoted] = useState(false)

  const [tooltip, setTooltip] = useState(false)

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  const handleResize = () => {
    setTooltipTop(claimIcon.current.offsetTop + claimIcon.current.clientHeight)
    setTooltipLeft(claimIcon.current.offsetLeft + claimIcon.current.clientWidth / 2)
  }

  const handleUpvote = () => {
    
    setUpvoted(!upvoted)
  }

  const handleComment = () => {
    axios.get(`http://localhost:8000/api/v1/tickets/${ticket.id}/comments`)
      .then(res => {
        console.log(res.data)
        
      })
  }

  const handleClaim = () => {
    // PATCH request to update claim_by with the user's ID as fk
    // change the icon to diff color
    console.log('claimed')
  }

  const handleMouseOver = () => {
    setTooltip(true)
  }

  const handleMouseLeave = () => {
    setTooltip(false)
  }



  return (
    <div className="ticket-wrapper">
      <div className="avatar-wrapper">
        <img src={ticket.author.avatar} alt="user avatar" className="avatar"></img>
        </div>
      <div className="content-wrapper">
        <div className="header-wrapper">
          <p className="profile-name">{ticket.author.first_name} {ticket.author.last_name}</p>
          <span>{format(Date.parse(ticket.created_at))}</span>
        </div>
        <div className='body-wrapper'>
          <p className="ticket-title">{ticket.title}</p>
          <div className='icon-wrapper'>
            <i className="material-icons md-dark favorite_border" onClick={handleUpvote} style={upvoted ? {color: '#E91E63'} : {}}>{upvoted ? 'favorite' : 'favorite_border'}</i>
            <i className="material-icons md-dark chat" onClick={handleComment}>chat</i>
            <i className="material-icons md-dark face" ref={claimIcon} onClick={handleClaim} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>face</i>
            {tooltip && <Tooltip top={tooltipTop} left={tooltipLeft}/>}
          </div>
        </div>
      </div>
    </div>
  )
}