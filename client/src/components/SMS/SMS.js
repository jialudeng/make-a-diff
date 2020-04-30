import React, { useState } from 'react';
import axios from 'axios';
import './SMS.css';

export default function SMS({ handleCloseSMS, ticketId }) {
  const [sms, setSms] = useState('')

  const handleSMSchange = (e) => {
    setSms(e.target.value)
  }

  const handleSendSMS = () => {
    if (sms.length) {
      axios.patch(`http://localhost:8000/api/v2/tickets/${ticketId}/`, {sms}, {headers: {Authorization: window.localStorage.getItem('jwt')}})
        .then(res => console.log(res.data))
    }
  }

  return (
    <div className="sms-modal">
      <div className="sms-modal-content">
        <div className="sms-modal-header">
          <span className="material-icons" id="sms-exit" onClick={handleCloseSMS}>cancel</span>
          <h2>Claim the ticket and Send a SMS</h2>
        </div>
        <div className="sms-modal-body">
          <form>
            <textarea type="text" name="sms" onChange={handleSMSchange} required/>
            <button id="sms-submit" onClick={handleSendSMS}><strong>Send SMS</strong></button>
          </form>
        </div>
      </div>
    </div>
  )
}