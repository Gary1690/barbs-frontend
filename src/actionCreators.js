const API = "http://localhost:3000/";
const CUSTOMERS = `${API}customers`
const APPOINTMENTS = `${API}appointments`
const USERS = `${API}users`


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
  .then(appointment => console.log(appointment))
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
      dispatch({type:"LOGIN",payload:{user:userInfo.user,appointments:userInfo.appointments}})
      history.push("/dashboard")
    }
    
  })
}

const logout = ( ) => ({type:"LOGOUT"})


export {
  fetchCustomers,
  saveCustomer,
  deleteCustomer,
  login,
  logout
}