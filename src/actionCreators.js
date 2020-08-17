

const API = "http://localhost:3000";
const CUSTOMERS = `${API}/customers`
const APPOINTMENTS = `${API}/appointments`
const USERS = `${API}/users`
const INVOICES = `${API}/invoices`


const fetchAppointemt = (id) =>dispatch => {
  fetch(`${APPOINTMENTS}/${id}`).then(r=>r.json())
  .then(appointment => dispatch({type:"FETCH_APPOINTMENT_TO_BE_PAID",payload:{appointment}}))
}


const fetchCustomers = ( ) => dispatch => {
  fetch(CUSTOMERS).then(r=>r.json())
  .then(customers => dispatch({type:"FETCH_CUSTOMERS",payload:{customers}}))
}

const saveCustomer = (customer) => (dispatch) => {
  fetch(`${CUSTOMERS}/${customer.id}`,{
    method:customer.id? "PATCH": "POST",
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body:JSON.stringify({
      name:customer.firstName,
      lastname:customer.lastName,
      phone:customer.phone
    })
  }).then(r=>r.json())
  .then(newCustomer=> dispatch({type:"SAVE_CUSTOMER",payload:{customer:newCustomer,edit:!!customer.id}}))
}

const deleteCustomer = (id)=> dispatch => {
  fetch(`${CUSTOMERS}/${id}`,{
    method:"DELETE",
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  }).then(r=>r.json())
  .then(customer => dispatch({type:"DELETE_CUSTOMER",payload:{customerId:customer.id}}))
}

const addAppointment = (appointment) => dispatch =>{
  fetch(APPOINTMENTS,{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(appointment)
  }).then(r=>r.json())
  .then(app => {
    const appointment = {
      id:app.id,
      customer_id: app.customer_id,
      user_id: app.user_id,
      start:new Date(app.start),
      end:new Date(app.end),
      title:`${app.customer_id}`,
      status:app.status,
      color:"#3688D8"
    }
    dispatch({type:"ADD_APPOINTMENT",payload:{appointment}})
  })
}

const login = (userInfo,history) => dispatch =>{
  fetch(`${USERS}/login`,{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(userInfo)
  }).then(r=>r.json())
  .then(userInfo =>{
    if (userInfo.error){
      alert("Error in the credentials")
    }else{
      const appointments = userInfo.appointments.map(app=>{
        return {
          id:app.id,
          customer_id: app.customer_id,
          user_id: app.user_id,
          start:new Date(app.start),
          end:new Date(app.end),
          title:`${app.customer_id}`,
          status: app.status,
          color: app.status ? "#43C924" :"#3688D8"
        }
      }) 
      dispatch({type:"LOGIN",payload:{user:userInfo.user,appointments}})
      history.push("/dashboard")
    }
    
  })
}

const logout = ( ) => ({type:"LOGOUT"})

const deleteAppointment = (id,event)=> dispatch => {
  fetch(`${APPOINTMENTS}/${id}`,{
    method:"DELETE",
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  }).then(r=> r.json())
  .then(deletedAppointment=>{
    event && event.remove()
    dispatch({type:"DELETE_APPOINTMENT",payload:{appointment:deletedAppointment}})
  })
}


const payAppointment = (appointmentId,servicesId,history)=>dispatch=> {
  fetch(INVOICES,{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body:JSON.stringify({
      appointment_id:appointmentId,
      servicesId
    })
  }).then(r=> r.json())
  .then(app => {
    const appointment = {
      id:app.id,
      customer_id: app.customer_id,
      user_id: app.user_id,
      start:new Date(app.start),
      end:new Date(app.end),
      title:`${app.customer_id}`,
      status:app.status,
      color:"#43C924"
    }
    dispatch({type:"PAY_APPOINTMENT",payload:{appointment}})
    debugger
    history.push("/dashboard")
  })
}

const updatePassword =(id,password)=>dispatch=>{
  fetch(`${USERS}//update/password/${id}`,{
    method:"PATCH",
    headers:{
      'Content-Type':'application/json',
      'Accept': 'application/json'
    },
    body:JSON.stringify({password})
  }).then(r=>r.json())
  .then(user => {
    dispatch({type:"UPDATE_PASSWORD",payload:{user}})
  })
}

const updateProfile =(id,{name,lastname,email,username,picture})=>dispatch=>{
  const formData = new FormData()
  formData.append('name',name)
  formData.append('lastname',lastname)
  formData.append('email',email)
  formData.append('username',username)
  formData.append('picture',picture)
  console.log(name,lastname,email,username,picture)
  fetch(`${USERS}/${id}`,{
    method:"PATCH",
    // headers:{
    //   'Content-type':'application/json',
    //   'Accept':'application/json'
    // },
    // body:JSON.stringify({name,lastname,email,username,picture})
    body:formData
  }).then(r=>r.json())
  .then( user => {
    dispatch({type:"UPDATE_PROFILE",payload:{user}})
  })
}

export {
  fetchCustomers,
  saveCustomer,
  deleteCustomer,
  login,
  logout,
  addAppointment,
  deleteAppointment,
  payAppointment,
  updateProfile,
  updatePassword,
  fetchAppointemt
}
