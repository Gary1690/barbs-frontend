
let appointments = JSON.parse(localStorage.getItem("appointments"))

const initialState = {
  customers : [],
  user: JSON.parse(localStorage.getItem("user")),
  appointments: appointments? appointments : [],
  services:[] 
}


const reducer = (prevState = initialState,action) => {
    console.log(action);
    let newAppointmentsArr = null;
    switch (action.type){
      case "PAY_APPOINTMENT":
        newAppointmentsArr = prevState.appointments.map( app =>{
          if(app.id === action.payload.appointment.id){
            return action.payload.appointment
          }
          return app
        })
        localStorage.setItem("appointments",JSON.stringify(newAppointmentsArr))
        return {...prevState,appointments:newAppointmentsArr}
      case "DELETE_APPOINTMENT":
        newAppointmentsArr = prevState.appointments.filter( app => {
          if(app.id !== action.payload.appointment.id){
            return app
          }
        })
        localStorage.setItem("appointments",JSON.stringify(newAppointmentsArr))
        return {...prevState,appointments:newAppointmentsArr}
      case "ADD_APPOINTMENT":
        newAppointmentsArr = [...prevState.appointments,action.payload.appointment]
        localStorage.setItem("appointments",JSON.stringify(newAppointmentsArr))
        return {...prevState,appointments:newAppointmentsArr}
      case "LOGOUT":
        localStorage.setItem("user",null)
        localStorage.setItem("appointments",null)
        return {...prevState,user:null,appointments:[]}
      case "LOGIN":
        const {user,appointments} = action.payload
        localStorage.setItem("user",JSON.stringify(user))
        localStorage.setItem("appointments",JSON.stringify(appointments))
        return {...prevState,user,appointments}
      case "DELETE_CUSTOMER":
        const updatedCustomers = prevState.customers.filter(c=>{
          if(c.id !== action.payload.customerId){
            return c
          }
        })
        return {...prevState, customers:updatedCustomers}
      case "SAVE_CUSTOMER":
        if(action.payload.edit){
          const updatedCustomers = prevState.customers.map(c=>{
            if(c.id === action.payload.customer.id){
              return action.payload.customer
            }
            return c
          })
          return {...prevState, customers:updatedCustomers}
        }else{
          return {...prevState, customers:[...prevState.customers,action.payload.customer]}
        }
      case "FETCH_CUSTOMERS":
        return {...prevState, customers : action.payload.customers}
      default:
        return {...prevState}
    }
}

export default reducer