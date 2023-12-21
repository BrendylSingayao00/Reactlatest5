import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';


function Calendars() {
  const [value, onChange] = useState(new Date());

  return (
    <div >

<div >
      <Calendar onChange={onChange} value={value} />
     <p className="TEXTDATE"> Date: {value.toString()}</p>
    </div>



    </div>
  )
}

export default Calendars