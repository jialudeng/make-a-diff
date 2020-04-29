import React, { useState, useEffect, useRef } from 'react';
import './Tooltip.css';

export default function Tooltip({ top, left }) {
  const tooltip = useRef(null)

  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(tooltip.current.clientWidth / 2)
  }, [])


  return (
    <div className="ticket-tooltip" style={{top, left: left - width}}ref={tooltip}>
      <span>Claim the ticket</span>
    </div>
  )
}