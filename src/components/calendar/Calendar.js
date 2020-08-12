import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Button,Card } from "shards-react"
import InitTooltip from './tooltip-script'
import {connect} from "react-redux"
import {addAppointment,fetchCustomers,deleteAppointment} from "../../actionCreators"


class Calendar extends React.Component {

  calendarRef = React.createRef();

  componentDidMount(){
    this.props.fetchCustomers()
    console.log("Ref",this.calendarRef.current.getApi().remove);
  }

  render() {
    console.log("calendar",this.props.appointments);
    
    return (
      <Card small className="mb-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          eventOverlap={false}
          height="50em"
          initialView='dayGridMonth'
          editable={false}//to be change
          selectable={true}
          selectMirror={false}
          dayMaxEvents={true}
          weekends={true}
          initialEvents={this.props.appointments} // alternatively, use the `events` setting to fetch from a feed
          select={this.handleDateSelect}
          eventContent={(eventInfo)=> this.renderEventContent(eventInfo)} // custom render function
          eventDidMount = {this.handleEventMounting}
          eventsSet={this.handleEvents} 
          eventChange={this.handleEventChange}
          ref={this.calendarRef}
          businessHours ={ [ // specify an array instead
            {
              daysOfWeek: [ 1, 2, 3, 4,5], // Monday, Tuesday, Wednesday, Thursday, Friday
              startTime: '08:00', // 8am
              endTime: '22:00' ,// 10pm
            },
            {
              daysOfWeek: [ 6, 0 ], // Saturday, Sunday
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
  
  handleEventClick = (args) =>{
    console.log(args);
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
        const customerId = parseInt(this.props.match.params.id)
        const appointment = {
          user_id: 1,
          customer_id: customerId,
          start: selectInfo.start,
          end: selectInfo.end,
        }
        this.props.addAppointment(appointment,this.calendarRef)
      }
    }
  }
  renderEventContent= (eventInfo)=>{
    const customer = this.props.customers.find(c=> c.id === parseInt(eventInfo.event.title))
    return (
      <>
        <div style={{width:"100%", color:"white",fontSize:"1.2em",backgroundColor:'#3688D8'}} id={`eventToolTip${eventInfo.event.id}`}>
        <b>{eventInfo.timeText} &nbsp; <i>{customer ? `${customer.name} ${customer.lastname}`: "No client"}</i></b> 
          
        </div>
        <div className="calTooltip" role="tooltip">
          <Button onClick={()=>this.props.deleteAppointment(eventInfo.event._def.publicId,eventInfo.event)} style={{margin:".2em",height:'100%',display:'inline-block',width:"100%"}} theme="danger">Cancel</Button><br/>
          <Button style={{margin:".2em",height:'100%',display:'inline-block',width:"100%"}} theme="success">&nbsp;&nbsp;Pay&nbsp;&nbsp;&nbsp;</Button>
          <div className="calArrow" data-popper-arrow></div>
        </div>
      </>
    )
  }
}


const msp = (state) => {
  return {
    user: state.user,
    appointments: state.appointments,
    customers: state.customers
  }
}

const mdp = (dispatch) => {
  return {
    fetchCustomers: () => dispatch(fetchCustomers()),
    addAppointment:(appointment,calendarRef)=> dispatch(addAppointment(appointment,calendarRef)),
    deleteAppointment: (id,calendarRef) => dispatch(deleteAppointment(id,calendarRef))
  }
}


export default connect(msp,mdp)(Calendar);
