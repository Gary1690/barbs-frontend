import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Button,Card } from "shards-react";
import InitTooltip from './tooltip-script'


export default class Calendar extends React.Component {

  calendarRef = React.createRef();

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    return (
      <Card small className="mb-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="50em"
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
          eventRemove={function(){}}
          */
          eventChange={this.handleEventChange}
          ref={this.calendarRef}
          businessHours ={ [ // specify an array instead
            {
              daysOfWeek: [ 1, 2, 3, 4,5], // Monday, Tuesday, Wednesday
              startTime: '08:00', // 8am
              endTime: '22:00' ,// 10pm
            },
            {
              daysOfWeek: [ 6, 0 ], // Thursday, Friday
              startTime: '10:00', // 10am
              endTime: '22:00' // 10pm
            }
          ]}
          allDaySlot = {false}
          slotMinTime = "08:00:00"
          slotMaxTime = "22:00:00"
         
       />
      </Card>
    )
  }
  
  handleEventChange =(args)=> {
    console.log("event change",args);
  }

  handleEventMounting = (info) => {
    info.el.id = `eventToolTip${info.event.id}`
    info.el.setAttribute("aria-describedby", "tooltip")
    const target = info.el
    const tooltip = info.el.querySelector(".calTooltip")
    InitTooltip(target,tooltip)
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    if(selectInfo.view.type === "dayGridMonth"){
      this.calendarRef.current
      .getApi()
      .changeView("timeGridDay", selectInfo.start)
    }else{
      
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
      <div style={{background:'#3688D8',color:"white",height:'100%'}} id={`eventToolTip${eventInfo.event.id}`}>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
      <div className="calTooltip" role="tooltip">
        <Button style={{margin:".2em",height:'100%',display:'inline-block',width:"100%"}} theme="danger">Cancel</Button><br/>
        <Button style={{margin:".2em",height:'100%',display:'inline-block',width:"100%"}} theme="success">&nbsp;&nbsp;Pay&nbsp;&nbsp;&nbsp;</Button>
        <div className="calArrow" data-popper-arrow></div>
      </div>
    </>
  )
}

