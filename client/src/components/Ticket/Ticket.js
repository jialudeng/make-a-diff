import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';

import './Ticket.css';
import Tooltip from './Tooltip.js';
import SMS from '../SMS/SMS.js';
import Comment from '../Comment/Comment.js';


export default function Ticket({ ticket }) {

  const claimIcon = useRef(null)

  const [token, setToken] = useState(null)

  const [userID, setUserID] = useState(null)

  const [tooltipTop, setTooltipTop] = useState(0)

  const [tooltipLeft, setTooltipLeft] = useState(0)

  const [upvoted, setUpvoted] = useState(false)

  const [tooltip, setTooltip] = useState(false)

  const [showSMS, setShowSMS] = useState(false)

  const [showComment, setShowComment] = useState(false)

  const handleResize = () => {
    setTooltipTop(claimIcon.current.offsetTop + claimIcon.current.clientHeight)
    setTooltipLeft(claimIcon.current.offsetLeft + claimIcon.current.clientWidth / 2)
  }

  const handleUpvote = () => {
    if (token && userID && !upvoted) {
      setUpvoted(true)
      ticket.liked_by.push(userID)
      axios.patch(`http://localhost:8000/api/v1/tickets/${ticket.id}/`, {liked_by: `${ticket.liked_by}`})
        .catch(err => console.log(err))
    } else if (token && userID && upvoted) {
        setUpvoted(false)
        ticket.liked_by.splice(ticket.liked_by.indexOf(userID), 1)
        axios.patch(`http://localhost:8000/api/v1/tickets/${ticket.id}/`, {liked_by: `${ticket.liked_by.length > 0 ? ticket.liked_by : ','}`})
          .catch(err => console.log(err))
    } else alert('Please log in to upvote')
  }

  const handleComment = () => {
    if (token && userID && !showComment) {
      setShowComment(true)
    }
  }

  const handleClaim = () => {
    if (!token.length) alert('Please log in to claim ticket')
    else setShowSMS(true)
  }

  const handleCloseSMS = (e) => {
    if (e.target.className === 'sms-modal' || e.target.id === 'sms-exit') setShowSMS(false)
  }

  const handleMouseOver = () => {
    setTooltip(true)
  }

  const handleMouseLeave = () => {
    setTooltip(false)
  }

  const handleUpdateUpvote = (id) => {
    if (ticket.liked_by.indexOf(id) > -1) setUpvoted(true)
  }

  const updateTokenAndID = () => {
    let token = window.localStorage.getItem('jwt')
    let id = parseInt(window.localStorage.getItem('userID'))
    setToken(token)
    setUserID(id)
    handleUpdateUpvote(id)
    axios.defaults.headers.common['Authorization'] = token;
  }

  useEffect(() => {
    handleResize()
    updateTokenAndID()
    window.addEventListener('resize', handleResize)
    window.addEventListener('click', handleCloseSMS)
  }, [showSMS, token, userID])

  return (
    <>
      {showSMS && <SMS handleCloseSMS={handleCloseSMS} ticketId={ticket.id}/>}
      {showComment && <Comment token={token} userID={userID} ticketID={ticket.id} />}
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
              <i className="material-icons md-dark favorite-icon" onClick={handleUpvote} style={upvoted ? {color: '#E91E63'} : {}}>{upvoted ? 'favorite' : 'favorite_border'}</i>
              <i className="material-icons md-dark chat-icon" onClick={handleComment}>chat</i>
              <i className="material-icons md-dark phone-icon" ref={claimIcon} onClick={handleClaim} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>smartphone</i>
              {tooltip && <Tooltip top={tooltipTop} left={tooltipLeft}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}