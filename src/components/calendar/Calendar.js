import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Button } from "shards-react";
import InitTooltip from './tooltip-script'


export default class Calendar extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            // eventClick={this.handleEventClick}
            eventDidMount = {this.handleEventMounting}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  handleEventMounting = (info)=>{
    info.el.id = `eventToolTip${info.event.id}`
    info.el.setAttribute("aria-describedby", "tooltip")
    const target = info.el
    const tooltip = info.el.querySelector(".calTooltip")
    console.log("mounting",target)
    console.log("mounting",tooltip)
    InitTooltip(target,tooltip)
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}



function renderEventContent(eventInfo) {
  console.log("eventinfo",eventInfo.event,eventInfo.event.id,eventInfo.el)
  return (
    <>
      {/* <CalendarEventTooltip 
       timeText={eventInfo.timeText} 
       title={eventInfo.event.title}
       eventId={eventInfo.event.id}
       /> */}

        <div style={{background:'#3688D8',color:"white",height:'100%'}} id={`eventToolTip${eventInfo.event.id}`}>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </div>
        <div className="calTooltip" role="tooltip">
          <Button style={{margin:".2em",height:'100%',display:'inline-block', whiteSpace:'normal', verticalAlign:'top'}}theme="danger">Cancel</Button><br/>
          <Button theme="success">&nbsp;&nbsp;Pay&nbsp;&nbsp;&nbsp;</Button>
          <div className="calArrow" data-popper-arrow></div>
        </div>
    </>
  )
}

