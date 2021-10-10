import React, { useState, useEffect } from 'react';

export const CustomToolbar = (props)=>{

    const [month,setMonth] = useState(0)

    useEffect(()=>{
        setMonth(toMonth(props.date))
    })

    const toMonth = (godate)=>{
        const year = godate.getFullYear();
        const month = ('0' + (godate.getMonth() + 1)).slice(-2);
        const day = ('0' + godate.getDate()).slice(-2);

        const dateString = month

        return dateString;
    }
    
    const change = (e)=>{
        const str = toMonth(props.date)
        console.log(str)
      }
    const navigate = action => {
        console.log(action);
        
        props.onNavigate(action)
    }

    return (
      <div className='rbc-toolbar'>
        <span className="rbc-btn-group">
          <button className="rbc=toolbar-side" type="button" onClick={() => navigate('PREV')}>◀</button>
          <span className="rbc-toolbar-label">{month}</span>
          <button type="button" onClick={() => navigate('NEXT')}>▶</button>
        </span>
      </div>
    );
  }