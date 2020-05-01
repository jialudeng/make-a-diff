import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Comment from './Comment.js';
import './CommentsModal.css'

export default function CommentsModal({ ticket, token, handleCloseCommentsModal }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`http://localhost:8000/api/v1/tickets/${ticket.id}/comments/`)
      .then((res) => {
        setComments(res.data)
      })
      .catch(err => console.log(err))
  })

  return (
    <div className="comments-modal">
      <div className="comments-modal-content">
        <div className="comments-modal-header">
          <span className="material-icons" id="comments-exit" onClick={handleCloseCommentsModal}>cancel</span>
          <div className="comments-ticket-wrapper">
            <div className="comments-ticket-avatar-wrapper">
              <img src={ticket.author.avatar} alt="user avatar" className="comment-ticket-avatar"></img>
            </div>
            <div className="comments-ticket-content-wrapper">
              <div className="comments-ticket-header-wrapper">
                <p className="comments-ticket-author">{ticket.author.first_name} {ticket.author.last_name}</p>
              </div>
              <div className="comments-ticket-body-wrapper">
                <p className="comments-ticket-title">{ticket.title}</p>
              </div>
            </div>
          </div>
        </div>
        {comments.map((comment, index) => (<Comment comment={comment} key={index} />))}
      </div>
    </div>
  )
}