import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './TicketForm.css';

export default function TicketForm({ handleCloseTicketForm, handleAddTicket }) {
  const [tags, setTags] = useState([])
  
  const [title, setTitle] = useState(0)

  const [tag, setTag] = useState(0)

  const handleTicketInput = (e) => {
    if (e.target.name === 'title') setTitle(e.target.value)
    if (e.target.name === 'tag') setTag(e.target.value)
  }

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (title && tag) {
      axios.post('http://localhost:8000/api/v1/tickets/', {title, tags: tag, author_id: window.localStorage.getItem('userID'), liked_by: ','}, {headers: {Authorization: window.localStorage.getItem('jwt')}})
        .then(res => handleAddTicket())
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/tags/')
      .then((res) => setTags(res.data))
  }, [])


  return (
    <div className="ticket-form-modal">
      <div className="ticket-form-modal-content">
        <div className="ticket-form-modal-header">
          <span className="material-icons" id="ticket-form-exit" onClick={handleCloseTicketForm}>cancel</span>
          <h2>Submit a ticket</h2>
        </div>
        <div className="ticket-form-modal-body">
          <form>
            <textarea type="text" name="title" placeholder="Describe your question" onChange={handleTicketInput} required/>
            <div className="tag-select-container">
              <select className="tag-select" name="tag" placeholder="Select a tag" onChange={handleTicketInput} required>
                <option value="0">Select a tag</option>
                {tags.map(tag => (<option value={tag.id} key={tag.id}>{tag.name}</option>))}
              </select>
            </div>
            <button id="ticket-form-submit" onClick={handleSubmitTicket}><strong>Submit</strong></button>
          </form>
        </div>
      </div>
    </div>
  )
}