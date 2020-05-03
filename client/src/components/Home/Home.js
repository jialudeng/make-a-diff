import React, { useState, useEffect} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import './Home.css';
import Ticket from '../Ticket/Ticket.js';

export default function Home({ userAvatar, handleAddTicket, tickets, userID, updateTicket }) {
  const [tags, setTags] = useState([])
  
  const [title, setTitle] = useState('')

  const [tag, setTag] = useState(0)

  const handleTicketInput = (e) => {
    if (e.target.id === 'title') setTitle(e.target.value)
    if (e.target.id === 'tag') setTag(e.target.value)
  }

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    if (title.length && tag) {
      axios.post('http://localhost:8000/api/v1/tickets/', {title, tags: tag, author_id: window.localStorage.getItem('userID'), liked_by: ','}, {headers: {Authorization: window.localStorage.getItem('jwt')}})
        .then(() => {
          updateTicket()
          setTitle('')
          setTag(0)
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/tags/', {headers: {Authorization: window.localStorage.getItem('userID')}})
      .then((res) => setTags(res.data))
  }, [])


  return (
    <>
    <div className="form-wrapper">
      <div className="form-avatar-wrapper">
        <img src={userAvatar} alt="user avatar" className="avatar"></img>
      </div>
      <div className="form-content-wrapper">
        <TextareaAutosize value={title} id="title" placeholder="What would you like to get helped with?" onChange={handleTicketInput} />
        <div className="form-footer">
          <select id="tag" onChange={handleTicketInput} value={tag}>
          <option value={0}>Select a tag</option>
          {tags.map(tag => (<option value={tag.id} key={tag.id}>{tag.label}</option>))}
          </select>
          <button id="form-submit" onClick={handleSubmitTicket} disabled={title ? false : true}>Submit</button>
        </div>
      </div>
    </div>
    {tickets.map((ticket, index) => (<Ticket key={index} ticket={ticket} userID={userID} />))}
    </>
  )

}
