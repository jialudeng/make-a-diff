import React from 'react';
import './TicketForm.css';

export default function TicketForm({ handleCloseTicketForm }) {

  const handleTicketInput = () => {

  }
  
  const handleSubmitTicket = () => {

  }
  return (
    <div className="ticket-form-modal">
      <div className="ticket-form-modal-content">
        <div className="ticket-form-modal-header">
          <span className="material-icons" id="ticket-form-exit" onClick={handleCloseTicketForm}>cancel</span>
          <h2>Submit a ticket</h2>
        </div>
        <div className="sms-modal-body">
          <form>
            <textarea type="text" name="sms" placeholder="Describe your question" onChange={handleTicketInput} required/>
            <div class="custom-select" style="width:200px;">
              <select>
                <option value="0">Select car:</option>
                <option value="1">Audi</option>
                <option value="2">BMW</option>
                <option value="3">Citroen</option>
                <option value="4">Ford</option>
                <option value="5">Honda</option>
                <option value="6">Jaguar</option>
                <option value="7">Land Rover</option>
                <option value="8">Mercedes</option>
                <option value="9">Mini</option>
                <option value="10">Nissan</option>
                <option value="11">Toyota</option>
                <option value="12">Volvo</option>
              </select>
            </div>
            <button id="sms-submit" onClick={handleSubmitTicket}><strong>Submit</strong></button>
          </form>
        </div>
      </div>
    </div>
  )
}