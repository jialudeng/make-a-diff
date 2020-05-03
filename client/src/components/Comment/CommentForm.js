import React, { useState } from 'react';
import axios from 'axios';
import './CommentForm.css';

export default function CommentForm({ ticket, token, userID, handleAddComment }) {
  const [content, setContent] = useState('')

  const handleInput = (e) => {
    setContent(e.target.value)
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (content.length) {
      axios.post(`http://localhost:8000/api/v1/tickets/${ticket.id}/comments/`, {author_id: userID, content}, {headers: {Authorization: token}})
        .then(res => {
          handleAddComment(res.data)
          setContent('')
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="comment-form-wrapper">

    <div className="comment-form-body">
      <form>
        <textarea type="text" name="comment" value={content} onChange={handleInput} placeholder="leave your comment for this" required/>
        <button id="comment-submit" onClick={handleSubmitComment} disabled={content.length > 0 ? false : true}><strong>Submit</strong></button>
      </form>
    </div>
    </div>
  )
}