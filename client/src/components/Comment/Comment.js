import React from 'react';
import { format } from 'timeago.js';
import './Comment.css';

export default function Commment({ comment }) {
  return (
    <>
      <div className="comment-wrapper">
        <div className="comment-content-wrapper">
          <div className="comment-header-wrapper">
            <p className="comment-author">{comment.author.first_name} {comment.author.last_name}</p>
            <span className="comment-timeago">{format(Date.parse(comment.created_at))}</span>
          </div>
          <div className='comment-body-wrapper'>
            <p className="comment-content">{comment.content}</p>
          </div>
        </div>
      </div>
    </>
  )
}