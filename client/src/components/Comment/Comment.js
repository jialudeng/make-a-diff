import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comment.css'

export default function Comment({ token, userID, ticketID }) {
  const [comments, setComments] = useState([])

  const handleUpdateComments = (comments) => {
    setComments(comments)
  } 

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/tickets/${ticketID}/comments/`)
      .then((res) => {
        handleUpdateComments(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="comment-modal">
      <div className="comment-modal-content">
        <div className="comment-modal-header">
          {comments.map((comment, index) => (<p key={index}>{comment.content}</p>))}
        </div>
      </div>
    </div>
  )
}