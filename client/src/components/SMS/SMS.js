import React, { useState } from 'react';
import axios from '../../utils/API';
import './SMS.css';

export default function SMS({ handleCloseModal, ticketId, handleCloseSms }) {
  const [sms, setSms] = useState('')

  const handleSMSchange = (e) => {
    setSms(e.target.value)
  }

  const handleSendSMS = (e) => {
    e.preventDefault()
    if (sms.length) {
      axios.patch(`api/v2/tickets/${ticketId}/`, {sms}, {headers: {Authorization: window.localStorage.getItem('jwt')}})
        .then(() => {
          setSms('')
          handleCloseSms()
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="sms-modal">
      <div className="sms-modal-content">
        <div className="sms-modal-header">
          <span className="material-icons" id="sms-exit" onClick={handleCloseModal}>cancel</span>
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