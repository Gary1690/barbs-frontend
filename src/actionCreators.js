const API = "http://localhost:3000/";
const CUSTOMERS = `${API}customers`


const fetchCustomers = ( ) => dispatch => {
  fetch(CUSTOMERS).then(r=>r.json())
  .then(customers => dispatch({type:"FETCH_CUSTOMERS",payload:{customers}}))
}


export {
  fetchCustomers
}