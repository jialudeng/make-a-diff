import React, { useState, useEffect } from 'react';
import axios from '../../utils/API';
import { format } from 'timeago.js';

import './Ticket.css';
import Tooltip from './Tooltip.js';
import SMS from '../SMS/SMS.js';
import CommentsModal from '../Comment/CommentsModal.js';


export default function Ticket({ ticket }) {
  const [token, setToken] = useState(null)

  const [userID, setUserID] = useState(null)

  const [tooltipTop, setTooltipTop] = useState(0)

  const [tooltipLeft, setTooltipLeft] = useState(0)

  const [upvoted, setUpvoted] = useState(false)

  const [tooltip, setTooltip] = useState(false)

  const [showSMS, setShowSMS] = useState(false)

  const [showComments, setShowComments] = useState(false)

  const handleUpvote = () => {
    if (token && userID && !upvoted) {
      setUpvoted(true)
      ticket.liked_by.push(userID)
      axios.patch(`api/v1/tickets/${ticket.id}/`, {liked_by: `${ticket.liked_by}`})
        .catch(err => console.log(err))
    } else if (token && userID && upvoted) {
        setUpvoted(false)
        ticket.liked_by.splice(ticket.liked_by.indexOf(userID), 1)
        axios.patch(`api/v1/tickets/${ticket.id}/`, {liked_by: `${ticket.liked_by.length > 0 ? ticket.liked_by : ','}`})
          .catch(err => console.log(err))
    } else alert('Please log in to upvote')
  }

  const handleComment = () => {
    if (token && userID) {
      setShowComments(true)
    }
  }

  const handleClaim = () => {
    if (!token.length) alert('Please log in to claim ticket')
    else setShowSMS(true)
  }

  const handleCloseModal = (e) => {
    if (e.target.className === 'sms-modal' || e.target.id === 'sms-exit') setShowSMS(false)
    if (e.target.className === 'comments-modal' || e.target.id === 'comments-exit') setShowComments(false)
  }

  const handleCloseSms = () => {
    setShowSMS(false)
  }

  const handleMouseOver = (e) => {
    setTooltipTop(e.target.parentElement.offsetTop + e.target.clientHeight)
    setTooltipLeft(e.target.parentElement.offsetLeft + e.target.clientWidth / 2)
    setTooltip(true)
  }

  const handleMouseLeave = () => {
    setTooltip(false)
  }

  const handleUpdateUpvote = (id) => {
    if (ticket.liked_by.indexOf(id) > -1) setUpvoted(true)
    else setUpvoted(false)
  }

  const updateTokenAndID = () => {
    let token = window.localStorage.getItem('jwt')
    let id = parseInt(window.localStorage.getItem('userID'))
    setToken(token)
    setUserID(id)
    handleUpdateUpvote(id)
    axios.defaults.headers.common['Authorization'] = token;
  }

  const handleUpdateComment = (comment) => {
    ticket.comments.push(comment)
  }

  useEffect(() => {
    updateTokenAndID()
    document.addEventListener('click', handleCloseModal)
  })

  return (
    <>
      {showSMS && <SMS handleCloseModal={handleCloseModal} ticketId={ticket.id} handleCloseSms={handleCloseSms}/>}
      {showComments && <CommentsModal ticket={ticket} token={token} userID={userID} handleCloseModal={handleCloseModal} handleUpdateComment={handleUpdateComment}/>}
      <div className="ticket-wrapper">
        <div className="avatar-wrapper">
          <img src={ticket.author.avatar} alt="user avatar" className="avatar"></img>
          </div>
        <div className="content-wrapper">
          <div className="header-wrapper">
            <p className="profile-name">{ticket.author.first_name} {ticket.author.last_name}</p>
            <span>{format(Date.parse(ticket.created_at))}</span>
          </div>
          <div className="body-wrapper">
            <p className="ticket-title">{ticket.title}</p>
            <div className="icon-wrapper">
              <div className="individual-icon-wrapper">
                <i className="material-icons md-dark favorite-icon" onClick={handleUpvote} style={upvoted ? {color: '#E91E63'} : {}}>{upvoted ? 'favorite' : 'favorite_border'}</i>
                <span className="ticket-stats">{ticket.liked_by.length}</span>
              </div>
              <div className="individual-icon-wrapper">
                <i className="material-icons md-dark chat-icon" onClick={handleComment}>chat</i>
                <span className="ticket-stats">{ticket.comments.length}</span>
              </div>
              <div className="individual-icon-wrapper">
                <i className="material-icons md-dark phone-icon" onClick={handleClaim} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>smartphone</i>
              </div>
              {tooltip && <Tooltip top={tooltipTop} left={tooltipLeft}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}