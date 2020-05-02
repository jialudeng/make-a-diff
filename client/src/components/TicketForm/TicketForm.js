import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './TicketForm.css';

export default function TicketForm({ userAvatar}) {
  const [tags, setTags] = useState([])
  
  const [title, setTitle] = useState(0)

  const [tag, setTag] = useState(0)

  const handleTicketInput = (e) => {
    if (e.target.name === 'title') setTitle(e.target.value)
    if (e.target.name === 'tag') setTag(e.target.value)
  }

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    if (title && tag) {
      axios.post('http://localhost:8000/api/v1/tickets/', {title, tags: tag, author_id: window.localStorage.getItem('userID'), liked_by: ','}, {headers: {Authorization: window.localStorage.getItem('jwt')}})
        .then(() => {
          // handleAddTicket()
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/tags/', {headers: {Authorization: window.localStorage.getItem('userID')}})
      .then((res) => setTags(res.data))
  }, [])


  return (
    <div className="form-wrapper">
      <div className="form-avatar-container">
        <img src={userAvatar} alt="user avatar" className="avatar"></img>
      </div>
      <div>
      </div>
    </div>
  )
}