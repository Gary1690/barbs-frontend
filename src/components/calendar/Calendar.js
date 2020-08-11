import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'
import { Button,Card } from "shards-react";
import InitTooltip from './tooltip-script'


export default class Calendar extends React.Component {

  calendarRef = React.createRef();

  render() {
    console.log(this.props);
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
          selectMirror={false}
          dayMaxEvents={true}
          weekends={true}
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

  handleDateSelect = (selectInfo) => {
    if(selectInfo.view.type === "dayGridMonth"){
      this.calendarRef.current
      .getApi()
      .changeView("timeGridDay", selectInfo.start)
    }else{
      if(this.props.match.params.id){
        selectInfo.end.setHours(selectInfo.start.getHours()+1)
        selectInfo.end.setMinutes(selectInfo.start.getMinutes())
        const appointment = {
          user_id: 1,
          customer_id: parseInt(this.props.match.params.id),
          start: selectInfo.start,
          end: selectInfo.end
        }

      }
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}



function renderEventContent(eventInfo) {
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

