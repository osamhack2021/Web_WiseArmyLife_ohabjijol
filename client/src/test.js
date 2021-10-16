import React,{useState,useEffect,useRef} from "react";
import ReactDOM from "react-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

const defaultEvents = [
    {
        id: 1, 
        title: "event 1",
        date: "2021-10-10" 
    },
    {
      title: "event 2",
      start: "2019-12-01",
      end: "2019-12-05",
      allDay: true,
      HostName: "William"
    },
    {
      title: "event 3",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true
    },
    {
      title: "event 4",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true
    },
    {
      title: "event 5",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true
    },
    {
      title: "event 6",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true
    }
  ]

function Cal (){

    const [events,setEvents] = useState(defaultEvents)
    const handleDateClick = arg => {
        alert(arg.dateStr);
    };

    const handleSelectedDates = info => {
        alert("selected " + info.startStr + " to " + info.endStr);
        const title = prompt("What's the name of the title");
        console.log(info);
        if (title != null) {
        const newEvent = {
            title,
            start: info.startStr,
            end: info.endStr
        };
        const data = [...events,newEvent]
        setEvents({events:data})
        console.log("here", data);
        } else {
        console.log("nothing");
        }
    };

    return (
        <div>
        <FullCalendar
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            defaultView="dayGridMonth"
            dateClick={handleDateClick}
            displayEventTime={true}
            header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            selectable={true}
            plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            resourceTimeGridPlugin
            ]}
            eventClick={event => {
            console.log(event.event._def.publicId);
            }}
            events={events}
            select={handleSelectedDates}
            eventLimit={3}
        />
        </div>
    );
  
}


export default Cal;