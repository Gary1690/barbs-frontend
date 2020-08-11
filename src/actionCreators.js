const API = "http://localhost:3000/";
const CUSTOMERS = `${API}customers`


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


export {
  fetchCustomers,
  saveCustomer,
  deleteCustomer 
}